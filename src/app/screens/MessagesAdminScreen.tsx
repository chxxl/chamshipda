import { useState } from "react";
import { useNavigate } from "react-router";
import { AdminChatOverlay, type AdminChatMessage } from "../components/AdminChatOverlay";
import { MessageSearchOverlay } from "../components/MessageSearchOverlay";
import { ADMIN_MESSAGE_SEARCH_HITS } from "../components/messageSearchCatalog";
import HtmlBody from "../../imports/Html→Body-4/Html→Body-3-583";

const INITIAL_ADMIN_CHAT: AdminChatMessage[] = [
  {
    id: "seed-1",
    role: "admin",
    meta: "박반장 · 현장관리자",
    body: "V-203 재작업 부탁드립니다. 도면 기준과 실제 설치 각도가 상이합니다.",
  },
  {
    id: "seed-2",
    role: "admin",
    meta: "이품질 · 품질관리자",
    body: "오늘 검수 시간 변경 안내 드립니다. 오후 2시에서 4시로 변경되었습니다.",
  },
];

export default function MessagesAdminScreen() {
  const navigate = useNavigate();
  const [adminChatOpen, setAdminChatOpen] = useState(false);
  const [adminChatMessages, setAdminChatMessages] = useState<AdminChatMessage[]>(INITIAL_ADMIN_CHAT);
  const [messageSearchOpen, setMessageSearchOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest("[data-admin-chat-thread]")) {
      setMessageSearchOpen(false);
      setAdminChatOpen(true);
      return;
    }

    const text = target.textContent;

    if (text?.includes("할 일") && target.closest('[data-name*="Button"]')) {
      navigate("/tasks");
    }
    if (text?.includes("완료") && target.closest('[data-name*="Button"]')) {
      navigate("/completed");
    }
    if (text?.includes("팀원") && target.closest('[data-name*="Button"]')) {
      navigate("/messages/team");
    }
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-[390px] bg-white" onClick={handleClick}>
      <HtmlBody messagesTopBarProps={{ onSearchClick: () => setMessageSearchOpen(true) }} />
      <MessageSearchOverlay
        open={messageSearchOpen}
        onClose={() => setMessageSearchOpen(false)}
        items={ADMIN_MESSAGE_SEARCH_HITS}
      />
      {adminChatOpen ? (
        <AdminChatOverlay
          messages={adminChatMessages}
          setMessages={setAdminChatMessages}
          onClose={() => setAdminChatOpen(false)}
        />
      ) : null}
    </div>
  );
}
