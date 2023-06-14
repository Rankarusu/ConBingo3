import {useNavigation} from '@react-navigation/native';
import {AppScreenProps} from '../navigation/types';
import {ModalMode} from '../pages/Modal';
import {Logger} from '../utils/logger';

export function useModal() {
  const navigation = useNavigation<AppScreenProps<'Play'>['navigation']>();

  const methods = {
    openAddModal: () => {
      Logger.debug('opening Add Modal');
      navigation.navigate('Modal', {mode: ModalMode.ADD});
    },

    openEditModal: (id: number) => {
      Logger.debug('opening Edit Modal');

      navigation.navigate('Modal', {
        mode: ModalMode.EDIT,
        id,
      });
    },

    openEditCurrentSheetModal: (position: number) => {
      Logger.debug('opening Edit Current Sheet Modal');

      navigation.navigate('Modal', {
        mode: ModalMode.EDIT_CURRENT_SHEET,
        position,
      });
    },
  };
  return methods;
}
