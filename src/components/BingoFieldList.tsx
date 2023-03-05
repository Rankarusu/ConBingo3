import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FieldsRepository} from '../db';
import {BingoField} from '../models/bingoField';
import BingoFieldListItem from './BingoFieldListItem';

const repo = new FieldsRepository();

interface BingoFieldListProps {
  searchQuery: string;
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

  return (
    <FlatList
      data={fields}
      renderItem={({item}) => {
        return (
          <BingoFieldListItem style={queryContains(item.text)} {...item} />
        );
      }}
      extraData={props.searchQuery}
    />
  );
};

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
});

export default BingoFieldList;
