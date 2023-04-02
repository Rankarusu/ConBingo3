import {createSlice} from '@reduxjs/toolkit';
import {Appearance, ColorSchemeName} from 'react-native';
import {CombinedDarkTheme, CombinedDefaultTheme} from '../utils/theme';
import {RootState} from './store';

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
    toggle: state => {
      state.value = state.value === 'light' ? 'dark' : 'light';
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.value;
export const selectAppTheme = (state: RootState) =>
  state.theme.value === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

export const {toggle} = themeSlice.actions;

export default themeSlice.reducer;