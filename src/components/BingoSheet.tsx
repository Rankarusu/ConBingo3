import React from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import BingoField from '@/components/BingoField';
import { CheckableBingoField } from '@/models/checkableBingoField';

export interface BingoSheetProps {
  fields: CheckableBingoField[];
  readonly?: boolean;
  style?: ViewStyle;
}

const BingoSheet: React.FC<BingoSheetProps> = (props) => {
  return (
    <View style={[styles.grid, props.style]}>
      {props.fields.map((item, index) => {
        return (
          <BingoField
            key={index}
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
    maxHeight: '100%',
  },
});

export default BingoSheet;
