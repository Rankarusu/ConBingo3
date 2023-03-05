import React, {useCallback, useEffect, useMemo, useState} from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './components/RootNavigation';
import {getTheme, inferTheme} from './hooks/useAppTheme';
import {ThemeContext} from './ThemeContext';

export default function App() {
  //TODO: in the long run we're gonna save the current theme in local storage or something
  const [isThemeDark, setIsThemeDark] = useState(false);

  useEffect(() => {
    inferTheme().then(theme => setIsThemeDark(theme === 'dark' ? true : false));
  }, []);

  let theme = getTheme(isThemeDark);

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
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
          <RootNavigation />
        </PaperProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
