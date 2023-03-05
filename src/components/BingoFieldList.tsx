import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FieldsRepository} from '../db';
import {BingoField} from '../models/bingoField';
import {StackRouteParameters} from '../routes';
import BingoFieldListItem from './BingoFieldListItem';

const repo = new FieldsRepository();

interface BingoFieldListProps {
  searchQuery: string;
  navigation: StackNavigationProp<StackRouteParameters>;
}

const BingoFieldList = (props: BingoFieldListProps) => {
  const [fields, setFields] = useState<BingoField[]>([]);

  useEffect(() => {
    repo.getAll().then(data => setFields(data));
  }, []);

  const queryContains = (text: string) => {
    if (text.toLowerCase().includes(props.searchQuery.toLowerCase())) {
      return {};
    }
    return styles.hide;
  };
  const edit = (id: number) => {
    props.navigation.navigate('editModal', {id: id});
  };

  return (
    <FlatList
      data={fields}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={styles.footer}
      renderItem={({item}) => {
        return (
          <BingoFieldListItem
            style={queryContains(item.text)}
            {...item}
            edit={() => edit(item.id)}
          />
        );
      }}
    />
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
