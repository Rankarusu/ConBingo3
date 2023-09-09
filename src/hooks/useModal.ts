import {useNavigation} from 'expo-router';
import {ModalMode} from '@/app/modal';
import {Logger} from '@/utils/logger';

export function useModal() {
  const navigation = useNavigation();

  const methods = {
    openAddModal: () => {
      Logger.debug('opening Add Modal');
      navigation.navigate('modal', {mode: ModalMode.ADD});
    },

    openEditModal: (id: number) => {
      Logger.debug('opening Edit Modal');

      navigation.navigate('modal', {
        mode: ModalMode.EDIT,
        id,
      });
    },

    openEditCurrentSheetModal: (position: number) => {
      Logger.debug('opening Edit Current Sheet Modal');

      navigation.navigate('modal', {
        mode: ModalMode.EDIT_CURRENT_SHEET,
        position,
      });
    },
  };
  return methods;
}
