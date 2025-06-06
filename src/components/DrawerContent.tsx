import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Drawer, Switch, Text } from 'react-native-paper';

import { useAppDispatch } from '@/hooks';
import { appRoutes } from '@/navigation/routes';
import { toggle, useAppTheme } from '@/stores/themeSlice';

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  const theme = useAppTheme();

  const getCurrentRouteName = () => {
    const { routeNames, index } = props.navigation.getState();
    return routeNames[index];
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={style.titleBox}>
        <Image
          contentFit="contain"
          style={style.image}
          source={require('@assets/logo_full_round_no_border.png')}
        />
        <Text style={style.title} variant="titleLarge">
          Convention Bingo
        </Text>
      </View>
      <Drawer.Section>
        {appRoutes.map((route) => {
          return (
            <Drawer.Item
              key={route.name}
              icon={route.icon}
              label={route.displayName}
              active={route.name === getCurrentRouteName()}
              onPress={() => {
                props.navigation.navigate(route.name);
              }}
            />
          );
        })}
      </Drawer.Section>
      <Drawer.Section title="Preferences">
        <View style={style.toggleBox}>
          <Text variant="bodyMedium">Dark Theme</Text>
          <Switch
            value={!!theme.dark}
            onValueChange={() => {
              dispatch(toggle());
            }}
          />
        </View>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

const style = StyleSheet.create({
  title: {
    paddingVertical: 20,
    textAlign: 'center',
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    gap: 15,
    marginVertical: 15,
  },
  toggleBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  image: {
    height: 40,
    width: 40,
  },
});

export default DrawerContent;
