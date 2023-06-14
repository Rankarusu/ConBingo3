import React from 'react';
import {useErrorBoundary} from 'react-error-boundary';
import {Image, Linking, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

const ISSUE_URL = 'https://github.com/Rankarusu/ConBingo3/issues/new/choose';

const ErrorScreen = () => {
  const {resetBoundary} = useErrorBoundary();
  return (
    <View style={styles.center}>
      <Image source={require('../../assets/astolfo-plushy.gif')} />
      <Text variant="headlineLarge">Oh no, you broke it!</Text>
      <Text variant="labelMedium">
        Please check the logs to see what is going on (About {'>'} Show logs)
      </Text>
      <Text variant="labelMedium" style={styles.spacer}>
        Consider opening an issue on GitHub so the error gets fixed
      </Text>
      <View style={styles.buttonBox}>
        <Button
          mode="outlined"
          compact
          icon="arrow-left"
          onPress={resetBoundary}>
          Go Back
        </Button>
        <Button
          mode="outlined"
          compact
          icon="github"
          onPress={() => Linking.openURL(ISSUE_URL)}>
          Open Issue
        </Button>
      </View>
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
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    gap: 5,
  },
  spacer: {
    marginVertical: 20,
  },
});

export default ErrorScreen;
