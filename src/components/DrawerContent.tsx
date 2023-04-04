import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {Drawer, Switch, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../hooks';
import {INITIAL_ROUTE, appRoutes} from '../navigation/routes';
import {selectTheme, toggle} from '../stores/themeSlice';
import {useFocusEffect} from '@react-navigation/native';

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const [active, setActive] = useState(INITIAL_ROUTE);
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  // Set our drawer state when a user uses their hardware back button
  // https://reactnavigation.org/docs/custom-android-back-button-handling
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        /*
        since we configured our drawer nav so it goes back to the initial route on a hardware
        back button press, we can use that here.
        */
        if (active !== INITIAL_ROUTE) {
          setActive(INITIAL_ROUTE);
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [active]),
  );

  return (
    <DrawerContentScrollView {...props}>
      <Text style={style.title} variant="titleLarge">
        Convention Bingo
      </Text>
      <Drawer.Section>
        {appRoutes.map(route => {
          return (
            <Drawer.Item
              key={route.name}
              icon={route.icon}
              label={route.displayName}
              active={active === route.name}
              onPress={() => {
                props.navigation.navigate(route.name);
                setActive(route.name);
              }}
            />
          );
        })}
      </Drawer.Section>
      <Drawer.Section title="Preferences">
        <View style={style.toggleBox}>
          <Text variant="bodyMedium">Dark Theme</Text>
          <Switch
            value={theme === 'dark' ? true : false}
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
  toggleBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
});

export default DrawerContent;
