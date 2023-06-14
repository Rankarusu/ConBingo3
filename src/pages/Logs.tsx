/* eslint-disable react/no-unstable-nested-components */
import React, {memo, useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import DrawerNavigationHeader, {
  DrawerNavigationHeaderProps,
} from '../components/DrawerNavigationHeader';
import {AppScreenProps} from '../navigation/types';
import {shareLog} from '../utils/io';
import {getConcatenatedLog} from '../utils/logger';

type MemoizedHeaderProps = DrawerNavigationHeaderProps & {
  share: () => Promise<void>;
};

const MemoizedHeader = memo((props: MemoizedHeaderProps) => {
  return (
    <DrawerNavigationHeader
      {...props}
      right={<Appbar.Action icon="share-variant" onPress={props.share} />}
    />
  );
});

const Logs: React.FC<AppScreenProps<'Logs'>> = props => {
  const [log, setLog] = useState('');

  useEffect(() => {
    getConcatenatedLog().then(text => setLog(text));
  });

  useEffect(() => {
    props.navigation.setOptions({
      header: headerProps => (
        <MemoizedHeader
          {...(headerProps as DrawerNavigationHeaderProps)}
          title={'Logs'}
          share={() => shareLog(log)}
        />
      ),
    });
  }, [props.navigation, log]);

  return (
    <ScrollView style={styles.wrapper}>
      <Text>{log}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 5,
  },
});

export default Logs;
