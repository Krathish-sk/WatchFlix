import { configureStore } from "@reduxjs/toolkit";
import ContentSliceReducer from "./slice/ContentSlice";

const store = configureStore({
  reducer: {
    content: ContentSliceReducer,
  },
});

export default store;
