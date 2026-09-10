import React, { ReactNode } from 'react';

import { StyleSheet } from 'react-native';

import { DrawerHeaderProps } from 'expo-router/drawer';
import { Appbar } from 'react-native-paper';

export type DrawerNavigationHeaderProps = DrawerHeaderProps & {
  title: string;
  right?: ReactNode;
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
