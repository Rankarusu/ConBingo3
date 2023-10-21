/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react';

import { StyleSheet, ViewStyle } from 'react-native';

import { IconButton, List, TouchableRipple } from 'react-native-paper';

import { BingoField } from '@/models/bingoField';
import { useSelectedFields } from '@/stores/selectedFieldsSlice';
import { useAppTheme } from '@/stores/themeSlice';
import { RgbaColor } from '@/utils/rgbaColor';

import '@/components/BingoFieldListItem.css';

export type BingoFieldListItemProps = BingoField & {
  //we pass style as a prop to hide the item if it does not match the search query
  style: ViewStyle;
  selected: boolean;
  edit: () => void;
  delete: () => void;
  onPress: () => void;
  onLongPress: () => void;
};

const BingoFieldListItem: React.FC<BingoFieldListItemProps> = (props) => {
  const theme = useAppTheme();
  const { multiSelectModeEnabled } = useSelectedFields();

  const primary = RgbaColor.FromString(theme.colors.inversePrimary);
  primary.a = 0.3;
  const translucentPrimary = primary.toRgbaString();

  const buttonGroup = () => (
    <>
      <IconButton
        style={[
          {
            //@ts-ignore ts does not know expo hacks
            $$css: true,
            _: 'button',
          },
        ]}
        icon="square-edit-outline"
        mode="contained"
        iconColor={theme.colors.onSurface}
        size={20}
        disabled={multiSelectModeEnabled}
        onPress={props.edit}
      />
      <IconButton
        style={[
          {
            //@ts-ignore ts does not know expo hacks
            $$css: true,
            _: 'button',
          },
        ]}
        icon="delete"
        mode="contained"
        iconColor={theme.colors.onSurface}
        size={20}
        disabled={multiSelectModeEnabled}
        onPress={props.delete}
      />
    </>
  );

  return (
    <TouchableRipple
      style={[
        {
          //@ts-ignore ts does not know expo hacks
          $$css: true,
          _: 'ripple',
        },
        props.style,
        props.selected ? { backgroundColor: translucentPrimary } : {},
      ]}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      delayLongPress={150}
    >
      <List.Item
        titleStyle={
          props.selected ? { color: theme.colors.onPrimaryContainer } : {}
        }
        style={[
          {
            //@ts-ignore ts does not know expo hacks
            $$css: true,
            _: 'list-item',
          },
          styles.listItem,
        ]}
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
