import React, { useState } from 'react';

import { Image, Linking, ScrollView, StyleSheet, View } from 'react-native';

import Constants from 'expo-constants';
import { Button, List, Text } from 'react-native-paper';

const { githubIssuesUrl } = Constants.expoConfig?.extra ?? {};

interface ErrorScreenProps {
  error: Error;
  retry?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Image source={require('@assets/astolfo-plushy.gif')} />
      <Text variant="headlineLarge" style={styles.centerText}>
        Oh no, you broke it!
      </Text>
      <Text
        variant="bodyMedium"
        style={[styles.spacer, styles.error]}
      >{`${props.error.name}: ${props.error.message}`}</Text>

      <List.Accordion
        title={expanded ? 'Hide Stacktrace' : 'Show Stacktrace'}
        expanded={expanded}
        onPress={handlePress}
      >
        <Text variant="bodyMedium" style={[styles.spacer, styles.error]}>
          {props.error.stack}
        </Text>
      </List.Accordion>

      <Text variant="labelMedium" style={[styles.spacer, styles.centerText]}>
        Consider opening an issue on GitHub so the error can be fixed
      </Text>
      <View style={styles.buttonBox}>
        {props.retry && (
          <Button
            mode="outlined"
            style={styles.button}
            icon="arrow-left"
            onPress={props.retry}
          >
            Go Back
          </Button>
        )}
        <Button
          mode="outlined"
          style={styles.button}
          icon="github"
          onPress={() => Linking.openURL(githubIssuesUrl)}
        >
          Open Issue
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 6,
    backgroundColor: 'rgba(255, 251, 254, 1)',
  },
  error: {
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 5,
  },
  spacer: {
    marginTop: 30,
  },
  button: {
    flex: 1,
  },
});

export default ErrorScreen;
