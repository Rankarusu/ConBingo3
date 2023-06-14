import React, {memo} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {BingoField} from '../models/bingoField';
import {StackRouteParamList} from '../routes';
import BingoFieldListItem, {
  BingoFieldListItemProps,
} from './BingoFieldListItem';
import {useAppDispatch} from '../hooks';
import {removeField} from '../stores/fieldsSlice';
import {useSnackbar} from '../hooks/useSnackbar';
import Snackbar from './Snackbar';

//we memoize list components so they wont rerender unless their props change.
const MemoizedBingoFieldListItem = memo((props: BingoFieldListItemProps) => (
  <BingoFieldListItem {...props} />
));

interface BingoFieldListProps {
  fields: BingoField[];
  searchQuery: string;
  navigation: StackNavigationProp<StackRouteParamList>;
}

const BingoFieldList: React.FC<BingoFieldListProps> = props => {
  const dispatch = useAppDispatch();
  const [snackbarRef, showSnackbar] = useSnackbar();

  const queryContains = (text: string) => {
    if (text.toLowerCase().includes(props.searchQuery.toLowerCase())) {
      return {};
    }
    return styles.hide;
  };
  const editField = (id: number) => {
    props.navigation.navigate('EditModal', {id: id});
  };

  const deleteField = (id: number) => {
    dispatch(removeField(id));
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
            <MemoizedBingoFieldListItem
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
