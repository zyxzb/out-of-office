import RowsNumber from './RowsNumber';
import ToggleTheme from './ToggleTheme';
import UserInfo from '../features/authentication/UserInfo';

const Header = () => {
  return (
    <header className='flex justify-between border-b px-5 py-2 transition-[border-color]'>
      <div className='flex items-center gap-4'>
        <UserInfo />
        <ToggleTheme />
      </div>
      <div>
        <RowsNumber />
      </div>
    </header>
  );
};

export default Header;
