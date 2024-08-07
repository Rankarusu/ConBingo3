import React from 'react';

import { Platform } from 'react-native';

import { Drawer } from 'expo-router/drawer';

import DrawerContent from '@/components/DrawerContent';
import DrawerNavigationHeader from '@/components/DrawerNavigationHeader';
import { INITIAL_ROUTE, appRoutes, hiddenRoutes } from '@/navigation/routes';

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer
      defaultStatus="closed"
      initialRouteName={INITIAL_ROUTE}
      backBehavior={Platform.OS === 'web' ? undefined : 'initialRoute'}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {[...appRoutes, ...hiddenRoutes].map((route) => {
        return (
          <Drawer.Screen
            key={route.name}
            name={route.name}
            options={{
              title: route.displayName,
              header: (props) => (
                <DrawerNavigationHeader {...props} title={route.displayName} />
              ),
            }}
          />
        );
      })}
    </Drawer>
  );
};

export default DrawerNavigation;
