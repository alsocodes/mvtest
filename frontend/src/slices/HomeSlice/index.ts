import { createSlice } from '@reduxjs/toolkit';

export type User = {
  name: string;
  username: string;
  email: string;
  photo: string;
};

export type Post = {
  id: number;
  image: string;
  caption: string;
  tags: string;
  like: number;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export type HomeState = {
  loading: boolean;
  data: Post[];
  total: number;
  page: number;
  limit: number;
};

const dummies: Post[] = [
  {
    id: 1,
    image:
      'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    caption: 'Dont be affraid you can do it',
    tags: '#motive #believe',
    like: 777,
    createdAt: '',
    updatedAt: '',
    user: {
      email: 'also@gmail.com',
      name: 'also',
      username: 'also',
      photo:
        'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    },
  },
  {
    id: 1,
    image:
      'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    caption: 'Dont be affraid you can do it',
    tags: '#motive #believe',
    like: 777,
    createdAt: '',
    updatedAt: '',
    user: {
      email: 'also@gmail.com',
      name: 'also',
      username: 'also',
      photo:
        'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    },
  },
  {
    id: 1,
    image:
      'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    caption: 'Dont be affraid you can do it',
    tags: '#motive #believe',
    like: 777,
    createdAt: '',
    updatedAt: '',
    user: {
      email: 'also@gmail.com',
      name: 'also',
      username: 'also',
      photo:
        'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    },
  },
  {
    id: 1,
    image:
      'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    caption: 'Dont be affraid you can do it',
    tags: '#motive #believe',
    like: 777,
    createdAt: '',
    updatedAt: '',
    user: {
      email: 'also@gmail.com',
      name: 'also',
      username: 'also',
      photo:
        'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    },
  },
  {
    id: 1,
    image:
      'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    caption: 'Dont be affraid you can do it',
    tags: '#motive #believe',
    like: 777,
    createdAt: '',
    updatedAt: '',
    user: {
      email: 'also@gmail.com',
      name: 'also',
      username: 'also',
      photo:
        'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    },
  },
  {
    id: 1,
    image:
      'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    caption: 'Dont be affraid you can do it',
    tags: '#motive #believe',
    like: 777,
    createdAt: '',
    updatedAt: '',
    user: {
      email: 'also@gmail.com',
      name: 'also',
      username: 'also',
      photo:
        'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    },
  },
  {
    id: 1,
    image:
      'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    caption: 'Dont be affraid you can do it',
    tags: '#motive #believe',
    like: 777,
    createdAt: '',
    updatedAt: '',
    user: {
      email: 'also@gmail.com',
      name: 'also',
      username: 'also',
      photo:
        'https://source.unsplash.com/random/800x800/?wallpaper,landscape,technology',
    },
  },
];

const initialState: HomeState = {
  loading: false,
  data: dummies,
  total: dummies?.length,
  page: 1,
  limit: 10,
};

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {},
});

export default HomeSlice.reducer;
