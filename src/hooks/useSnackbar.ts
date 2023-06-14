import {createRef, RefObject} from 'react';
import Snackbar from '../components/Snackbar';

export function useSnackbar(): [
  RefObject<Snackbar>,
  (message: string) => void,
] {
  const snackbarRef = createRef<Snackbar>();
  const showSnackbar = (message: string) => {
    snackbarRef.current?.show(message);
  };
  return [snackbarRef, showSnackbar];
}
