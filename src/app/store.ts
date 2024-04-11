import { configureStore } from "@reduxjs/toolkit";
import { repoReducerPath, repoReducer } from "../features/repo";
import { issuesReducer, issuesReducerPath } from "../features/issues";

export const store = configureStore({
  reducer: {
    [repoReducerPath]: repoReducer,
    [issuesReducerPath]: issuesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
