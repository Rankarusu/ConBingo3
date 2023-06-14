/* eslint-disable react/no-unstable-nested-components */
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from './DrawerContent';
import Header from './Header';
import {drawerRoutes} from '../routes';
/*
We wrap a drawer inside a stack nav here to achieve a neat modal-like effect
while still keeping our drawer which is our "main" navigation
*/
export const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="play"
      drawerContent={props => <DrawerContent {...props} />}>
      {drawerRoutes.map(route => {
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
