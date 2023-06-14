import {DrawerNavigation} from './components/DrawerNavigation';
import About from './pages/About';
import AddModal from './pages/AddModal';
import EditFields from './pages/EditFields';
import EditModal from './pages/EditModal';
import Play from './pages/Play';
import SavedSheets from './pages/SavedSheets';

export interface DrawerRoute {
  name: string;
  displayName: string;
  icon: string;
  component: () => JSX.Element;
}

export const drawerRoutes: DrawerRoute[] = [
  {
    name: 'play',
    displayName: 'Play',
    icon: 'play',
    component: Play,
  },
  {
    name: 'edit-fields',
    displayName: 'Edit Fields',
    icon: 'playlist-edit',
    component: EditFields,
  },
  {
    name: 'saved-sheets',
    displayName: 'Saved Sheets',
    icon: 'file-multiple',
    component: SavedSheets,
  },
  {
    name: 'about',
    displayName: 'About',
    icon: 'information',
    component: About,
  },
];

export interface StackRoute {
  name: string;
  displayName?: string;
  component: () => JSX.Element;
  options?: Object;
}

export const rootRoutes: StackRoute[] = [
  {
    name: 'App',
    component: DrawerNavigation,
    options: {headerShown: false},
  },
  {
    name: 'edit-modal',
    displayName: 'Edit Field',
    component: EditModal,
    options: {
      presentation: 'modal',
      headerMode: 'screen',
    },
  },
  {
    name: 'add-modal',
    displayName: 'Add Field',
    component: AddModal,
    options: {
      presentation: 'modal',
      headerMode: 'screen',
    },
  },
];
