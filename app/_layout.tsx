import {ThemeProvider} from '@react-navigation/native';
import {Slot, Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigationHeader from '@/components/RootNavigationHeader';
import {AlertProvider} from '@/context/AlertContext';
import {SnackbarProvider} from '@/context/SnackbarContext';
import {rootRoutes} from '@/navigation/routes';
import {persistor, store} from '@/stores/store';
import {Logger} from '@/utils/logger';
import ErrorScreen from '@/components/ErrorScreen';
import {useAppTheme} from '@/stores/themeSlice';
import {ErrorBoundaryProps} from 'expo-router/src/exports';

export function ErrorBoundary(props: ErrorBoundaryProps) {
  //putting the error boundary to highest level so it can also catch redux errors
  return <ErrorScreen error={props.error} />;
}

export default function Layout() {
  return (
    //need to move redux provider to another component to we can query the theme inside the next
    <ReduxProvider store={store}>
      <AppLayer />
    </ReduxProvider>
  );
}

//TODO: do some cool stuff with splashscreen

const AppLayer = () => {
  const theme = useAppTheme();

  return (
    <PersistGate
      persistor={persistor}
      loading={<Slot />}
      onBeforeLift={() => Logger.debug('Persist gate lifting.')}>
      <ThemeProvider value={theme}>
        <PaperProvider theme={theme}>
          <SnackbarProvider>
            <AlertProvider>
              <Stack
                screenOptions={{
                  header: props => (
                    <RootNavigationHeader title="Modal" {...props} />
                  ),
                }}>
                {rootRoutes.map(route => {
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
