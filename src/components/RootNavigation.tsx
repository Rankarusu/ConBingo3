/* eslint-disable react/no-unstable-nested-components */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {rootRoutes} from '../navigation/routes';
import RootNavigationHeader from './RootNavigationHeader';

/*
We wrap a drawer inside a stack nav here to achieve a neat modal-like effect
while still keeping our drawer which is our "main" navigation
*/
const Stack = createStackNavigator();

const RootNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <RootNavigationHeader title="Modal" {...props} />,
      }}>
      {rootRoutes.map(route => {
        return (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{
              title: route.displayName,
              ...route.options,
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default RootNavigation;
