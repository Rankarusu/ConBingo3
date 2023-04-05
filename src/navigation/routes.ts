import {StackNavigationOptions} from '@react-navigation/stack';
import React from 'react';
import DrawerNavigation from '../components/DrawerNavigation';
import About from '../pages/About';
import EditFields from '../pages/EditFields';
import Modal from '../pages/Modal';
import Play from '../pages/Play';
import SavedSheets from '../pages/SavedSheets';

export interface AppRoute {
  name: string;
  displayName: string;
  icon: string;
  component: React.FC<any>;
}

export const INITIAL_ROUTE = 'Play';

export const appRoutes: AppRoute[] = [
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

export interface RootRoute {
  name: string;
  displayName?: string;
  component: React.FC<any>;
  options?: StackNavigationOptions;
}

export const rootRoutes: RootRoute[] = [
  {
    name: 'App',
    component: DrawerNavigation,
    options: {headerShown: false},
  },
  {
    name: 'Modal',
    component: Modal,
    options: {
      presentation: 'modal',
      headerMode: 'screen',
    },
  },
];
