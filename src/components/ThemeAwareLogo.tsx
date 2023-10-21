import React from 'react';

import { StyleSheet } from 'react-native';

import { useAppTheme } from '@/stores/themeSlice';
import Logo from '@assets/logo.svg';

interface ThemeAwareLogoProps {
  height: number;
  width: number;
}

const ThemeAwareLogo: React.FC<ThemeAwareLogoProps> = (props) => {
  const theme = useAppTheme();
  return (
    <Logo
      style={styles.logo}
      height={props.height}
      width={props.width}
      color={theme.colors.text}
      fill={theme.colors.text}
      stroke={theme.colors.text}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    paddingEnd: 20,
  },
});

export default ThemeAwareLogo;
