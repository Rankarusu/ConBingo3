import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Drawer, Switch, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../hooks';
import {appRoutes} from '../navigation/routes';
import {selectTheme, toggle} from '../stores/themeSlice';

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const [active, setActive] = useState('Play');
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

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
