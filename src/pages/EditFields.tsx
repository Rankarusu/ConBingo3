import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Searchbar} from 'react-native-paper';
import BingoFieldList from '../components/BingoFieldList';
import {AppScreenProps} from '../navigation/types';
import {useFields} from '../stores/fieldsSlice';
import {useModal} from '../hooks/useModal';

const EditFields: React.FC<AppScreenProps<'EditFields'>> = props => {
  const {sortedFields} = useFields();
  const {openAddModal} = useModal();

  const [searchQuery, setSearchQuery] = React.useState('');

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
