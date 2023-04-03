import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type RootRouteParamList = {
  App: NavigatorScreenParams<AppRouteParamList>;
  Modal: {
    id?: number;
    position?: number;
  };
};

export type AppRouteParamList = {
  Play: undefined;
  EditFields: undefined;
  SavedSheets: undefined;
  About: undefined;
};

//this is singular! you can use it to type a navigation that you passed to a child via prop
export type NavigationScreenProp = CompositeNavigationProp<
  StackNavigationProp<RootRouteParamList>,
  DrawerNavigationProp<AppRouteParamList>
>;

export type NavigationScreenProps = CompositeScreenProps<
  StackScreenProps<RootRouteParamList>,
  DrawerScreenProps<AppRouteParamList>
>;

export type RootScreenProps<T extends keyof RootRouteParamList> =
  StackScreenProps<RootRouteParamList, T>;

export type AppScreenProps<T extends keyof AppRouteParamList> =
  CompositeScreenProps<
    DrawerScreenProps<AppRouteParamList, T>,
    RootScreenProps<keyof RootRouteParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootRouteParamList {}
  }
}
