import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFormLogin } from '../../pages/LoginPage';
import HttpCall from '../../utils/HttpCall';

export type AuthState = {
  loggedIn: boolean;
  loading: boolean;
  token: string | null;
};

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  token: null,
};

export const PostLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }: IFormLogin, { dispatch }) => {
    try {
      const { data } = (
        await HttpCall.post('/auth/login', {
          username,
          password,
        })
      ).data;

      // dispatch(SetToastData(toastData));
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

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Logout(state: AuthState) {
      state.loggedIn = false;
      state.token = null;
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
  },
});

// It is a convention to export reducer as a default export:
export default AuthSlice.reducer;
