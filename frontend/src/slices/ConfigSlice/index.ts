import { createSlice } from '@reduxjs/toolkit';

export type ToastData = {
  type: string;
  message: string;
};

export type ConfigState = {
  toastData?: ToastData | null;
  progress: boolean;
  menuActive: string;
};

const initialState: ConfigState = {
  toastData: null,
  progress: false,
  menuActive: 'HOME',
};

const ConfigSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    SetToastData(state: ConfigState, { payload }) {
      state.toastData = payload;
    },
    SetProgress(state: ConfigState, { payload }) {
      state.progress = payload;
    },
    SetMenuActive(state: ConfigState, { payload }) {
      state.menuActive = payload;
    },
  },
});

export const { SetMenuActive, SetProgress, SetToastData } = ConfigSlice.actions;
export default ConfigSlice.reducer;
