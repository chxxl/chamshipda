import { useNavigate } from 'react-router';
import HtmlBody from '../../imports/Html→Body/Html→Body';

export default function LoginScreen() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Navigate to tasks when clicking login button
    if (target.closest('[data-name="Button"]') || target.textContent?.includes('로그인')) {
      navigate('/tasks');
    }
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto bg-white" onClick={handleClick}>
      <HtmlBody />
    </div>
  );
}
