-- 참ship다 초기 스키마
-- 8개 테이블 + 5개 enum

-- ============================================================
-- ENUMS
-- ============================================================
create type user_role as enum ('worker', 'manager');
create type task_status as enum ('waiting', 'in_progress', 'submitted', 'rework', 'approved');
create type task_priority as enum ('normal', 'urgent');
create type review_status as enum ('pending', 'approved', 'rejected');
create type conversation_type as enum ('admin', 'team');
create type notification_type as enum ('new', 'rework', 'update');

-- ============================================================
-- 1. users
-- ============================================================
create table users (
  id           uuid primary key default gen_random_uuid(),
  username     text unique not null,
  password     text not null,        -- demo only, plain text
  name         text not null,
  role         user_role not null,
  team         text,
  affiliation  text,
  initial      text not null,
  is_new       boolean not null default false,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- 2. drawings
-- ============================================================
create table drawings (
  id           uuid primary key default gen_random_uuid(),
  code         text not null,
  title        text not null,
  file_url     text,
  uploaded_by  uuid references users(id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index drawings_uploaded_by_idx on drawings(uploaded_by);

-- ============================================================
-- 3. tasks
-- ============================================================
create table tasks (
  id                 uuid primary key default gen_random_uuid(),
  title              text not null,
  status             task_status not null default 'waiting',
  priority           task_priority not null default 'normal',
  assignee_id        uuid not null references users(id) on delete cascade,
  assigned_by        uuid references users(id) on delete set null,
  drawing_id         uuid references drawings(id) on delete set null,
  zone               text,
  caution_title      text,
  caution_subtitle   text,
  details            text,
  materials          jsonb not null default '[]'::jsonb,
  estimated_minutes  int,
  deadline           timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index tasks_assignee_idx on tasks(assignee_id);
create index tasks_status_idx on tasks(status);

-- ============================================================
-- 4. task_submissions
-- ============================================================
create table task_submissions (
  id                 uuid primary key default gen_random_uuid(),
  task_id            uuid not null references tasks(id) on delete cascade,
  submitted_by       uuid not null references users(id) on delete cascade,
  submitted_at       timestamptz not null default now(),
  review_status      review_status not null default 'pending',
  reviewer_id        uuid references users(id) on delete set null,
  reviewed_at        timestamptz,
  rejection_reason   text,
  rejection_detail   text,
  rework_deadline    timestamptz
);

create index task_submissions_task_idx on task_submissions(task_id);
create index task_submissions_status_idx on task_submissions(review_status);

-- ============================================================
-- 5. conversations
-- ============================================================
create table conversations (
  id              uuid primary key default gen_random_uuid(),
  type            conversation_type not null,
  linked_task_id  uuid references tasks(id) on delete set null,
  created_at      timestamptz not null default now()
);

-- ============================================================
-- 6. conversation_participants
-- ============================================================
create table conversation_participants (
  conversation_id  uuid not null references conversations(id) on delete cascade,
  user_id          uuid not null references users(id) on delete cascade,
  last_read_at     timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create index conversation_participants_user_idx on conversation_participants(user_id);

-- ============================================================
-- 7. messages
-- ============================================================
create table messages (
  id               uuid primary key default gen_random_uuid(),
  conversation_id  uuid not null references conversations(id) on delete cascade,
  sender_id        uuid not null references users(id) on delete cascade,
  text             text not null,
  sent_at          timestamptz not null default now()
);

create index messages_conversation_idx on messages(conversation_id);
create index messages_sent_at_idx on messages(sent_at);

-- ============================================================
-- 8. notifications
-- ============================================================
create table notifications (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references users(id) on delete cascade,
  type             notification_type not null,
  title            text not null,
  body             text not null,
  related_task_id  uuid references tasks(id) on delete set null,
  read             boolean not null default false,
  created_at       timestamptz not null default now()
);

create index notifications_user_idx on notifications(user_id);
create index notifications_read_idx on notifications(read);

-- ============================================================
-- RLS: 데모 단계 → 모두 허용
-- 나중에 Supabase Auth 도입 시 정책 추가
-- ============================================================
alter table users                     enable row level security;
alter table drawings                  enable row level security;
alter table tasks                     enable row level security;
alter table task_submissions          enable row level security;
alter table conversations             enable row level security;
alter table conversation_participants enable row level security;
alter table messages                  enable row level security;
alter table notifications             enable row level security;

create policy "demo_all_users"                     on users                     for all using (true) with check (true);
create policy "demo_all_drawings"                  on drawings                  for all using (true) with check (true);
create policy "demo_all_tasks"                     on tasks                     for all using (true) with check (true);
create policy "demo_all_task_submissions"          on task_submissions          for all using (true) with check (true);
create policy "demo_all_conversations"             on conversations             for all using (true) with check (true);
create policy "demo_all_conversation_participants" on conversation_participants for all using (true) with check (true);
create policy "demo_all_messages"                  on messages                  for all using (true) with check (true);
create policy "demo_all_notifications"             on notifications             for all using (true) with check (true);
