import React from 'react';

import { StyleSheet } from 'react-native';

import { DrawerHeaderProps } from '@react-navigation/drawer';
import { Appbar } from 'react-native-paper';

export type DrawerNavigationHeaderProps = DrawerHeaderProps & {
  title: string;
  right?: JSX.Element;
};

const DrawerNavigationHeader: React.FC<DrawerNavigationHeaderProps> = (
  props,
) => {
  return (
    <Appbar.Header elevated>
      <Appbar.Action
        icon="menu"
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
      <Appbar.Content title={props.title} style={styles.title} />
      {props.right}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingStart: 5,
  },
});

export default DrawerNavigationHeader;
