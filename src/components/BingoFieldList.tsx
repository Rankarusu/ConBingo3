import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {FieldsRepository} from '../db';
import {BingoField} from '../models/bingoField';
import BingoFieldListItem from './BingoFieldListItem';

const repo = new FieldsRepository();

interface BingoFieldListProps {
  filter: string;
}

const BingoFieldList = (props: BingoFieldListProps) => {
  const [fields, setFields] = useState<BingoField[]>([]);
  const [filteredFields, setFilteredFields] = useState<BingoField[]>(fields);

  useEffect(() => {
    repo.getAll().then(data => setFields(data));
  }, []);

  useEffect(() => {
    setFilteredFields(
      fields.filter(field =>
        field.text.toLowerCase().includes(props.filter.toLowerCase()),
      ),
    );
  }, [fields, props.filter]);

  return (
    <ScrollView>
      {filteredFields.map(field => {
        return <BingoFieldListItem key={field.id} {...field} />;
      })}
    </ScrollView>
  );
};

export default BingoFieldList;
