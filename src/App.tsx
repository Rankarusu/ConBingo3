import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './components/DrawerNavigation';
import {getTheme} from './hooks/useAppTheme';
import {ThemeContext} from './ThemeContext';

export default function App() {
  //TODO: in the long run we're gonna save the current theme in local storage or something
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = getTheme(isThemeDark);

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
          <DrawerNavigation />
        </PaperProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
