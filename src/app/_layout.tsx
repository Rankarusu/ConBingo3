import React from 'react';

import { Platform, StyleSheet, View } from 'react-native';

import { ThemeProvider } from '@react-navigation/native';
import { ErrorBoundaryProps, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ErrorScreen from '@/components/ErrorScreen';
import RootNavigationHeader from '@/components/RootNavigationHeader';
import { AlertProvider } from '@/context/AlertContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { rootRoutes } from '@/navigation/routes';
import { persistor, store } from '@/stores/store';
import { useAppTheme } from '@/stores/themeSlice';
import { Logger } from '@/utils/logger';

SplashScreen.preventAutoHideAsync();

export function ErrorBoundary(props: Readonly<ErrorBoundaryProps>) {
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

  //this is just here to hide the initial twitch when screens mount
  setTimeout(() => SplashScreen.hideAsync(), 500);

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
              <GestureHandlerRootView>
                <View
                  // TODO: remove this workaround once expo router fixed the flickering with modals.
                  // this just makes it less noticeable
                  style={[
                    styles.rootView,
                    { backgroundColor: theme.colors.background },
                  ]}
                >
                  <Stack
                    screenOptions={{
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
                </View>
                <StatusBar style={theme.dark ? 'light' : 'dark'} animated />
              </GestureHandlerRootView>
            </AlertProvider>
          </SnackbarProvider>
        </PaperProvider>
      </ThemeProvider>
    </PersistGate>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});
