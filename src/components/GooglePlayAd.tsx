import React from 'react';

import { ImageBackground, Linking, Pressable, StyleSheet } from 'react-native';

import Constants from 'expo-constants';

const { playstoreUrl } = Constants.expoConfig?.extra ?? {};

const GooglePlayAd = () => {
  return (
    <Pressable
      style={styles.image}
      onPress={() => Linking.openURL(playstoreUrl)}
    >
      <ImageBackground
        style={styles.image}
        alt="Get it on Google Play"
        source={{
          uri: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    aspectRatio: 2.6,
  },
});

export default GooglePlayAd;
