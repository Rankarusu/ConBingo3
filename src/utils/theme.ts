import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from 'expo-router';
import { NavigationTheme } from 'react-native-paper/lib/typescript/types';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme as unknown as NavigationTheme,
  reactNavigationDark: NavigationDarkTheme as unknown as NavigationTheme,
});

export const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    ...NavigationDefaultTheme.fonts,
  },
};
export const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
  fonts: {
    ...MD3DarkTheme.fonts,
    ...NavigationDarkTheme.fonts,
  },
};

export type AppTheme = typeof CombinedDefaultTheme & typeof CombinedDarkTheme;
