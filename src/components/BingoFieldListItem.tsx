import React, {memo} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {IconButton, List, TouchableRipple} from 'react-native-paper';
import {BingoField} from '../models/bingoField';
import {useAppTheme} from '../stores/themeSlice';
import {RgbaColor} from '../utils/rgbaColor';

export type BingoFieldListItemProps = BingoField & {
  //we pass style as a prop to hide the item if it does not match the search query
  style: ViewStyle;
  selected: boolean;
  edit: () => void;
  delete: () => void;
  onPress: () => void;
  onLongPress: () => void;
};

export const BingoFieldListItem: React.FC<BingoFieldListItemProps> = props => {
  const theme = useAppTheme();
  const primary = RgbaColor.FromString(theme.colors.inversePrimary);
  primary.a = 0.3;
  const translucentPrimary = primary.toRgbaString();

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
    <TouchableRipple
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      delayLongPress={150}
      style={[
        props.style,
        props.selected ? {backgroundColor: translucentPrimary} : {},
      ]}>
      <List.Item
        titleStyle={
          props.selected ? {color: theme.colors.onPrimaryContainer} : {}
        }
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
