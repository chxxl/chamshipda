import { useEffect, useId, useMemo, useRef, useState } from "react";
import { MessageSearchOverlay } from "./MessageSearchOverlay";
import { MessagesTopAppBar } from "./MessagesTopAppBar";

export type AdminChatMessage = {
  id: string;
  role: "user" | "admin";
  body: string;
  meta?: string;
};

const ADMIN_REPLY_POOL = [
  "네, 내용 확인했습니다. 필요하시면 현장에서 다시 연락드리겠습니다.",
  "전달 감사합니다. 내부에 공유하고 조치 후 다시 말씀드릴게요.",
  "해당 건 담당자에게 전달했습니다. 잠시만 기다려 주세요.",
  "추가 자료나 사진이 있으면 함께 보내 주시면 검토에 도움이 됩니다.",
];

type AdminChatOverlayProps = {
  messages: AdminChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<AdminChatMessage[]>>;
  onClose: () => void;
};

export function AdminChatOverlay({ messages, setMessages, onClose }: AdminChatOverlayProps) {
  const headerTitleId = useId();
  const [draft, setDraft] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const chatSearchItems = useMemo(
    () =>
      messages.map((m) => ({
        id: m.id,
        title: m.role === "user" ? "나" : (m.meta ?? "관리자"),
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

    const userMsg: AdminChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      body: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");

    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    replyTimerRef.current = setTimeout(() => {
      const reply =
        ADMIN_REPLY_POOL[Math.floor(Math.random() * ADMIN_REPLY_POOL.length)] ?? ADMIN_REPLY_POOL[0];
      const adminMsg: AdminChatMessage = {
        id: crypto.randomUUID(),
        role: "admin",
        body: reply,
        meta: "관리자",
      };
      setMessages((prev) => [...prev, adminMsg]);
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
            m.role === "admin" ? (
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
            데모용 자동 응답입니다. 실제 서비스에서는 관리자가 확인 후 답장합니다.
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
