import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export interface AppRoute {
  name: string;
  displayName: string;
  icon: string;
}

export const INITIAL_ROUTE = 'play';

export const appRoutes: AppRoute[] = [
  {
    name: 'play',
    displayName: 'Play',
    icon: 'play',
  },
  {
    name: 'edit-fields',
    displayName: 'Edit Fields',
    icon: 'playlist-edit',
  },
  {
    name: 'saved-sheets',
    displayName: 'Saved Sheets',
    icon: 'file-multiple',
  },
  {
    name: 'about',
    displayName: 'About',
    icon: 'information',
  },
];

export const hiddenRoutes: AppRoute[] = [
  {
    name: 'logs',
    displayName: 'Logs',
    icon: 'text-long',
  },
];

export interface RootRoute {
  name: string;
  options?: NativeStackNavigationOptions;
}

export const rootRoutes: RootRoute[] = [
  {
    name: '(game)',
    options: { headerShown: false },
  },
  {
    name: 'modal',

    options: {
      presentation: 'modal',
      animation: 'slide_from_bottom',
    },
  },
];
