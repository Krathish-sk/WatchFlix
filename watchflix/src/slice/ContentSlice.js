import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const MOVIE_BASE_URL = process.env.REACT_APP_MOVIE_BASE_URL;

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

// Adding movie to array
const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

// Get movie data
const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

// Fetch all the genres
export const fetchGenres = createAsyncThunk("watchflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${MOVIE_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

// Fetch data based on genres and types
export const fetchDataByGenre = createAsyncThunk(
  "watchflix/genre",
  async ({ genre, type }) => {
    return getRawData(
      `${MOVIE_BASE_URL}/discover${type}?api_key=${API_KEY}&with_genres=${genre}`,
      initialState.genres
    );
  }
);

// Fetch movies
export const fetchMovies = createAsyncThunk(
  "watchflix/trending",
  async ({ type }) => {
    return getRawData(
      `${MOVIE_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      initialState.genres,
      true
    );
  }
);

const ContentSlice = createSlice({
  name: "watchflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const { setGenres, setMovies } = ContentSlice.actions;
export default ContentSlice.reducer;
