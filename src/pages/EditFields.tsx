import React from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import BingoFieldList from '../components/BingoFieldList';

const EditFields = () => {
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
      <BingoFieldList searchQuery={searchQuery} />
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 0,
    marginTop: -1,
  },
});

export default EditFields;
