import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {IMovie} from '../types';
import {fetchMovies} from '../utils/api';

const name = 'movies';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions() as any;
const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: (builder: ActionReducerMapBuilder<MovieState>) =>
    createExtraReducers(builder),
});

export interface MovieState {
  list: Array<IMovie>;
  error: any;
  loading: boolean;
}

function createInitialState(): MovieState {
  return {
    list: [],
    loading: false,
    error: null,
  };
}

function createReducers() {
  return {
    clearState,
    addFavorite,
    removeFavorite,
  };

  function clearState(state: MovieState) {
    state.list = [];
    state.loading = false;
    state.error = null;
  }

  function addFavorite(state: MovieState, action: PayloadAction<string>) {
    state.list = state.list.map(movie =>
      movie.id === action.payload ? {...movie, favorite: true} : movie,
    );
  }

  function removeFavorite(state: MovieState, action: PayloadAction<string>) {
    state.list = state.list.map(movie =>
      movie.id === action.payload ? {...movie, favorite: false} : movie,
    );
  }
}

function createExtraActions() {
  return {
    getList,
  };

  function getList() {
    return createAsyncThunk(`${name}/getList`, async ({search}: any) => {
      const response = await fetchMovies(search);
      return response;
    });
  }
}

function createExtraReducers(builder: ActionReducerMapBuilder<MovieState>) {
  const {getList} = extraActions;

  builder
    // getList()
    .addCase(getList.pending, (state: MovieState) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      getList.fulfilled,
      (state: MovieState, action: PayloadAction<IMovie[]>) => {
        state.loading = false;
        state.list = action.payload;
      },
    )
    .addCase(getList.rejected, (state: MovieState, action: any) => {
      state.error = action.error;
      state.loading = false;
    });
}

export const movieActions = {...slice.actions, ...extraActions};
export const movieReducer = slice.reducer;
