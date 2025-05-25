import React from 'react';

import { StyleSheet } from 'react-native';

import { useNavigation } from 'expo-router';
import { Appbar } from 'react-native-paper';

export type RootNavigationHeaderProps = {
  title: string;
  right?: JSX.Element;
};

const RootNavigationHeader: React.FC<RootNavigationHeaderProps> = (props) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header elevated>
      <Appbar.Action
        icon={'close'}
        onPress={() => {
          navigation.goBack();
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
