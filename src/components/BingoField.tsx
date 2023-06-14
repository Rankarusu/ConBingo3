import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {Surface, Text, TouchableRipple} from 'react-native-paper';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {CurrentSheetRepository} from '../db';
import {useAppTheme} from '../hooks/useAppTheme';
import {RgbaColor} from '../utils/rgbaColor';

export interface BingoFieldProps {
  id: number;
  position: number;
  text: string;
  checked?: boolean;
}
const repo = new CurrentSheetRepository();
const BingoField = (props: BingoFieldProps) => {
  const theme = useAppTheme();
  const {text} = props;
  const [checked, setChecked] = useState(props.checked);

  const primary = RgbaColor.FromString(theme.colors.primary);
  primary.a = 0.2;
  const translucentPrimary = primary.toRgbaString();

  const progress = useDerivedValue(() => {
    return withTiming(checked ? 1 : 0, {
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
    <Surface style={[styles.bingoField]}>
      <TouchableRipple
        style={[styles.content]}
        borderless
        rippleColor={translucentPrimary}
        onPress={async () => {
          setChecked(!checked);
          await repo.setChecked(props.position, !checked);
          console.log('set checked', props.position, !checked);
        }}>
        <Animated.View style={[styles.content, borderStyle]}>
          <Text
            android_hyphenationFrequency="full"
            numberOfLines={6}
            style={styles.text}
            variant="bodySmall">
            {text}
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
    width: Dimensions.get('window').width / 5 - 4,
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

export default BingoField;
