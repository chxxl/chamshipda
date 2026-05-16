"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FilterType = "all" | "urgent" | "rework" | "normal";
type CardType = "urgent" | "rework" | "normal";

interface ReviewCard {
  id: string;
  type: CardType;
  author: string;
  time: string;
  title: string;
  drawing: string;
  attachment: string;
  feedback?: string;
  feedbackAuthor?: string;
  attachmentIcon?: "image" | "description";
  attachmentLabel?: string;
}

const CARDS: ReviewCard[] = [
  {
    id: "1",
    type: "urgent",
    author: "김작업",
    time: "10분 전",
    title: "V-203 게이트밸브 재설치",
    drawing: "P-101 Rev.D",
    attachment: "사진 3장",
    feedback: "가스켓 방향이 반대입니다",
    feedbackAuthor: "박반장",
    attachmentIcon: "image",
    attachmentLabel: "도면·사진 보기",
  },
  {
    id: "2",
    type: "rework",
    author: "이용접",
    time: "32분 전",
    title: "DN50 배관 라인 연결",
    drawing: "P-101 Rev.D",
    attachment: "사진 5장",
    feedback: "가스켓 누락",
    feedbackAuthor: "박반장",
    attachmentIcon: "image",
    attachmentLabel: "도면·사진 보기",
  },
  {
    id: "3",
    type: "normal",
    author: "최신입",
    time: "1시간 전",
    title: "용접부 비파괴검사 결과",
    drawing: "P-102 Rev.A",
    attachment: "검사지 1장",
    attachmentIcon: "description",
    attachmentLabel: "검사지 보기",
  },
  {
    id: "4",
    type: "normal",
    author: "정반장",
    time: "2시간 전",
    title: "T-203 티 분기관 설치",
    drawing: "M-305 Rev.C",
    attachment: "사진 2장",
    attachmentIcon: "image",
    attachmentLabel: "도면·사진 보기",
  },
  {
    id: "5",
    type: "normal",
    author: "이용접",
    time: "3시간 전",
    title: "라인 도색 검수",
    drawing: "S-901 Rev.B",
    attachment: "사진 4장",
    attachmentIcon: "image",
    attachmentLabel: "도면·사진 보기",
  },
  {
    id: "6",
    type: "normal",
    author: "김작업",
    time: "4시간 전",
    title: "플랜지 가스켓 점검",
    drawing: "P-101 Rev.D",
    attachment: "사진 2장",
    attachmentIcon: "image",
    attachmentLabel: "도면·사진 보기",
  },
];

const FILTER_CONFIG: Record<
  FilterType,
  { label: string; activeBg: string; activeText: string; inactiveBg: string; inactiveText: string }
> = {
  all: {
    label: "전체",
    activeBg: "#0052cc",
    activeText: "#ffffff",
    inactiveBg: "#0052cc",
    inactiveText: "#ffffff",
  },
  urgent: {
    label: "긴급",
    activeBg: "#DC2626",
    activeText: "#ffffff",
    inactiveBg: "#FEE2E2",
    inactiveText: "#DC2626",
  },
  rework: {
    label: "재작업",
    activeBg: "#FF6B00",
    activeText: "#ffffff",
    inactiveBg: "#FFEDD5",
    inactiveText: "#FF6B00",
  },
  normal: {
    label: "일반",
    activeBg: "#475569",
    activeText: "#ffffff",
    inactiveBg: "#F1F5F9",
    inactiveText: "#475569",
  },
};

const STATUS_CHIP: Record<CardType, { label: string; bg: string; text: string; borderL: string }> = {
  urgent: { label: "긴급", bg: "#FEE2E2", text: "#DC2626", borderL: "#DC2626" },
  rework: { label: "재작업", bg: "#FFEDD5", text: "#FF6B00", borderL: "#FF6B00" },
  normal: { label: "신규 신청", bg: "#F1F5F9", text: "#475569", borderL: "transparent" },
};

export default function ReviewPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("all");
  const [rejectingCard, setRejectingCard] = useState<ReviewCard | null>(null);
  const [viewingCard, setViewingCard] = useState<ReviewCard | null>(null);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const remainingCards = CARDS.filter((c) => !dismissedIds.has(c.id));
  const filteredCards =
    filter === "all" ? remainingCards : remainingCards.filter((c) => c.type === filter);

  const countByType: Record<FilterType, number> = {
    all: remainingCards.length,
    urgent: remainingCards.filter((c) => c.type === "urgent").length,
    rework: remainingCards.filter((c) => c.type === "rework").length,
    normal: remainingCards.filter((c) => c.type === "normal").length,
  };

  const dismissCard = (id: string) => {
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div
      className="min-h-screen bg-white text-[#131c2b] pb-[100px]"
      style={{ fontFamily: "var(--font-hanken), sans-serif" }}
    >
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-[56px] bg-white border-b border-[#c3c6d6] flex items-center justify-between px-4 z-50 max-w-screen-sm mx-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center"
            aria-label="뒤로 가기"
          >
            <span className="material-symbols-outlined text-[28px] text-[#0E1726]">chevron_left</span>
          </button>
          <h1 className="text-[18px] font-bold text-[#0E1726]">검토 대기</h1>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined text-[24px] text-[#434654]">notifications</span>
          <div className="absolute top-[2px] right-[2px] w-2 h-2 bg-[#ba1a1a] rounded-full border border-white" />
        </div>
      </header>

      {/* Filter Chips */}
      <nav
        className="fixed top-[56px] left-0 right-0 h-[56px] bg-white flex items-center gap-2 px-4 z-40 max-w-screen-sm mx-auto overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {(Object.keys(FILTER_CONFIG) as FilterType[]).map((key) => {
          const cfg = FILTER_CONFIG[key];
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="flex-shrink-0 h-[36px] px-4 rounded-full text-[14px] font-medium flex items-center justify-center transition-colors"
              style={{
                backgroundColor: active ? cfg.activeBg : cfg.inactiveBg,
                color: active ? cfg.activeText : cfg.inactiveText,
              }}
            >
              {cfg.label} {countByType[key]}
            </button>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="pt-[128px] px-4 space-y-4 max-w-screen-sm mx-auto">
        {filteredCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#94A3B8]">
            <span className="material-symbols-outlined text-[48px] mb-2">inbox</span>
            <p className="text-[14px]">검토 대기 항목이 없습니다</p>
          </div>
        ) : (
          filteredCards.map((card) => (
            <ReviewCardItem
              key={card.id}
              card={card}
              onReject={() => setRejectingCard(card)}
              onApprove={() => dismissCard(card.id)}
              onView={() => setViewingCard(card)}
            />
          ))
        )}
      </main>

      {rejectingCard && (
        <RejectModal
          card={rejectingCard}
          onClose={() => setRejectingCard(null)}
          onSubmit={() => {
            dismissCard(rejectingCard.id);
            setRejectingCard(null);
          }}
        />
      )}

      {viewingCard && (
        <ViewerModal card={viewingCard} onClose={() => setViewingCard(null)} />
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-white border-t border-[#E2E8F0] flex items-center px-2 z-50 max-w-screen-sm mx-auto">
        <BottomNavItem icon="home" label="홈" onClick={() => router.push("/home_admin")} />
        <BottomNavItem icon="group" label="팀원" />
        <BottomNavItem icon="description" label="도면" />
        <BottomNavItem icon="chat_bubble" label="메시지" badge={3} />
      </nav>
    </div>
  );
}

function ReviewCardItem({
  card,
  onReject,
  onApprove,
  onView,
}: {
  card: ReviewCard;
  onReject: () => void;
  onApprove: () => void;
  onView: () => void;
}) {
  const chip = STATUS_CHIP[card.type];
  const hasFeedback = !!card.feedback;
  const feedbackBg = card.type === "urgent" ? "#FEE2E2" : "#e8eeff";

  return (
    <article
      className="bg-white rounded-xl border border-[#c3c6d6] p-5 shadow-sm"
      style={{
        borderLeftWidth: chip.borderL === "transparent" ? undefined : "3px",
        borderLeftColor: chip.borderL === "transparent" ? undefined : chip.borderL,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className="px-2 py-1 rounded text-[13px] font-medium"
          style={{ backgroundColor: chip.bg, color: chip.text }}
        >
          {chip.label}
        </span>
        <span className="text-[#434654] text-[13px]">
          {card.author} · {card.time}
        </span>
      </div>
      <h2 className="text-[18px] font-bold text-[#0E1726] mb-1 leading-6">{card.title}</h2>
      <p className="text-[#434654] text-[14px] mb-4">
        <span style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{card.drawing}</span> ·{" "}
        {card.attachment}
      </p>

      {hasFeedback && (
        <div
          className="p-3 rounded-lg mb-4"
          style={{ backgroundColor: feedbackBg }}
        >
          <p className="text-[#131c2b] text-[14px]">
            {card.feedbackAuthor}: {card.feedback}
          </p>
        </div>
      )}

      <button
        onClick={onView}
        className="flex items-center gap-1 text-[#003d9b] font-medium text-[14px] mb-4"
      >
        <span className="material-symbols-outlined text-[16px]">
          {card.attachmentIcon ?? "image"}
        </span>
        {card.attachmentLabel ?? "도면·사진 보기"}
      </button>

      <div className="flex gap-3">
        <button
          onClick={onReject}
          className="flex-1 h-12 border-[1.5px] border-[#DC2626] text-[#DC2626] rounded-lg font-semibold text-[16px]"
        >
          반려
        </button>
        <button
          onClick={onApprove}
          className="flex-1 h-12 bg-[#16A34A] text-white rounded-lg font-semibold text-[16px]"
        >
          승인
        </button>
      </div>
    </article>
  );
}

function BottomNavItem({
  icon,
  label,
  badge,
  onClick,
}: {
  icon: string;
  label: string;
  badge?: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-1/4 text-[#94A3B8] gap-1 relative"
    >
      <span className="material-symbols-outlined text-[22px]">{icon}</span>
      <span className="text-[12px] font-medium">{label}</span>
      {badge && (
        <div className="absolute top-[4px] right-[25%] bg-[#DC2626] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
          {badge}
        </div>
      )}
    </button>
  );
}

const REJECT_REASONS = [
  "시공 품질 불량",
  "도면과 불일치",
  "안전 기준 미달",
  "사진·증빙 부족",
];

function RejectModal({
  card,
  onClose,
  onSubmit,
}: {
  card: ReviewCard;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [selectedReason, setSelectedReason] = useState<string>(REJECT_REASONS[0]);
  const [detail, setDetail] = useState("");

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0E1726]/60"
        style={{ backdropFilter: "blur(2px)" }}
      />

      {/* Bottom Sheet */}
      <div
        className="relative w-full max-w-screen-sm bg-white rounded-t-[20px] flex flex-col"
        style={{
          height: "min(720px, 90vh)",
          boxShadow: "0 -8px 24px rgba(0,0,0,0.15)",
          fontFamily: "var(--font-hanken), sans-serif",
        }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-[40px] h-[4px] bg-[#CBD5E1] rounded-full" />
        </div>

        {/* Header */}
        <header className="flex items-center justify-between px-4 pb-4 border-b border-[#E2E8F0]">
          <div className="flex flex-col">
            <h1 className="text-[22px] font-bold text-[#DC2626] leading-tight">작업 반려</h1>
            <span className="text-[14px] text-[#475569] mt-0.5">{card.title}</span>
          </div>
          <button
            onClick={onClose}
            className="w-[28px] h-[28px] flex items-center justify-center text-[#475569]"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>
        </header>

        {/* Body */}
        <main
          className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {/* 반려 사유 */}
          <section className="space-y-3">
            <label className="text-[14px] font-medium text-[#475569] block">반려 사유</label>
            <div className="space-y-2">
              {REJECT_REASONS.map((reason) => {
                const selected = selectedReason === reason;
                return (
                  <button
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    className={`w-full flex items-center justify-between h-[56px] px-4 rounded-lg border-[1.5px] transition-colors ${
                      selected
                        ? "border-[#0052cc] bg-[#E6EFFF]"
                        : "border-[#CBD5E1] bg-white"
                    }`}
                  >
                    <span
                      className={`text-[15px] ${selected ? "font-semibold text-[#131c2b]" : "text-[#131c2b]"}`}
                    >
                      {reason}
                    </span>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        color: selected ? "#0052cc" : "#CBD5E1",
                        fontVariationSettings: selected ? "'FILL' 1" : undefined,
                      }}
                    >
                      {selected ? "radio_button_checked" : "radio_button_unchecked"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 상세 사유 */}
          <section className="space-y-2">
            <label className="text-[14px] font-medium text-[#475569] block">
              상세 사유 <span className="text-[#DC2626]">*</span>
            </label>
            <div className="relative">
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value.slice(0, 200))}
                placeholder="무엇을 어떻게 수정해야 하는지 적어주세요"
                className="w-full h-[120px] p-4 text-[15px] border-[1.5px] border-[#CBD5E1] rounded-xl focus:border-[#0052cc] outline-none resize-none placeholder:text-[#94A3B8]"
              />
              <span
                className="absolute bottom-3 right-4 text-[12px] text-[#94A3B8]"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {detail.length} / 200자
              </span>
            </div>
          </section>

          {/* 재작업 마감일시 */}
          <section className="space-y-2">
            <label className="text-[14px] font-medium text-[#475569] block">재작업 마감일시</label>
            <button className="w-full flex items-center px-4 h-[48px] border-[1.5px] border-[#CBD5E1] rounded-lg bg-white">
              <span className="material-symbols-outlined text-[#475569] mr-2">schedule</span>
              <span className="flex-1 text-[15px] text-[#131c2b] text-left">오늘 18:00 (3시간 후)</span>
              <span className="material-symbols-outlined text-[#475569]">expand_more</span>
            </button>
          </section>

          {/* 경고 박스 */}
          <section className="p-3 bg-[#FEF3C7] rounded-lg flex gap-2">
            <span className="material-symbols-outlined text-[#0E1726] text-[20px] mt-0.5">
              warning
            </span>
            <p className="text-[14px] leading-relaxed text-[#0E1726]">
              반려 시 {card.author}님의 <strong className="font-bold">&apos;할 일&apos;</strong>{" "}
              목록에 빨간색으로 <strong className="font-bold">&apos;재작업 필요&apos;</strong>{" "}
              표시됩니다. 즉시 알림이 발송됩니다.
            </p>
          </section>

          <div className="h-20" />
        </main>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E2E8F0] flex gap-3">
          <button
            onClick={onClose}
            className="w-[40%] h-[52px] border-[1.5px] border-[#CBD5E1] text-[#475569] font-medium text-[16px] rounded-lg"
          >
            취소
          </button>
          <button
            onClick={onSubmit}
            className="w-[60%] h-[52px] bg-[#DC2626] text-white font-bold text-[17px] rounded-lg active:scale-95 transition-transform duration-150"
          >
            반려 보내기
          </button>
        </footer>
      </div>
    </div>
  );
}

function ViewerModal({ card, onClose }: { card: ReviewCard; onClose: () => void }) {
  const photoCount = parseInt(card.attachment.match(/\d+/)?.[0] ?? "3", 10);
  const hasDrawing = card.attachmentIcon !== "description";
  const [tab, setTab] = useState<"drawing" | "photos">(hasDrawing ? "drawing" : "photos");

  const photos = Array.from({ length: photoCount }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/seed/${card.id}-${i}/600/450`,
  }));

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#0a1525]"
      style={{ fontFamily: "var(--font-hanken), sans-serif" }}
    >
      {/* Top Bar */}
      <header className="h-[56px] flex items-center justify-between px-4 text-white">
        <button onClick={onClose} aria-label="닫기" className="flex items-center justify-center">
          <span className="material-symbols-outlined text-[26px]">close</span>
        </button>
        <h1 className="text-[15px] font-semibold truncate mx-3 flex-1 text-center">{card.title}</h1>
        <button aria-label="더보기" className="flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px]">more_vert</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {hasDrawing && (
          <button
            onClick={() => setTab("drawing")}
            className={`flex-1 h-[44px] text-[14px] font-semibold transition-colors ${
              tab === "drawing"
                ? "text-white border-b-2 border-white"
                : "text-white/50 border-b-2 border-transparent"
            }`}
          >
            도면
          </button>
        )}
        <button
          onClick={() => setTab("photos")}
          className={`flex-1 h-[44px] text-[14px] font-semibold transition-colors ${
            tab === "photos"
              ? "text-white border-b-2 border-white"
              : "text-white/50 border-b-2 border-transparent"
          }`}
        >
          사진 ({photoCount})
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        {tab === "drawing" ? (
          <div className="bg-white rounded-md p-4 mx-auto max-w-[320px]">
            <div
              className="aspect-[4/3] w-full bg-[#fafafa] border border-[#d1d5db] flex items-center justify-center text-[#6b7280]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 14px, #e5e7eb 14px, #e5e7eb 15px), repeating-linear-gradient(90deg, transparent, transparent 14px, #e5e7eb 14px, #e5e7eb 15px)",
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-[40px]">architecture</span>
                <span
                  className="text-[12px]"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  {card.drawing}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 max-w-screen-sm mx-auto">
            {photos.map((p) => (
              <div
                key={p.id}
                className="aspect-square bg-[#1e293b] rounded-lg overflow-hidden flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={`사진 ${p.id}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Info Bar */}
      <footer className="border-t border-white/10 px-4 py-3 flex items-center justify-between text-white/80 text-[12px]">
        <div className="flex flex-col">
          <span
            className="font-semibold"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {card.drawing}
          </span>
          <span className="text-white/50 mt-0.5">
            {tab === "drawing" ? "메인 배관 설치도" : `${card.author} 첨부`}
          </span>
        </div>
        <span className="text-white/60">
          {tab === "drawing" ? "1 / 1" : `${photoCount}장`}
        </span>
      </footer>
    </div>
  );
}
