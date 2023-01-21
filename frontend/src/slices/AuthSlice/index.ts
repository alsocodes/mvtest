import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFormLogin } from '../../pages/LoginPage';
import HttpCall from '../../utils/HttpCall';
import { SetToastData } from '../ConfigSlice';

export type AuthState = {
  loggedIn: boolean;
  loading: boolean;
  token: string | null;
  linkUploaded: string;
  uploading: boolean;
  formResult: any | null;
};

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  token: null,
  linkUploaded: '',
  uploading: false,
  formResult: null,
};

export const PostLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }: IFormLogin, { dispatch }) => {
    try {
      const { data, message } = (
        await HttpCall.post('/auth/login', {
          username,
          password,
        })
      ).data;

      dispatch(SetToastData({ type: 'success', message: message }));
      return data.token;
    } catch (err: any) {
      // Cannot login!
      // const toastData = {
      //   type: 'error',
      //   message: err.response.data.message || 'Error',
      // };
      // dispatch(SetToastData(toastData));

      throw err;
    }
  }
);

export const PostUpload = createAsyncThunk(
  'auth/upload',
  async (formData: any) => {
    try {
      const { data } = (
        await HttpCall.post('auth/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      ).data;
      return data.link;
    } catch (error) {
      throw error;
    }
  }
);

export const PostRegister = createAsyncThunk(
  'auth/register',
  async (formData: any, { dispatch }) => {
    const result = (await HttpCall.post('auth/register', formData)).data;
    dispatch(SetToastData({ type: 'success', message: result?.message }));
    return result;
  }
);

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Logout(state: AuthState) {
      state.loggedIn = false;
      state.token = null;
    },
    ClearFormResult(state: AuthState) {
      state.formResult = null;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(PostLogin.pending, (state: AuthState, _) => {
      state.loading = true;
    });
    addCase(PostLogin.fulfilled, (state: AuthState, { payload }) => {
      state.loading = false;
      state.loggedIn = true;
      state.token = payload;
    });
    addCase(PostLogin.rejected, (state: AuthState, _) => {
      state.loading = false;
    });

    addCase(PostUpload.pending, (state: AuthState, _) => {
      state.uploading = true;
    });
    addCase(PostUpload.fulfilled, (state: AuthState, { payload }) => {
      state.uploading = false;
      state.linkUploaded = payload;
    });
    addCase(PostUpload.rejected, (state: AuthState, _) => {
      state.uploading = false;
      state.linkUploaded = '';
    });

    addCase(PostRegister.pending, (state: AuthState) => {
      state.loading = true;
    });

    addCase(PostRegister.fulfilled, (state: AuthState, { payload }) => {
      state.formResult = payload;
      state.loading = false;
    });

    addCase(PostRegister.rejected, (state: AuthState, { payload }) => {
      state.loading = false;
      state.formResult = payload;
    });
  },
});

export const { Logout, ClearFormResult } = AuthSlice.actions;
export default AuthSlice.reducer;
