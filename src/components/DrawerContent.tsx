import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Drawer, Switch, Text} from 'react-native-paper';
import {saveTheme} from '../hooks/useAppTheme';
import {ThemeContext} from '../ThemeContext';
import {drawerRoutes} from '../routes';
export default function DrawerContent(props: DrawerContentComponentProps) {
  const [active, setActive] = React.useState('play');
  const {isThemeDark, toggleTheme} = useContext(ThemeContext);
  return (
    <DrawerContentScrollView {...props}>
      <Text style={style.title} variant="titleLarge">
        Convention Bingo
      </Text>
      <Drawer.Section>
        {drawerRoutes.map(route => {
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
            value={isThemeDark}
            onValueChange={async (value: boolean) => {
              toggleTheme();
              await saveTheme(value ? 'dark' : 'light');
            }}
          />
        </View>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

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
