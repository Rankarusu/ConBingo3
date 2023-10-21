import React from 'react';

import { StyleSheet, View } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

const LoadingScreen = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
