/* eslint-disable react/no-unstable-nested-components */
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from './DrawerContent';
import DrawerNavigationHeader from './DrawerNavigationHeader';
import {INITIAL_ROUTE, appRoutes} from '../navigation/routes';

/*
We wrap a drawer inside a stack nav here to achieve a neat modal-like effect
while still keeping our drawer which is our "main" navigation
*/
const Drawer = createDrawerNavigator();

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={INITIAL_ROUTE}
      backBehavior="initialRoute"
      detachInactiveScreens={false}
      drawerContent={props => <DrawerContent {...props} />}>
      {appRoutes.map(route => {
        return (
          <Drawer.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{
              title: route.displayName,
              header: props => (
                <DrawerNavigationHeader {...props} title={route.displayName} />
              ),
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
