import {createRef} from 'react';
import Snackbar from '../components/Snackbar';

export function useSnackbar() {
  const snackbarRef = createRef<Snackbar>();
  const showSnackbar = (message: string) => {
    snackbarRef.current?.show(message);
  };
  return {snackbarRef, showSnackbar};
}
