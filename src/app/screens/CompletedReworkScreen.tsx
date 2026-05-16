import { useNavigate } from "react-router";
import HtmlBody from "../../imports/Html→Body-7/Html→Body-3-317";

export default function CompletedReworkScreen() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const text = target.textContent;
    const inSubSegment = target.closest('[data-name="Sub-Segment Toggle"]');

    if (text?.includes("승인됨") && inSubSegment) {
      navigate("/completed");
      return;
    }
    if (text?.includes("검토 중") && inSubSegment) {
      navigate("/completed/reviewing");
      return;
    }

    if (text?.includes("할 일") && target.closest('[data-name*="Button"]')) {
      navigate("/tasks");
    }
    if (text?.includes("메시지") && target.closest('[data-name*="Button"]')) {
      navigate("/messages/admin");
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-[390px] bg-white" onClick={handleClick}>
      <HtmlBody />
    </div>
  );
}
