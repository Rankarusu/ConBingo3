import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import { Button, Dialog, Portal, Text } from 'react-native-paper';

export interface AlertOptions {
  title: string;
  content: string;
  confirmText?: string;
  confirmAction?: () => void;
  cancelText?: string;
  cancelAction?: () => void;
}

interface AlertContextActions {
  showAlert: (showAlertAttributes: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextActions>(
  {} as AlertContextActions,
);

export const AlertProvider: React.FC<PropsWithChildren> = (props) => {
  const [open, setOpen] = useState(false);

  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    title: '',
    content: '',
  });

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertOptions(options);
    setOpen(true);
  }, []);

  const handleConfirm = () => {
    if (alertOptions.confirmAction) {
      alertOptions.confirmAction();
    }
    setOpen(false);
  };

  const handleCancel = () => {
    if (alertOptions.cancelAction) {
      alertOptions.cancelAction();
    }
    setOpen(false);
  };

  const handleDismiss = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {props.children}
      <Portal>
        <Dialog visible={open} onDismiss={handleDismiss}>
          <Dialog.Title>{alertOptions.title}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{alertOptions.content}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirm}>
              {alertOptions.confirmText || 'OK'}
            </Button>
            <Button onPress={handleCancel}>
              {alertOptions.cancelText || 'Cancel'}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextActions => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert must be called within its Provider');
  }
  return context;
};
