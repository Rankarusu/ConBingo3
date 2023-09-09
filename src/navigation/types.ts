import {ModalMode} from '@/app/modal';
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
  game: NavigatorScreenParams<AppRouteParamList>;
  modal: editCurrentSheetPayload | editPayload | addPayload;
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
  play: undefined;
  'edit-fields': undefined;
  'saved-sheets': undefined;
  about: undefined;
  logs: undefined;
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
