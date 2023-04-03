import {DrawerHeaderProps} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

type DrawerNavigationHeaderProps = DrawerHeaderProps & {
  title: string;
};
const DrawerNavigationHeader: React.FC<DrawerNavigationHeaderProps> = props => {
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
};

const styles = StyleSheet.create({
  title: {
    paddingStart: 5,
  },
});

export default DrawerNavigationHeader;
