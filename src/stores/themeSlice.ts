import { Appearance, ColorSchemeName } from 'react-native';

import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { CombinedDarkTheme, CombinedDefaultTheme } from '@/utils/theme';
import { RootState } from '@/stores/store';
import { Logger } from '@/utils/logger';

interface ThemeState {
  value: ColorSchemeName;
}

const initialState: ThemeState = {
  value: Appearance.getColorScheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = state.value === 'light' ? 'dark' : 'light';
      Logger.debug(`theme toggled: ${state.value}`);
    },
  },
});

export function useAppTheme() {
  const selector = useSelector((state: RootState) =>
    state.theme.value === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme,
  );
  return selector;
}
export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;
