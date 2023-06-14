import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useAppDispatch} from '../hooks';
import {BingoField} from '../models/bingoField';
import {removeField} from '../stores/fieldsSlice';
import BingoFieldListItem, {
  BingoFieldListItemProps,
} from './BingoFieldListItem';
import {AppScreenProps} from '../navigation/types';
import {useModal} from '../hooks/useModal';
import {useSnackbar} from '../context/SnackbarContext';

//we memoize list components so they wont rerender unless their props change.
const MemoizedBingoFieldListItem = memo((props: BingoFieldListItemProps) => (
  <BingoFieldListItem {...props} />
));

interface BingoFieldListProps {
  fields: BingoField[];
  searchQuery: string;
  navigation: AppScreenProps<'EditFields'>['navigation'];
}

const BingoFieldList: React.FC<BingoFieldListProps> = props => {
  const dispatch = useAppDispatch();
  const {openEditModal} = useModal();
  const {showSnackbar} = useSnackbar();

  const queryContains = (text: string) => {
    if (text.toLowerCase().includes(props.searchQuery.toLowerCase())) {
      return {};
    }
    return styles.hide;
  };

  const deleteField = (id: number) => {
    dispatch(removeField(id));
    showSnackbar('Field deleted!', true);
  };

  return (
    <>
      <FlatList
        data={props.fields}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={styles.footer}
        renderItem={({item}) => {
          return (
            <MemoizedBingoFieldListItem
              style={queryContains(item.text)}
              {...item}
              edit={() => openEditModal(item.id)}
              delete={() => deleteField(item.id)}
            />
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
  footer: {
    paddingTop: 100,
  },
});

export default BingoFieldList;
