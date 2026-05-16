import { useNavigate } from 'react-router';
import HtmlBody from '../../imports/Html→Body-6/Html→Body-3-826';

export default function CompletedReviewingScreen() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const text = target.textContent;

    // Navigate to tasks tab
    if (text?.includes('할 일') && target.closest('[data-name*="Container"]')) {
      navigate('/tasks');
    }
    // Navigate to approved (승인됨) tab
    if (text?.includes('승인됨') && target.closest('[data-name="Segment Control"]')) {
      navigate('/completed');
    }
    // Navigate to rework tab
    if (text?.includes('재작업') && target.closest('[data-name="Segment Control"]')) {
      navigate('/completed/rework');
    }
    // Navigate to messages
    if (text?.includes('메시지') && target.closest('[data-name*="Container"]')) {
      navigate('/messages/admin');
    }
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto bg-white" onClick={handleClick}>
      <HtmlBody />
    </div>
  );
}
