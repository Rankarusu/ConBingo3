import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {IconButton, List, TouchableRipple} from 'react-native-paper';
import {useAppTheme} from '../hooks/useAppTheme';
import {BingoField} from '../models/bingoField';

export type BingoFieldListItemProps = BingoField & {
  style: ViewStyle;
  edit: () => void;
  delete: () => void;
};

export const BingoFieldListItem = (props: BingoFieldListItemProps) => {
  const theme = useAppTheme(); //TODO: maybe pass this as a prop

  const buttonGroup = () => (
    <>
      <IconButton
        icon="square-edit-outline"
        mode="contained"
        iconColor={theme.colors.onSurface}
        size={20}
        onPress={props.edit}
      />
      <IconButton
        icon="delete"
        mode="contained"
        iconColor={theme.colors.onSurface}
        size={20}
        onPress={props.delete}
      />
    </>
  );

  return (
    <TouchableRipple onPress={() => {}} style={props.style}>
      <List.Item
        style={styles.listItem}
        title={props.text}
        titleNumberOfLines={3}
        right={buttonGroup}
      />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingEnd: 5,
  },
});

export default BingoFieldListItem;
