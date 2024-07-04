import React from 'react';

import { Platform } from 'react-native';

import { ThemeProvider } from '@react-navigation/native';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ErrorBoundaryProps } from 'expo-router/src/exports';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ErrorScreen from '@/components/ErrorScreen';
import RootNavigationHeader from '@/components/RootNavigationHeader';
import { AlertProvider } from '@/context/AlertContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { rootRoutes } from '@/navigation/routes';
import { persistor, store } from '@/stores/store';
import { useAppTheme } from '@/stores/themeSlice';
import { Logger } from '@/utils/logger';

SplashScreen.preventAutoHideAsync();

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorScreen error={props.error} />;
}

export default function Layout() {
  // disable console warnings and errors in web so console is not spammed by deprecation warnings and stuff resulting from react-native-web
  if (!__DEV__ && Platform.OS === 'web') {
    console.warn = () => {};
    console.error = () => {};
  }

  return (
    //need to move redux provider to another component to we can query the theme inside the next
    <ReduxProvider store={store}>
      <AppLayer />
    </ReduxProvider>
  );
}

const AppLayer = () => {
  const theme = useAppTheme();

  //TODO: remove once issue is resolved: https://github.com/expo/router/issues/837
  //workaround to hide twitching of drawer on startup
  setTimeout(() => SplashScreen.hideAsync(), 1200);

  return (
    <PersistGate
      persistor={persistor}
      loading={<Slot />}
      onBeforeLift={() => Logger.debug('Persist gate lifting.')}
    >
      <ThemeProvider value={theme}>
        <PaperProvider theme={theme}>
          <SnackbarProvider>
            <AlertProvider>
              <Stack
                screenOptions={{
                  // eslint-disable-next-line react/no-unstable-nested-components
                  header: (props) => (
                    <RootNavigationHeader title="Modal" {...props} />
                  ),
                }}
              >
                {rootRoutes.map((route) => {
                  return (
                    <Stack.Screen
                      key={route.name}
                      name={route.name}
                      options={route.options}
                    />
                  );
                })}
              </Stack>
              <StatusBar style={theme.dark ? 'light' : 'dark'} animated />
            </AlertProvider>
          </SnackbarProvider>
        </PaperProvider>
      </ThemeProvider>
    </PersistGate>
  );
};
