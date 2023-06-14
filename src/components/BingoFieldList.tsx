import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import {useSnackbar} from '../context/SnackbarContext';
import {useAppDispatch} from '../hooks';
import {useModal} from '../hooks/useModal';
import {BingoField} from '../models/bingoField';
import {AppScreenProps} from '../navigation/types';
import {removeField} from '../stores/fieldsSlice';
import BingoFieldListItem, {
  BingoFieldListItemProps,
} from './BingoFieldListItem';

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

  const shouldHide = (text: string) => {
    return !text.toLowerCase().includes(props.searchQuery.toLowerCase());
  };

  const deleteField = (id: number) => {
    dispatch(removeField(id));
    showSnackbar('Field deleted!', true);
  };

  return (
    <>
      <FlatList
        data={props.fields}
        ListFooterComponent={
          <Text style={styles.text} variant="labelMedium">
            {props.fields.length} fields
          </Text>
        }
        ListFooterComponentStyle={styles.footer}
        renderItem={({item}) => {
          return (
            <MemoizedBingoFieldListItem
              style={shouldHide(item.text) ? styles.hide : {}}
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
    paddingVertical: 35,
  },
  text: {
    textAlign: 'center',
  },
});

export default BingoFieldList;
