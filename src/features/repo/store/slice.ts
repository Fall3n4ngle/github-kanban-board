import { createSlice } from "@reduxjs/toolkit";
import { fetchRepo } from "./thunks";

type Owner = {
  login: string;
  html_url: string;
};

type Repo = {
  id: string;
  name: string;
  html_url: string;
  stargazers_count: number;
  owner: Owner;
};

type State = {
  isLoading: boolean;
  error: string | null;
  repo: Repo | null;
};

const reposSlice = createSlice({
  name: "repos",
  initialState: {
    isLoading: false,
    error: null,
    repo: null,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepo.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(fetchRepo.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!action.payload) return;
      state.repo = action.payload.repo;
    });

    builder.addCase(fetchRepo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { reducer: repoReducer, reducerPath: repoReducerPath } =
  reposSlice;
