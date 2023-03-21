import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './components/RootNavigation';
import {useAppSelector} from './hooks';
import {persistor} from './stores/store';
import {selectAppTheme} from './stores/themeSlice';

export default function App() {
  const theme = useAppSelector(selectAppTheme);

  return (
    //other providers should wrap the paper provider

    <PersistGate persistor={persistor} loading={<ActivityIndicator />}>
      <NavigationContainer theme={theme}>
        <PaperProvider theme={theme}>
          <RootNavigation />
        </PaperProvider>
      </NavigationContainer>
    </PersistGate>
  );
}
