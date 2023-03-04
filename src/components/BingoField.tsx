import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {Surface, Text, TouchableRipple, useTheme} from 'react-native-paper';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

export interface BingoFieldProps {
  id: number;
  text: string;
  checked?: boolean;
}

const BingoField = (props: BingoFieldProps) => {
  const theme = useTheme();
  const {text} = props;
  const [checked, setChecked] = useState(props.checked);

  const rStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(1, [0, 1], ['aqua', 'blue']);
    return {
      borderColor,
    };
  });

  return (
    // <View  style={styles.bingoField}>
    <Surface
      elevation={1}
      style={[styles.bingoField, checked && styles.checked]}>
      <TouchableRipple
        borderless
        rippleColor={theme.colors.primary}
        onPress={() => {
          setChecked(!checked);
        }}
        style={styles.content}>
        <Text style={styles.text} variant="bodySmall">
          {text}
        </Text>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  bingoField: {
    aspectRatio: 1,
    borderRadius: 4,
    width: Dimensions.get('window').width / 5 - 4,
    height: 1,
    minHeight: 1,
    minWidth: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  checked: {
    borderColor: 'red',
    borderWidth: 2,
  },
  text: {
    // lineHeight: 1,
    flex: 1,
    padding: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default BingoField;
