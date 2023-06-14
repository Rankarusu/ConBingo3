import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {
  Provider as PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './src/App';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {ThemeContext} from './src/ThemeContext.ts';

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

export default function Main() {
  //TODO: in the long run we're gonna save the current theme in local storage or something
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    //other providers should wrap the paper provider
    <ThemeContext.Provider value={preferences}>
      <NavigationContainer theme={theme}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
