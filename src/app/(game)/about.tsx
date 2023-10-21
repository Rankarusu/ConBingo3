import ThemeAwareLogo from '@/components/ThemeAwareLogo';
import {AppScreenProps} from '@/navigation/types';
import Constants from 'expo-constants';
import {useRouter} from 'expo-router';
import React from 'react';
import {Linking, Platform, StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';

const {version} = Constants.expoConfig ?? {};
const {playstoreUrl, githubUrl, webUrl} = Constants.expoConfig?.extra ?? {};

const About: React.FC<AppScreenProps<'about'>> = () => {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <Card onPress={() => {}} style={styles.card}>
        <Card.Title
          right={() => <ThemeAwareLogo height={48} width={48} />}
          rightStyle={styles.logo}
          title="About this App"
          titleVariant="headlineSmall"
          subtitle={`Version: ${version}`}
        />
        <Card.Content style={styles.cardContent}>
          <Text variant="bodyMedium">
            Hi there!
            {'\n\n'}
            My name is Ranka and I'm a developer apprentice at the time of
            writing this. Because me and my friends always play some kind of
            bullshit bingo at conventions I wanted to digitize that process by
            creating some kind of app for it.
            {'\n'}
            This is already the third iteration of this application is going
            through. While the first one used only vanilla JS and SCSS, I tried
            to build this with Vue and Ionic, but I was very disappointed by the
            performance. So here we go again. This time in React Native.
            {'\n\n'}
            Should you have an idea to improve this app or come across any bugs,
            please let me know on the GitHub page below. Thanks for downloading!
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            icon="web"
            mode="outlined"
            onPress={() => Linking.openURL(webUrl)}>
            Web
          </Button>
          <Button
            icon="google-play"
            mode="outlined"
            onPress={() => Linking.openURL(playstoreUrl)}>
            Google Play
          </Button>
          <Button
            icon="github"
            mode="outlined"
            onPress={() => Linking.openURL(githubUrl)}>
            Github
          </Button>
        </Card.Actions>
      </Card>
      {Platform.OS !== 'web' && (
        //we don't have access to the file system in the web, therefore logs are irrelevant
        <Button
          icon="text-long"
          mode="contained-tonal"
          onPress={() => {
            router.push('/(game)/logs');
          }}>
          Show Logs
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    maxWidth: 776,
    marginHorizontal: 'auto',
    padding: 5,
  },
  card: {
    marginVertical: 25,
  },
  cardContent: {
    paddingVertical: 10,
  },
  logo: {
    paddingRight: 10,
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
