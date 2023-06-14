import About from './pages/About';
import EditFields from './pages/EditFields';
import Play from './pages/Play';
import SavedSheets from './pages/SavedSheets';

export interface Route {
  name: string;
  displayName: string;
  icon: string;
  component: () => JSX.Element;
}

export const routes: Route[] = [
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
