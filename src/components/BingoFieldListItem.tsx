import React, {memo} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {IconButton, List, TouchableRipple} from 'react-native-paper';
import {BingoField} from '../models/bingoField';
import {useAppTheme} from '../stores/themeSlice';

export type BingoFieldListItemProps = BingoField & {
  //we pass style as a prop to hide the item if it does not match the search query
  style: ViewStyle;
  edit: () => void;
  delete: () => void;
};

export const BingoFieldListItem: React.FC<BingoFieldListItemProps> = props => {
  const theme = useAppTheme();

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

//we memoize list components so they wont rerender unless their props change.
export default memo(BingoFieldListItem);
