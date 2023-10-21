import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import { useKeyboard } from '@react-native-community/hooks';
import { Snackbar } from 'react-native-paper';

const DURATION = 3000;

type SnackBarContextActions = {
  showSnackbar: (text: string, aboveFab?: boolean) => void;
};

const SnackbarContext = createContext<SnackBarContextActions>(
  {} as SnackBarContextActions,
);

export const SnackbarProvider: React.FC<PropsWithChildren> = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [placeAboveFab, setPlaceAboveFab] = useState(false);
  const keyboard = useKeyboard();

  const getBottomPosition = () => {
    if (keyboard.keyboardShown) {
      return keyboard.keyboardHeight;
    } else if (placeAboveFab) {
      return 80;
    }
    return 50;
  };
  // I intended to have separate colors for errors, but react native paper does not really allow that
  // const [typeColor, setTypeColor] = useState<SnackbarColor>('info');

  const showSnackbar = useCallback(
    (text: string, aboveFab: boolean = false) => {
      setMessage(text);
      setPlaceAboveFab(aboveFab);
      setOpen(true);
    },
    [],
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {props.children}
      <Snackbar
        wrapperStyle={[{ bottom: getBottomPosition() }]}
        duration={DURATION}
        visible={open}
        onDismiss={handleClose}
        action={{
          label: 'Dismiss',
        }}
      >
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
