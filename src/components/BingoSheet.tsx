import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BingoField, {BingoFieldProps} from '../components/BingoField';
import {CurrentSheetRepository, FieldsRepository} from '../db';
import {generateSheet} from '../hooks/useGenerateSheet';

const Item = memo((props: BingoFieldProps) => <BingoField {...props} />);
const currentSheetRepo = new CurrentSheetRepository();
const fieldsRepo = new FieldsRepository();

const BingoSheet = () => {
  useEffect(() => {
    currentSheetRepo.getAll().then(data => {
      if (!data || data.length > 25) {
        console.log('generating new field, either no or too much data.');
        fieldsRepo
          .getAll()
          .then(fields => generateSheet(fields))
          .then(sheet => {
            console.log(sheet);
            setData(sheet);
            currentSheetRepo.setAll(sheet);
          });
      } else {
        setData(data);
        console.log('loaded currentSheet data from Async Storage');
      }
    });
  }, []);

  const [data, setData] = useState<BingoFieldProps[]>([]);

  // const onOrderChanged = useCallback(
  //   (orderedData: Array<BingoFieldProps>) => setData(orderedData),
  //   [],
  // );

  // const renderItem = ({item}: {item: BingoFieldProps}) => (
  //   <Item {...item} style={styles.item} />
  // );
  // const keyExtractor = ({id}: BingoFieldProps) => `gridview-${id}`;

  return (
    <View style={styles.center}>
      <View style={styles.grid}>
        {data.map((item, index) => {
          return <Item key={item.id} {...item} position={index} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  grid: {
    gap: 2,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default BingoSheet;
