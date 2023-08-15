import {Drawer} from 'expo-router/drawer';
import DrawerNavigationHeader from '@/components/DrawerNavigationHeader';
import DrawerContent from '@/components/DrawerContent';
import {INITIAL_ROUTE, appRoutes, hiddenRoutes} from '@/navigation/routes';

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer
      initialRouteName={INITIAL_ROUTE}
      backBehavior="initialRoute"
      drawerContent={props => <DrawerContent {...props} />}>
      {[...appRoutes, ...hiddenRoutes].map(route => {
        return (
          <Drawer.Screen
            key={route.name}
            name={route.name}
            options={{
              title: route.displayName,
              header: props => (
                <DrawerNavigationHeader {...props} title={route.displayName} />
              ),
            }}
          />
        );
      })}
    </Drawer>
  );
};

export default DrawerNavigation;
