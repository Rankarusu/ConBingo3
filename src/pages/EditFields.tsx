/* eslint-disable react/no-unstable-nested-components */
import React, {memo, useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, FAB, Searchbar} from 'react-native-paper';
import BingoFieldList from '../components/BingoFieldList';
import DrawerNavigationHeader, {
  DrawerNavigationHeaderProps,
} from '../components/DrawerNavigationHeader';
import {useAlert} from '../context/AlertContext';
import {useSnackbar} from '../context/SnackbarContext';
import {useAppDispatch} from '../hooks';
import {useModal} from '../hooks/useModal';
import {AppScreenProps} from '../navigation/types';
import {resetFields, useFields} from '../stores/fieldsSlice';

type MemoizedHeaderProps = DrawerNavigationHeaderProps & {
  resetFields: () => void;
};

const MemoizedHeader = memo((props: MemoizedHeaderProps) => {
  return (
    <DrawerNavigationHeader
      {...props}
      right={<Appbar.Action icon="bomb" onPress={props.resetFields} />}
    />
  );
});

const EditFields: React.FC<AppScreenProps<'EditFields'>> = props => {
  const dispatch = useAppDispatch();
  const {sortedFields} = useFields();
  const {openAddModal} = useModal();
  const {showAlert} = useAlert();
  const {showSnackbar} = useSnackbar();

  const [searchQuery, setSearchQuery] = React.useState('');

  // add our reset button to the header
  const confirmAndReset = useCallback(() => {
    showAlert(
      'Reset Fields',
      'This will delete all your added and edited fields. Are you sure?',
      // this looks funny. SetState tries to invoke another overload if it receives a function, therefore this is necessary
      () => () => {
        dispatch(resetFields());
        showSnackbar('Fields have been reset.', true);
      },
    );
  }, [dispatch, showAlert, showSnackbar]);

  useEffect(() => {
    props.navigation.setOptions({
      header: headerProps => (
        <MemoizedHeader
          {...(headerProps as DrawerNavigationHeaderProps)}
          title={'Edit Fields'}
          resetFields={confirmAndReset}
        />
      ),
    });
  }, [props.navigation, confirmAndReset]);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        elevation={1}
        style={styles.searchBar}
      />
      <BingoFieldList
        fields={sortedFields}
        searchQuery={searchQuery}
        navigation={props.navigation}
      />
      <FAB icon="plus" style={styles.fab} onPress={openAddModal} />
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default EditFields;
