import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  movies: [],
  genresLoaded: false,
  genere: [],
};

const ContentSlice = createSlice({
  name: "watchflix",
  initialState,
  extraReducers: (builder) => {},
});

export const { setGenres, setMovies } = ContentSlice.actions;
export default ContentSlice.reducer;
