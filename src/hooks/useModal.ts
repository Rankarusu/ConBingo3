import {useNavigation} from '@react-navigation/native';
import {AppScreenProps} from '../navigation/types';
import {ModalMode} from '../pages/Modal';

export function useModal() {
  const navigation = useNavigation<AppScreenProps<'Play'>['navigation']>();

  const methods = {
    openAddModal: () => {
      navigation.navigate('Modal', {mode: ModalMode.ADD});
    },
    openEditModal: (id: number) => {
      navigation.navigate('Modal', {
        mode: ModalMode.EDIT,
        id,
      });
    },
    openEditCurrentSheetModal: (position: number) => {
      navigation.navigate('Modal', {
        mode: ModalMode.EDIT_CURRENT_SHEET,
        position,
      });
    },
  };
  return methods;
}
