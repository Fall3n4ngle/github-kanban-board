import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { repoReducerPath, repoReducer } from "../features/repo";
import { issuesReducer, issuesReducerPath } from "../features/issues";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [repoReducerPath]: repoReducer,
    [issuesReducerPath]: issuesReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
