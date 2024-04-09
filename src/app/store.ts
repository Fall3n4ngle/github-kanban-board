import { configureStore } from "@reduxjs/toolkit";
import { reposSlice } from "../features/repo";

export const store = configureStore({
  reducer: {
    [reposSlice.reducerPath]: reposSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
