import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';
import React from 'react';
import {Appbar, Switch} from 'react-native-paper';
import {PreferencesContext} from '../context';

interface HeaderProps {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  return (
    <Appbar.Header elevated>
      <Appbar.Action
        icon="menu"
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
      <Appbar.Content title={props.title} />
      <Switch value={isThemeDark} onValueChange={toggleTheme} />
    </Appbar.Header>
  );
}
