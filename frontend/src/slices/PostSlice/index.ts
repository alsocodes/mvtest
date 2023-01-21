import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../HomeSlice';
import HttpCall from '../../utils/HttpCall';
import jwt_decode from 'jwt-decode';

export type Post = {
  id: number;
  image: string;
  caption: string;
  tags: string;
  likes: number;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  action: any | null;
};

export type PostState = {
  loading: boolean;
  uploading: boolean;
  data: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
  formResult: any | null;
  linkUploaded: string;
};

const initialState: PostState = {
  loading: false,
  uploading: false,
  linkUploaded: '',
  data: [],
  pagination: {
    page: 0,
    limit: 0,
    total: 0,
  },
  formResult: null,
};

export const GetPosts = createAsyncThunk(
  'post/getPosts',
  async (query: any, { getState }: any) => {
    const { token } = getState().auth;
    const decoded: any = jwt_decode(token);
    // query.search = query.search.replace('#', '');
    if (query.search === '') delete query.search;
    if (query.searchBy === '') delete query.searchBy;
    // if(query.searchBy === )
    console.log(query);
    const userId = decoded?.sub;
    const { data, pagination } = (
      await HttpCall.get(`/post/user/${userId}`, { params: query })
    ).data;
    return { data, pagination };
  }
);

export const PostUpload = createAsyncThunk(
  'post/upload',
  async (formData: any) => {
    const { data } = (
      await HttpCall.post('/post/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    ).data;
    return data.link;
  }
);

export const PostCreatePost = createAsyncThunk(
  'post/postCreatePost',
  async (formData: any) => {
    const result = (await HttpCall.post('/post', formData)).data;
    return result;
  }
);

const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    ClearLink: (state: PostState) => {
      state.linkUploaded = '';
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(PostUpload.pending, (state: PostState, _) => {
      state.uploading = true;
    });
    addCase(PostUpload.fulfilled, (state: PostState, { payload }) => {
      state.uploading = false;
      state.linkUploaded = payload;
    });
    addCase(PostUpload.rejected, (state: PostState, _) => {
      state.uploading = false;
      state.linkUploaded = '';
    });

    addCase(PostCreatePost.pending, (state: PostState, _) => {
      state.loading = true;
    });
    addCase(PostCreatePost.fulfilled, (state: PostState, { payload }) => {
      state.loading = false;
      state.formResult = payload;
    });
    addCase(PostCreatePost.rejected, (state: PostState, _) => {
      state.loading = false;
    });

    addCase(GetPosts.pending, (state: PostState, _) => {
      state.loading = true;
    });
    addCase(GetPosts.fulfilled, (state: PostState, { payload }) => {
      state.loading = false;
      state.data = payload.data;
      state.pagination = payload.pagination;
    });
    addCase(GetPosts.rejected, (state: PostState, _) => {
      state.loading = false;
    });
  },
});

export const { ClearLink } = PostSlice.actions;

export default PostSlice.reducer;
