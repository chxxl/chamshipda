import { useEffect, useId, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { MessageSearchOverlay } from "./MessageSearchOverlay";
import { MessagesTopAppBar } from "./MessagesTopAppBar";

export type TeamPeerChatMessage = {
  id: string;
  role: "user" | "peer";
  body: string;
  meta?: string;
};

const PEER_REPLY_POOL = [
  "ㅇㅇ 지금 창고 가서 확인해볼게요!",
  "잠시만요, 사진 찍어서 보내드릴게요.",
  "오후에 현장 지나가면서 들를게요. 연락 주세요~",
  "그거 저번에 비슷한 거 해봤는데, 나중에 팁 하나 알려드릴게요.",
];

export const TEAM_PEER_IDS = ["yongjeop", "choesinip", "parkgisa"] as const;
export type TeamPeerId = (typeof TEAM_PEER_IDS)[number];

const PEER_DISPLAY_META: Record<TeamPeerId, string> = {
  yongjeop: "이용접 · 팀원",
  choesinip: "최신입 · 팀원",
  parkgisa: "박기사 · 팀원",
};

export function getTeamPeerDisplayMeta(peerId: TeamPeerId): string {
  return PEER_DISPLAY_META[peerId];
}

export function getTeamPeerSeedMessages(peerId: TeamPeerId): TeamPeerChatMessage[] {
  if (peerId === "yongjeop") {
    return [
      {
        id: "seed-y-1",
        role: "peer",
        meta: PEER_DISPLAY_META.yongjeop,
        body: "혹시 가스켓 여분 있으세요?",
      },
    ];
  }
  if (peerId === "choesinip") {
    return [
      {
        id: "seed-c-1",
        role: "peer",
        meta: PEER_DISPLAY_META.choesinip,
        body: "선배님, V-203 어떻게 잡아야 하는지 알려주실 수 있을까요?",
      },
    ];
  }
  return [
    {
      id: "seed-p-1",
      role: "peer",
      meta: PEER_DISPLAY_META.parkgisa,
      body: "내일 아침 TBM 시간에 뵙겠습니다.",
    },
  ];
}

type TeamMemberChatOverlayProps = {
  peerId: TeamPeerId;
  messages: TeamPeerChatMessage[];
  setMessages: Dispatch<SetStateAction<TeamPeerChatMessage[]>>;
  onClose: () => void;
};

export function TeamMemberChatOverlay({ peerId, messages, setMessages, onClose }: TeamMemberChatOverlayProps) {
  const headerTitleId = useId();
  const [draft, setDraft] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const chatSearchItems = useMemo(
    () =>
      messages.map((m) => ({
        id: m.id,
        title: m.role === "user" ? "나" : (m.meta ?? "팀원"),
        body: m.body,
        meta: m.role === "user" ? "보낸 메시지" : "받은 메시지",
      })),
    [messages],
  );

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    };
  }, []);

  const send = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const userMsg: TeamPeerChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      body: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");

    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    replyTimerRef.current = setTimeout(() => {
      const reply =
        PEER_REPLY_POOL[Math.floor(Math.random() * PEER_REPLY_POOL.length)] ?? PEER_REPLY_POOL[0];
      const meta = getTeamPeerDisplayMeta(peerId);
      const peerMsg: TeamPeerChatMessage = {
        id: crypto.randomUUID(),
        role: "peer",
        body: reply,
        meta,
      };
      setMessages((prev) => [...prev, peerMsg]);
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex justify-center bg-black/35"
      role="dialog"
      aria-modal="true"
      aria-labelledby={headerTitleId}
    >
      <div
        className="relative flex h-full w-full max-w-[390px] flex-col bg-[#f8f9ff]"
        onClick={(e) => e.stopPropagation()}
      >
        <MessagesTopAppBar
          className="z-[1] shrink-0"
          fixedToCanvas={false}
          titleLabelId={headerTitleId}
          onBackClick={onClose}
          onSearchClick={() => setSearchOpen(true)}
        />

        <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m) =>
            m.role === "peer" ? (
              <div key={m.id} className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[#c3c6d6] bg-white px-3.5 py-2.5 shadow-sm">
                  {m.meta ? (
                    <p className="mb-1 font-['Pretendard:Semi_Bold',sans-serif] text-[12px] text-[#0052cc]">
                      {m.meta}
                    </p>
                  ) : null}
                  <p className="whitespace-pre-wrap font-['Pretendard:Medium',sans-serif] text-[15px] leading-[22px] text-[#0d1c2f]">
                    {m.body}
                  </p>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#003d9b] px-3.5 py-2.5 shadow-sm">
                  <p className="whitespace-pre-wrap font-['Pretendard:Medium',sans-serif] text-[15px] leading-[22px] text-white">
                    {m.body}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="shrink-0 border-t border-[#c3c6d6] bg-white p-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="메시지를 입력하세요"
              className="min-h-[44px] flex-1 rounded-xl border border-[#c3c6d6] bg-[#f8f9ff] px-3 font-['Pretendard:Medium',sans-serif] text-[15px] text-[#0d1c2f] outline-none focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20"
            />
            <button
              type="button"
              onClick={send}
              className="shrink-0 rounded-xl bg-[#003d9b] px-4 font-['Pretendard:Bold',sans-serif] text-[15px] text-white shadow-md hover:bg-[#002d75]"
            >
              전송
            </button>
          </div>
          <p className="mt-2 text-center font-['Pretendard:Regular',sans-serif] text-[11px] text-[#737685]">
            데모용 자동 응답입니다. 실제 서비스에서는 팀원이 직접 답장합니다.
          </p>
        </div>

        <MessageSearchOverlay
          variant="nested"
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          items={chatSearchItems}
        />
      </div>
    </div>
  );
}
