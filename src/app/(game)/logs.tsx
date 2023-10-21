/* eslint-disable react/no-unstable-nested-components */
import React, { memo, useEffect, useState } from 'react';

import { Platform, ScrollView, StyleSheet } from 'react-native';

import { useNavigation } from 'expo-router';
import { Appbar, Text } from 'react-native-paper';

import DrawerNavigationHeader, {
  DrawerNavigationHeaderProps,
} from '@/components/DrawerNavigationHeader';
import { AppScreenProps } from '@/navigation/types';
import { share } from '@/utils/io';
import { getConcatenatedLog } from '@/utils/logger';

type MemoizedHeaderProps = DrawerNavigationHeaderProps & {
  disabled: boolean;
  share: () => Promise<void>;
};

const MemoizedHeader = memo((props: MemoizedHeaderProps) => {
  return (
    <DrawerNavigationHeader
      {...props}
      right={
        <Appbar.Action
          icon="share-variant"
          disabled={props.disabled}
          onPress={props.share}
        />
      }
    />
  );
});

const Logs: React.FC<AppScreenProps<'logs'>> = () => {
  const [log, setLog] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      getConcatenatedLog().then((text) => setLog(text));
    }
  });

  useEffect(() => {
    navigation.setOptions({
      header: (headerProps: DrawerNavigationHeaderProps) => (
        <MemoizedHeader
          {...headerProps}
          title={'Logs'}
          disabled={log.length < 1}
          share={() => share<string>(log, 'conbingo-log.txt')}
        />
      ),
    });
  }, [navigation, log]);

  return (
    <ScrollView style={styles.wrapper}>
      {log.length > 0 ? (
        <Text>{log}</Text>
      ) : (
        <Text style={styles.fallback}>No logs written yet</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 5,
  },
  fallback: {
    textAlign: 'center',
  },
});

export default Logs;
