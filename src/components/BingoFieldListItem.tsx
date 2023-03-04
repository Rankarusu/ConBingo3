import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, List, TouchableRipple} from 'react-native-paper';
import {useAppTheme} from '../hooks/useAppTheme';
import {BingoField} from '../models/bingoField';

type BingoFieldListItemProps = BingoField;

export const BingoFieldListItem = (props: BingoFieldListItemProps) => {
  const theme = useAppTheme(); //TODO: maybe pass this as a prop

  const buttonGroup = () => (
    <>
      <IconButton
        icon="square-edit-outline"
        mode="contained"
        iconColor={theme.colors.onSurface}
        size={20}
        onPress={() => console.log(props.id)}
      />
      <IconButton
        icon="delete"
        mode="contained"
        iconColor={theme.colors.onSurface}
        size={20}
        onPress={() => console.log(props.id)}
      />
    </>
  );

  return (
    <TouchableRipple onPress={() => {}}>
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
