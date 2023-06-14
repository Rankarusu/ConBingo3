import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

type AlertContextActions = {
  showAlert: (
    title: string,
    content: string,
    confirmAction: () => void,
  ) => void;
};

const AlertContext = createContext<AlertContextActions>(
  {} as AlertContextActions,
);

export const AlertProvider: React.FC<PropsWithChildren> = props => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [confirmAction, setConfirmAction] = useState<() => void>();

  const showAlert = (
    titleInput: string,
    contentInput: string,
    confirmActionInput: () => void,
  ) => {
    setTitle(titleInput);
    setContent(contentInput);
    setConfirmAction(confirmActionInput);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{showAlert}}>
      {props.children}
      <Portal>
        <Dialog visible={open} onDismiss={handleClose}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{content}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirm}>OK</Button>
            <Button onPress={handleClose}>Cancel</Button>
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
