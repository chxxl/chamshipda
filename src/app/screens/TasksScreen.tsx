import { useNavigate } from 'react-router';
import HtmlBody from '../../imports/Html→Body-1/Html→Body-3-180';

export default function TasksScreen() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const text = target.textContent;

    // Navigate to completed tab
    if (text?.includes('완료') && target.closest('[data-name*="tab"]')) {
      navigate('/completed');
    }
    // Navigate to messages
    if (text?.includes('메시지') && target.closest('[data-name*="tab"]')) {
      navigate('/messages/admin');
    }
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto bg-white" onClick={handleClick}>
      <HtmlBody />
    </div>
  );
}
