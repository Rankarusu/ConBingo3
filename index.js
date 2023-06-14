'use client';

import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import App from './src/App';
import ErrorScreen from './src/components/ErrorScreen';
import {store} from './src/stores/store';
import {Logger} from './src/utils/logger';

export default function Main() {
  return (
    //we put the redux provider here because we want to read the theme from it in the app component, therefore we need to wrap App
    <ErrorBoundary
      onError={error => Logger.error(error)}
      FallbackComponent={ErrorScreen}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  );
}

AppRegistry.registerComponent(appName, () => Main);
