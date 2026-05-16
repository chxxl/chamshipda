import { useState } from "react";
import { useNavigate } from "react-router";
import { MessageSearchOverlay } from "../components/MessageSearchOverlay";
import { TEAM_MESSAGE_SEARCH_HITS } from "../components/messageSearchCatalog";
import {
  getTeamPeerSeedMessages,
  TeamMemberChatOverlay,
  TEAM_PEER_IDS,
  type TeamPeerChatMessage,
  type TeamPeerId,
} from "../components/TeamMemberChatOverlay";
import { TeamAnnouncementOverlay } from "../components/TeamAnnouncementOverlay";
import HtmlBody from "../../imports/Html→Body-5/Html→Body-3-718";

function parseTeamPeerId(raw: string | null): TeamPeerId | null {
  if (!raw) return null;
  return (TEAM_PEER_IDS as readonly string[]).includes(raw) ? (raw as TeamPeerId) : null;
}

export default function MessagesTeamScreen() {
  const navigate = useNavigate();
  const [teamAnnouncementOpen, setTeamAnnouncementOpen] = useState(false);
  const [messageSearchOpen, setMessageSearchOpen] = useState(false);
  const [teamPeerChatOpen, setTeamPeerChatOpen] = useState(false);
  const [activeTeamPeerId, setActiveTeamPeerId] = useState<TeamPeerId | null>(null);
  const [teamPeerMessages, setTeamPeerMessages] = useState<TeamPeerChatMessage[]>([]);

  const openTeamPeerChat = (peerId: TeamPeerId) => {
    setMessageSearchOpen(false);
    setTeamAnnouncementOpen(false);
    setActiveTeamPeerId(peerId);
    setTeamPeerMessages(getTeamPeerSeedMessages(peerId));
    setTeamPeerChatOpen(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    const peerEl = target.closest("[data-team-peer-chat]");
    if (peerEl) {
      const id = parseTeamPeerId(peerEl.getAttribute("data-team-peer-chat"));
      if (id) {
        openTeamPeerChat(id);
        return;
      }
    }

    if (target.closest("[data-team-announcement]")) {
      setMessageSearchOpen(false);
      setTeamAnnouncementOpen(true);
      return;
    }

    const text = target.textContent;

    if (text?.includes("할 일") && target.closest('[data-name*="Link"]')) {
      navigate("/tasks");
    }
    if (text?.includes("완료") && target.closest('[data-name*="Link"]')) {
      navigate("/completed");
    }
    if (text?.includes("관리자") && target.closest('[data-name*="Button"]')) {
      navigate("/messages/admin");
    }
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-[390px] bg-white" onClick={handleClick}>
      <HtmlBody messagesTopBarProps={{ onSearchClick: () => setMessageSearchOpen(true) }} />
      <MessageSearchOverlay
        open={messageSearchOpen}
        onClose={() => setMessageSearchOpen(false)}
        items={TEAM_MESSAGE_SEARCH_HITS}
      />
      {teamAnnouncementOpen ? (
        <TeamAnnouncementOverlay onClose={() => setTeamAnnouncementOpen(false)} />
      ) : null}
      {teamPeerChatOpen && activeTeamPeerId ? (
        <TeamMemberChatOverlay
          peerId={activeTeamPeerId}
          messages={teamPeerMessages}
          setMessages={setTeamPeerMessages}
          onClose={() => {
            setTeamPeerChatOpen(false);
            setActiveTeamPeerId(null);
          }}
        />
      ) : null}
    </div>
  );
}
