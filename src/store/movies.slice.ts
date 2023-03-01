import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from '.';
import {API_URL, API_KEY} from '../constants';
import {IMovie} from '../types';

export const moviesAdapter = createEntityAdapter<IMovie>();

const name = 'movies';
const slice = createSlice({
  name,
  initialState: moviesAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {
    clearState(state) {
      moviesAdapter.removeAll(state);
      state.loading = false;
      state.error = null;
    },
    addFavorite(state, action: PayloadAction<IMovie>) {
      moviesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {...action.payload, favorite: true},
      });
      state.loading = false;
      state.error = null;
    },
    removeFavorite(state, action: PayloadAction<IMovie>) {
      moviesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {...action.payload, favorite: false},
      });
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMovies.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      moviesAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchMovies.rejected, state => {
      state.loading = false;
    });
  },
});

export const fetchMovies = createAsyncThunk(
  `${name}/getMovies`,
  async (search: string) => {
    try {
      const response = await fetch(
        `${API_URL}/?apikey=${API_KEY}&type=movie&y=2022&&s=${search}`,
      );
      const {Response, Search: data} = await response.json();
      if (Response !== 'True') {
        return [];
      }

      const result = data.map((movie: any) => ({
        id: movie.imdbID,
        poster: movie.Poster,
        title: movie.Title,
        year: movie.Year,
        type: movie.Type,
      }));

      return result;
    } catch (error) {
      console.error(error);
    }
  },
);

export const {selectAll} = moviesAdapter.getSelectors(
  (state: RootState) => state.movies,
);
export const {clearState, addFavorite, removeFavorite} = slice.actions;
export default slice.reducer;
