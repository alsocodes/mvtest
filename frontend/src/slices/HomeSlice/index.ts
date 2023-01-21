import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../PostSlice';
import HttpCall from '../../utils/HttpCall';

export type User = {
  name: string;
  username: string;
  email: string;
  photo: string;
};

export type HomeState = {
  loading: boolean;
  data: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
};

const initialState: HomeState = {
  loading: false,
  data: [],
  pagination: {
    page: 0,
    limit: 0,
    total: 0,
  },
};

export const GetPosts = createAsyncThunk(
  'post/getPosts',
  async (query: any) => {
    const { data, pagination } = (
      await HttpCall.get(`/post`, { params: query })
    ).data;
    return { data, pagination };
  }
);

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(GetPosts.pending, (state: HomeState, _) => {
      state.loading = true;
    });
    addCase(GetPosts.fulfilled, (state: HomeState, { payload }) => {
      state.loading = false;
      state.data = payload.data;
      state.pagination = payload.pagination;
    });
    addCase(GetPosts.rejected, (state: HomeState, _) => {
      state.loading = false;
    });
  },
});

export default HomeSlice.reducer;
