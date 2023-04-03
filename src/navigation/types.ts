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
import {ModalMode} from '../pages/Modal';

export type RootRouteParamList = {
  App: NavigatorScreenParams<AppRouteParamList>;
  Modal: editCurrentSheetPayload | editPayload | addPayload;
};

type editCurrentSheetPayload = {
  mode: ModalMode.EDIT_CURRENT_SHEET;
  position: number;
};
type editPayload = {
  mode: ModalMode.EDIT;
  id: number;
};
type addPayload = {
  mode: ModalMode.ADD;
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
