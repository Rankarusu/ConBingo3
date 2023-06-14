import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Searchbar, Text} from 'react-native-paper';
import BingoFieldList from '../components/BingoFieldList';

export const EditPage = () => {
  return <Text>bleh</Text>;
};

const EditFields = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<ParamListBase>;
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const addField = () => {
    navigation.navigate('add-modal');
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
      <BingoFieldList searchQuery={searchQuery} navigation={navigation} />
      <FAB icon="plus" style={styles.fab} onPress={addField} />
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
