import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

export type RootNavigationHeaderProps = NativeStackHeaderProps & {
  title: string;
  right?: JSX.Element;
};

const RootNavigationHeader: React.FC<RootNavigationHeaderProps> = props => {
  return (
    <Appbar.Header elevated>
      <Appbar.Action
        icon={'close'}
        onPress={() => {
          props.navigation.goBack();
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

export default RootNavigationHeader;
