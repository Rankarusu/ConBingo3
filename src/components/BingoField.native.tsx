import React, {memo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {Surface, Text, TouchableRipple} from 'react-native-paper';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppDispatch} from '../hooks';
import {useModal} from '../hooks/useModal';
import {toggleCheckedField} from '../stores/currentSheetSlice';
import {RgbaColor} from '../utils/rgbaColor';
import {useAppTheme} from '../stores/themeSlice';
import {Logger} from '@/utils/logger';

export interface BingoFieldProps {
  position: number;
  text: string;
  checked?: boolean;
  readonly?: boolean;
}
const BingoField: React.FC<BingoFieldProps> = props => {
  const dispatch = useAppDispatch();
  const theme = useAppTheme();
  const {openEditCurrentSheetModal} = useModal();

  const primary = RgbaColor.FromString(theme.colors.primary);
  primary.a = 0.2;
  const translucentPrimary = primary.toRgbaString();

  const progress = useDerivedValue(() => {
    return withTiming(props.checked ? 1 : 0, {
      duration: 200,
    });
  });

  const borderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      ['transparent', theme.colors.primary],
    );
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['transparent', translucentPrimary],
    );

    return {
      borderColor,
      borderWidth: 2,
      backgroundColor,
    };
  });

  return (
    <Surface style={styles.bingoField}>
      <TouchableRipple
        style={styles.content}
        borderless
        disabled={props.readonly}
        rippleColor={translucentPrimary}
        onPress={() => {
          //state is managed centrally by redux only and we prevent rerender of other items by using memo :)
          dispatch(
            toggleCheckedField({
              position: props.position,
              checked: !props.checked,
            }),
          );
        }}
        onLongPress={() => {
          openEditCurrentSheetModal(props.position);
        }}>
        <Animated.View style={[styles.content, borderStyle]}>
          <Text
            android_hyphenationFrequency="full"
            numberOfLines={6}
            style={styles.text}
            variant="bodySmall">
            {props.text}
          </Text>
        </Animated.View>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  bingoField: {
    aspectRatio: 1,
    borderRadius: 4,
    flexBasis: Dimensions.get('window').width / 5 - 4,
    height: 1,
    minHeight: 1,
    minWidth: 1,
    elevation: 1,
  },
  content: {
    flex: 1,
    borderRadius: 4,
  },
  text: {
    lineHeight: 10,
    fontSize: 10,
    flex: 1,
    padding: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

//we memoize list components so they wont rerender unless their props change.
export default memo(BingoField);