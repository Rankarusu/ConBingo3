import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, Button} from 'react-native-paper';
import {StackRouteParameters} from '../routes';

interface HeaderProps {
  navigation: StackNavigationProp<StackRouteParameters>;
  title: string;
}

export default function ModalHeader(props: HeaderProps) {
  return (
    <Appbar.Header elevated>
      <Appbar.Action
        icon={'close'}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <Appbar.Content title={props.title} style={styles.title} />
      <Button onPress={() => {}}>Save</Button>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingStart: 5,
  },
});
