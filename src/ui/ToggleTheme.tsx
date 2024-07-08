import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

import { useThemeStore } from '../store/store';

const ToggleTheme = () => {
  const theme = useThemeStore((store) => store.theme);
  const toggleTheme = useThemeStore((store) => store.setTheme);

  return (
    <button type='button' aria-label='toggle theme' onClick={toggleTheme}>
      {theme === 'light' && <IoSunnyOutline size={20} />}
      {theme === 'dark' && <IoMoonOutline size={20} />}
    </button>
  );
};

export default ToggleTheme;
