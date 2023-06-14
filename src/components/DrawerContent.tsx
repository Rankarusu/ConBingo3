/* eslint-disable react/no-unstable-nested-components */
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Drawer, Switch, Text, TouchableRipple} from 'react-native-paper';
import {routes} from '../routes';

export default function DrawerContent(props: DrawerContentComponentProps) {
  const [active, setActive] = React.useState('play');
  return (
    <DrawerContentScrollView {...props}>
      <Text style={style.title} variant="titleLarge">
        Convention Bingo
      </Text>
      <Drawer.Section>
        {routes.map(route => {
          return (
            <Drawer.Item
              key={route.name}
              icon={route.icon}
              label={route.displayName}
              active={active === route.name}
              onPress={() => {
                props.navigation.navigate(route.name);
                setActive(route.name);
              }}
            />
          );
        })}
      </Drawer.Section>
      <Drawer.Section title="Preferences">
        <TouchableRipple onPress={() => {}}>
          <View>
            <Text variant="bodyMedium">Dark Theme</Text>
            <View pointerEvents="none">
              <Switch value={false} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const style = StyleSheet.create({
  title: {
    paddingVertical: 20,
    textAlign: 'center',
  },
});
