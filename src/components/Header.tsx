import {DrawerNavigationProp} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {DrawerRouteParameters} from '../routes';

interface HeaderProps {
  navigation: DrawerNavigationProp<DrawerRouteParameters>;
  title: string;
}

export default function Header(props: HeaderProps) {
  return (
    <Appbar.Header elevated>
      <Appbar.Action
        icon="menu"
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
      <Appbar.Content title={props.title} style={styles.title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingStart: 5,
  },
});
