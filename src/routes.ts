import {DrawerScreenProps} from '@react-navigation/drawer';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import {DrawerNavigation} from './components/DrawerNavigation';
import About from './pages/About';
import EditFields from './pages/EditFields';
import Modal from './pages/Modal';
import Play from './pages/Play';
import SavedSheets from './pages/SavedSheets';
import React from 'react';

export type DrawerRouteParamList = {
  Play: undefined;
  EditFields: undefined;
  SavedSheets: undefined;
  About: undefined;
};

export type DrawerRouteScreenProps<T extends keyof DrawerRouteParamList> =
  DrawerScreenProps<DrawerRouteParamList, T>;

export interface DrawerRoute {
  name: string;
  displayName: string;
  icon: string;
  component: React.FC<DrawerRouteScreenProps<any>>;
}

export const drawerRoutes: DrawerRoute[] = [
  {
    name: 'Play',
    displayName: 'Play',
    icon: 'play',
    component: Play,
  },
  {
    name: 'EditFields',
    displayName: 'Edit Fields',
    icon: 'playlist-edit',
    component: EditFields,
  },
  {
    name: 'SavedSheets',
    displayName: 'Saved Sheets',
    icon: 'file-multiple',
    component: SavedSheets,
  },
  {
    name: 'About',
    displayName: 'About',
    icon: 'information',
    component: About,
  },
];

export type StackRouteParamList = {
  App: undefined;
  AddModal: undefined;
  EditModal: {
    id: number;
  };
};

export type StackRouteScreenProps<T extends keyof StackRouteParamList> =
  StackScreenProps<StackRouteParamList, T>;

export interface StackRoute {
  name: string;
  displayName?: string;
  component: React.FC<StackRouteScreenProps<any>>;
  options?: StackNavigationOptions;
}

export const rootRoutes: StackRoute[] = [
  {
    name: 'App',
    component: DrawerNavigation,
    options: {headerShown: false},
  },
  {
    name: 'EditModal',
    displayName: 'Edit Field',
    component: Modal,
    options: {
      presentation: 'modal',
      headerMode: 'screen',
    },
  },
  {
    name: 'AddModal',
    displayName: 'Add Field',
    component: Modal,
    options: {
      presentation: 'modal',
      headerMode: 'screen',
    },
  },
];
