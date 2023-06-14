import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import BingoField, {BingoFieldProps} from '../components/BingoField';
import {CheckableBingoField} from '../models/checkableBingoField';

//we memoize list components so they wont rerender unless their props change.
const Item = memo((props: BingoFieldProps) => <BingoField {...props} />);

interface BingoSheetProps {
  fields: CheckableBingoField[];
}

const BingoSheet = (props: BingoSheetProps) => {
  // const [data, setData] = useState<BingoFieldProps[]>([]);

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
        {props.fields.map((item, index) => {
          return <Item key={item.id} {...item} position={index} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
