import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HttpCall from '../../utils/HttpCall';
import { SetToastData } from '../ConfigSlice';

export type User = {
  name: string;
  username: string;
  email: string;
  photo: string;
};

export type UserState = {
  loading: boolean;
  data: User | null;
  formResult: any | null;
  linkUploaded: string;
  uploading: boolean;
};

const initialState: UserState = {
  loading: false,
  data: null,
  formResult: null,
  uploading: false,
  linkUploaded: '',
};

export const GetUser = createAsyncThunk('user/getUser', async () => {
  const { data } = (await HttpCall.get(`/user`)).data;
  return data;
});

export const PutChangePassword = createAsyncThunk(
  'user/putChangePassword',
  async (formData: any, { dispatch }) => {
    const result = (await HttpCall.put(`/user/change-password`, formData)).data;
    dispatch(SetToastData({ type: 'success', message: result?.message }));
    return result;
  }
);

export const PutUpdateUser = createAsyncThunk(
  'user/putUpdateUser',
  async (formData: any, { dispatch }) => {
    const result = (await HttpCall.put(`/user`, formData)).data;
    dispatch(SetToastData({ type: 'success', message: result?.message }));
    return result;
  }
);

const HomeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(GetUser.pending, (state: UserState, _) => {
      state.loading = true;
    });
    addCase(GetUser.fulfilled, (state: UserState, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    addCase(GetUser.rejected, (state: UserState) => {
      state.loading = false;
      state.data = null;
    });

    addCase(PutChangePassword.pending, (state: UserState, _) => {
      state.loading = true;
    });
    addCase(PutChangePassword.fulfilled, (state: UserState, { payload }) => {
      state.loading = false;
      state.formResult = payload;
    });
    addCase(PutChangePassword.rejected, (state: UserState) => {
      state.loading = false;
      state.formResult = null;
    });

    addCase(PutUpdateUser.pending, (state: UserState, _) => {
      state.loading = true;
    });
    addCase(PutUpdateUser.fulfilled, (state: UserState, { payload }) => {
      state.loading = false;
      state.formResult = payload;
    });
    addCase(PutUpdateUser.rejected, (state: UserState) => {
      state.loading = false;
      state.formResult = null;
    });
  },
});

export default HomeSlice.reducer;
