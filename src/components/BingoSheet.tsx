import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import BingoField, {BingoFieldProps} from '../components/BingoField';

const Item = memo((props: BingoFieldProps) => <BingoField {...props} />);

const BingoSheet = () => {
  const [data, setData] = useState<Array<BingoFieldProps>>(
    [...Array(25).keys()].map(num => {
      return {
        id: num,
        text: num.toString(),
        checked: true,
      } as BingoFieldProps;
    }),
  );

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
        {data.map(item => {
          return <Item key={item.text} {...item} />;
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
