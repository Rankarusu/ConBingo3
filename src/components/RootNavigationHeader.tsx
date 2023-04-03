import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

export type RootNavigationHeaderProps = StackHeaderProps & {
  title: string;
  right?: JSX.Element;
};

const RootNavigationHeader: React.FC<RootNavigationHeaderProps> = props => {
  // const title = getHeaderTitle(props.options, props.route.name);
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
