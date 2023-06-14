import {createContext} from 'react';

export const ThemeContext = createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});
