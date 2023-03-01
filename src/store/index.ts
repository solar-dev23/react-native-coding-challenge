import {configureStore} from '@reduxjs/toolkit';
import {movieReducer} from './movies.slice';

export * from './movies.slice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
