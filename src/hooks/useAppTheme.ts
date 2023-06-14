import 'react-native-gesture-handler';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
} from 'react-native-paper';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {Appearance, ColorSchemeName} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

const themeKey = '@theme';

type AppTheme = typeof CombinedDefaultTheme & typeof CombinedDarkTheme;
export const useAppTheme = () => useTheme<AppTheme>();
export const getTheme = (isThemeDark: boolean): AppTheme =>
  isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

export async function inferTheme() {
  let theme = await loadTheme();
  if (theme === null) {
    theme = Appearance.getColorScheme();
    console.log('Falling back on device theme:', theme);
    if (!theme) {
      theme = 'light';
      console.log('Falling back to default theme:', theme);
    }
    await saveTheme(theme);
  }
  return theme;
}

export async function saveTheme(theme: 'light' | 'dark') {
  console.log('saving theme to AsyncStorage', theme);
  await AsyncStorage.setItem(themeKey, theme);
}

async function loadTheme() {
  const theme = await AsyncStorage.getItem(themeKey);
  console.log('loaded theme from AsyncStorage:', theme);
  return theme as ColorSchemeName;
}
