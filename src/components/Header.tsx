import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';
import React from 'react';
import {Appbar} from 'react-native-paper';

interface HeaderProps {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
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
      <Appbar.Content title={props.title} />
    </Appbar.Header>
  );
}
