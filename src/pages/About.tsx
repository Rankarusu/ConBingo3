import React from 'react';
import {Linking, StyleSheet} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {version} from '../../package.json';
import {AppScreenProps} from '../navigation/types';

const url = 'https://github.com/Rankarusu/ConBingo3';

const About: React.FC<AppScreenProps<'About'>> = () => {
  return (
    <Card onPress={() => {}} style={styles.card}>
      <Card.Title
        title="About this App"
        titleVariant="headlineSmall"
        subtitle={`Version: ${version}`}
      />
      <Card.Content>
        <Text variant="bodyMedium">
          Hi there!
          {'\n\n'}
          My name is Ranka and I'm a developer apprentice. Because me and my
          friends always play some kind of bullshit bingo at conventions I
          wanted to digitalize that process by creating some kind of app for it.
          {'\n'}
          This is already the third iteration of this application. While the
          first one used only vanilla JS and SCSS, I tried to build this with
          Vue and Ionic, but I was very disappointed by the performance. So here
          we go again. This time in React Native.
          {'\n\n'}
          Should you have an idea to improve this app or come across any bugs,
          please let me know on the GitHub page below. Thanks for downloading!
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          icon="github"
          mode="outlined"
          onPress={() => Linking.openURL(url)}>
          Github
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
  },
});

/*
          ████████
        ██        ██
      ██▒▒▒▒        ██
    ██▒▒▒▒▒▒      ▒▒▒▒██
    ██▒▒▒▒▒▒      ▒▒▒▒██
  ██  ▒▒▒▒        ▒▒▒▒▒▒██
  ██                ▒▒▒▒██
██▒▒      ▒▒▒▒▒▒          ██
██      ▒▒▒▒▒▒▒▒▒▒        ██
██      ▒▒▒▒▒▒▒▒▒▒    ▒▒▒▒██
██▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒██
  ██▒▒▒▒  ▒▒▒▒▒▒    ▒▒▒▒██
  ██▒▒▒▒            ▒▒▒▒██
    ██▒▒              ██
      ████        ████
          ████████

Congrats on finding the easter egg!
*/

export default About;
