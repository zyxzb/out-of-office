import ToggleTheme from './ToggleTheme';
import UserInfo from '../features/authentication/UserInfo';

const Header = () => {
  return (
    <header className='border-b px-5 py-2 transition-[border-color]'>
      <ul className='flex items-center gap-4'>
        <li>
          <UserInfo />
        </li>
        <li>
          <ToggleTheme />
        </li>
      </ul>
    </header>
  );
};

export default Header;
