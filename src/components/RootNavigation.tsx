import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {rootRoutes} from '../routes';
const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator>
      {rootRoutes.map(route => {
        return (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            //TODO: use paper header here as well
            options={{title: route.displayName, ...route.options}}
          />
        );
      })}
    </Stack.Navigator>
  );
}
