import {useAppTheme} from '@/stores/themeSlice';
import Logo from '@assets/logo.svg';
import React from 'react';

interface ThemeAwareLogoProps {
  height: number;
  width: number;
}

const ThemeAwareLogo: React.FC<ThemeAwareLogoProps> = props => {
  const theme = useAppTheme();
  return (
    <Logo
      style={{paddingEnd: 20}}
      height={props.height}
      width={props.width}
      color={theme.colors.text}
      fill={theme.colors.text}
      stroke={theme.colors.text}
    />
  );
};

export default ThemeAwareLogo;
