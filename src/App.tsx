/* eslint-disable react/no-unstable-nested-components */
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from './components/DrawerContent';
import Header from './components/Header';
import {routes} from './routes';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="play"
      drawerContent={props => <DrawerContent {...props} />}>
      {routes.map(route => {
        return (
          <Drawer.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{
              title: route.displayName,
              header: ({navigation}) => (
                <Header title={route.displayName} navigation={navigation} />
              ),
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
