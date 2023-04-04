import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './components/RootNavigation';
import {AlertProvider} from './context/AlertContext';
import {SnackbarProvider} from './context/SnackbarContext';
import {useAppSelector} from './hooks';
import {persistor} from './stores/store';
import {selectAppTheme} from './stores/themeSlice';
export default function App() {
  const theme = useAppSelector(selectAppTheme);

  return (
    <PersistGate persistor={persistor} loading={<ActivityIndicator />}>
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
