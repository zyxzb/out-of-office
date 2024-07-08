import { useEffect } from 'react';

import { useThemeStore } from '../store/store';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore((store) => store.theme);

  useEffect(() => {
    try {
      const localTheme = JSON.parse(localStorage.getItem('theme') || '');
      if (localTheme) {
        document.documentElement.setAttribute(
          'data-mode',
          localTheme.state.theme,
        );
        document.documentElement.className = localTheme.state.theme;
      }
    } catch (err) {
      console.log('Error loading the color theme');
    }
  }, [theme]);

  return children;
};

export default ThemeProvider;
