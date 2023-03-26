import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import BingoField, {BingoFieldProps} from '../components/BingoField';
import {CheckableBingoField} from '../models/checkableBingoField';

//we memoize list components so they wont rerender unless their props change.
const Item = memo((props: BingoFieldProps) => <BingoField {...props} />);

interface BingoSheetProps {
  fields: CheckableBingoField[];
  readonly?: boolean;
}

const BingoSheet = (props: BingoSheetProps) => {
  return (
    <View style={styles.grid}>
      {props.fields.map((item, index) => {
        return (
          <Item
            key={item.id}
            {...item}
            position={index}
            readonly={props.readonly}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    gap: 2,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default BingoSheet;
