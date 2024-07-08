import ToggleTheme from './ToggleTheme';

const Header = () => {
  return (
    <header className='border-b px-5 py-2 transition-[border-color]'>
      <div className='flex items-center'>
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
