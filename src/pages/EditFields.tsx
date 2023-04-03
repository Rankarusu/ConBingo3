import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB, Searchbar} from 'react-native-paper';
import BingoFieldList from '../components/BingoFieldList';
import {DrawerRouteScreenProps, StackRouteParamList} from '../routes';
import {useFields} from '../stores/fieldsSlice';

const EditFields: React.FC<DrawerRouteScreenProps<'EditFields'>> = () => {
  const {sortedFields} = useFields();

  const [searchQuery, setSearchQuery] = React.useState('');
  const navigation = useNavigation<StackNavigationProp<StackRouteParamList>>();

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const addField = () => {
    navigation.navigate('AddModal');
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
        navigation={navigation}
      />
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
