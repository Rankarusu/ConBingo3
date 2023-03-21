import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import App from './src/App';
import {store} from './src/stores/store';

export default function Main() {
  return (
    //we put the redux provider here because we want to read the theme from it in the app component, therefore we need to wrap App
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
