import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'store/store';

export interface HomeState {
  menu: any[];
}

const initialState: HomeState = {
  menu: [],
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
});

export const {} = homeSlice.actions;

export const selectHomeMenu = (state: RootState) => state.home.menu;

export default homeSlice.reducer;
