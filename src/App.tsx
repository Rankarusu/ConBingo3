import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingScreen from './components/LoadingScreen';
import RootNavigation from './components/RootNavigation';
import {AlertProvider} from './context/AlertContext';
import {SnackbarProvider} from './context/SnackbarContext';
import {useAppSelector} from './hooks';
import {persistor} from './stores/store';
import {selectAppTheme} from './stores/themeSlice';
import {Logger} from './utils/logger';

export default function App() {
  const theme = useAppSelector(selectAppTheme);

  return (
    <PersistGate
      persistor={persistor}
      loading={<LoadingScreen />}
      onBeforeLift={() => Logger.debug('Persist gate lifting.')}>
      <NavigationContainer theme={theme}>
        <PaperProvider theme={theme}>
          <SnackbarProvider>
            <AlertProvider>
              <RootNavigation />
            </AlertProvider>
          </SnackbarProvider>
        </PaperProvider>
      </NavigationContainer>
    </PersistGate>
  );
}
