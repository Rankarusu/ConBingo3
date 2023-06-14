import React, {memo} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {BingoField} from '../models/bingoField';
import {StackRouteParameters} from '../routes';
import BingoFieldListItem, {
  BingoFieldListItemProps,
} from './BingoFieldListItem';
import {useAppDispatch} from '../hooks';
import {remove} from '../stores/fieldsSlice';
import {useSnackbar} from '../hooks/useSnackbar';
import Snackbar from './Snackbar';

//we memoize list components so they wont rerender unless their props change.
const Item = memo((props: BingoFieldListItemProps) => (
  <BingoFieldListItem {...props} />
));

interface BingoFieldListProps {
  fields: BingoField[];
  searchQuery: string;
  navigation: StackNavigationProp<StackRouteParameters>;
}

const BingoFieldList = (props: BingoFieldListProps) => {
  const dispatch = useAppDispatch();
  const {snackbarRef, showSnackbar} = useSnackbar();

  const queryContains = (text: string) => {
    if (text.toLowerCase().includes(props.searchQuery.toLowerCase())) {
      return {};
    }
    return styles.hide;
  };
  const editField = (id: number) => {
    props.navigation.navigate('editModal', {id: id});
  };

  const deleteField = (id: number) => {
    dispatch(remove(id));
    showSnackbar('Field deleted!');
  };

  return (
    <>
      <FlatList
        data={props.fields}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={styles.footer}
        renderItem={({item}) => {
          return (
            <Item
              style={queryContains(item.text)}
              {...item}
              edit={() => editField(item.id)}
              delete={() => deleteField(item.id)}
            />
          );
        }}
      />
      <Snackbar ref={snackbarRef} style={styles.snackbar} />
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
  snackbar: {
    bottom: 80,
  },
});

export default BingoFieldList;
