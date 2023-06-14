import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingScreen from './components/LoadingScreen';
import RootNavigation from './components/RootNavigation';
import {AlertProvider} from './context/AlertContext';
import {SnackbarProvider} from './context/SnackbarContext';
import {persistor, store} from './stores/store';
import {Logger} from './utils/logger';
import {Provider as ReduxProvider} from 'react-redux';
import {ErrorBoundary, useErrorBoundary} from 'react-error-boundary';
import ErrorScreen from './components/ErrorScreen';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {useAppTheme} from './stores/themeSlice';

function fallbackRender({error}: {error: Error}) {
  return <ErrorScreen error={error} />;
}

export default function ErrorBoundaryLayer() {
  //putting the error boundary to highest level so it can also catch redux errors
  return (
    <ErrorBoundary
      onError={error => Logger.error(error)}
      fallbackRender={fallbackRender}>
      <ReduxLayer />
    </ErrorBoundary>
  );
}

const ReduxLayer = () => {
  const errorBoundary = useErrorBoundary();
  setJSExceptionHandler(error => {
    errorBoundary.showBoundary(error);
  }, true);

  setNativeExceptionHandler(exceptionString => {
    errorBoundary.showBoundary(exceptionString);
  });

  return (
    //need to move redux provider to another component to we can query the theme inside the next
    <ReduxProvider store={store}>
      <AppLayer />
    </ReduxProvider>
  );
};

const AppLayer = () => {
  const theme = useAppTheme();

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
};
