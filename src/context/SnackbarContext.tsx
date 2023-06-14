import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import {Snackbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const DURATION = 3000;

type SnackBarContextActions = {
  showSnackbar: (text: string, aboveFab?: boolean) => void;
};

const SnackbarContext = createContext<SnackBarContextActions>(
  {} as SnackBarContextActions,
);

export const SnackbarProvider: React.FC<PropsWithChildren> = props => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [placeAboveFab, setPlaceAboveFab] = useState(false);
  // I intended to have separate colors for errors, but react native paper does not really allow than
  // const [typeColor, setTypeColor] = useState<SnackbarColor>('info');

  const showSnackbar = (text: string, aboveFab: boolean = false) => {
    setMessage(text);
    setPlaceAboveFab(aboveFab);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      {props.children}
      <Snackbar
        wrapperStyle={placeAboveFab ? styles.aboveFab : styles.wrapper}
        duration={DURATION}
        visible={open}
        onDismiss={handleClose}
        action={{
          label: 'Dismiss',
        }}>
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackBarContextActions => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be called within its Provider');
  }
  return context;
};

const styles = StyleSheet.create({
  wrapper: {
    bottom: 50,
  },
  aboveFab: {
    bottom: 80,
  },
});
