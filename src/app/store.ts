import { configureStore } from "@reduxjs/toolkit";
import { reposSlice } from "../features/repo";
import { issuesSlice } from "../features/issues";

export const store = configureStore({
  reducer: {
    [reposSlice.reducerPath]: reposSlice.reducer,
    [issuesSlice.reducerPath]: issuesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
