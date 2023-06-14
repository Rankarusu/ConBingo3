import React, {useCallback, useEffect, useMemo, useState} from 'react';
import 'react-native-gesture-handler';
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './components/RootNavigation';
import {getTheme, inferTheme} from './hooks/useAppTheme';
import {ThemeContext} from './ThemeContext';
import {persistor, store} from './stores/store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    inferTheme().then(theme => {
      setIsThemeDark(theme === 'dark' ? true : false);
      setIsLoading(false);
    });
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
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={<ActivityIndicator />}>
        <ThemeContext.Provider value={preferences}>
          {!isLoading && ( //to supress theme flashing on app start
            <NavigationContainer theme={theme}>
              <PaperProvider theme={theme}>
                <RootNavigation />
              </PaperProvider>
            </NavigationContainer>
          )}
        </ThemeContext.Provider>
      </PersistGate>
    </ReduxProvider>
  );
}
