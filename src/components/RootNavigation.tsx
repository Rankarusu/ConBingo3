/* eslint-disable react/no-unstable-nested-components */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {rootRoutes} from '../routes';
import ModalHeader from './ModalHeader';
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
            options={{
              title: route.displayName,
              header: ({navigation}) => (
                <ModalHeader
                  title={route.displayName || ''}
                  navigation={navigation}
                />
              ),
              ...route.options,
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
}
