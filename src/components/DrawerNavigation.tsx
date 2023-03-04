/* eslint-disable react/no-unstable-nested-components */
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {routes} from '../routes';
import DrawerContent from './DrawerContent';
import Header from './Header';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
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
