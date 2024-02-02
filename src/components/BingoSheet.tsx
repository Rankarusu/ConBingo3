import React from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

import BingoField from '@/components/BingoField';
import { CheckableBingoField } from '@/models/checkableBingoField';

export interface BingoSheetProps {
  fields: CheckableBingoField[];
  readonly?: boolean;
  style?: ViewStyle;
}

const BingoSheet: React.FC<BingoSheetProps> = (props) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: CheckableBingoField;
    index: number;
  }) => {
    return <BingoField {...item} position={index} readonly={props.readonly} />;
  };

  return (
    <View style={[styles.grid, props.style]}>
      <FlatList
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
        data={props.fields}
        horizontal={false}
        numColumns={5}
        renderItem={renderItem}
        keyExtractor={(item) => item.position.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    display: 'flex',
    flexDirection: 'row',
  },
  list: {
    gap: 2,
    padding: 6,
  },
  columnWrapper: {
    gap: 2,
  },
});

export default BingoSheet;
