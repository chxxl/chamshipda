import { useNavigate } from 'react-router';
import HtmlBody from '../../imports/Html→Body-2/Html→Body-3-317';

export default function CompletedScreen() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const text = target.textContent;

    // Navigate to tasks tab
    if (text?.includes('할 일') && target.closest('[data-name*="Button"]')) {
      navigate('/tasks');
    }
    // Navigate to reviewing tab
    if (text?.includes('검토 중') && target.closest('[data-name="Sub-Segment Toggle"]')) {
      navigate('/completed/reviewing');
    }
    // Navigate to rework tab
    if (text?.includes('재작업') && target.closest('[data-name="Sub-Segment Toggle"]')) {
      navigate('/completed/rework');
    }
    // Navigate to messages
    if (text?.includes('메시지') && target.closest('[data-name*="Button"]')) {
      navigate('/messages/admin');
    }
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto bg-white" onClick={handleClick}>
      <HtmlBody />
    </div>
  );
}
