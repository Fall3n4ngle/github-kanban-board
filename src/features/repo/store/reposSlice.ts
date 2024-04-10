import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { getRepoId } from "../../../utils";
import { fetchIssues } from "../../issues";

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

export const fetchRepo = createAsyncThunk(
  "repos/fetch",
  async (
    { owner, repo }: { owner: string; repo: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
      );

      if (!response.ok) {
        throw new Error();
      }

      const result: Repo & { has_issues: boolean } = await response.json();
      
      if (result.has_issues) {
        dispatch(fetchIssues({ repo, owner }));
      }

      return {
        repo: {
          id: getRepoId({ owner, repo }),
          name: result.name,
          owner: {
            login: result.owner.login,
            html_url: result.owner.html_url,
          },
          stargazers_count: result.stargazers_count,
          html_url: result.html_url,
        } as Repo,
      };
    } catch {
      rejectWithValue("Failed to fetch repository");
    }
  }
);

export const reposSlice = createSlice({
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
      state.repo = action.payload?.repo ?? null;
    });

    builder.addCase(fetchRepo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const getRepoStatus = (state: RootState) => state.repos.isLoading;
export const getRepoError = (state: RootState) => state.repos.error;
export const getRepo = (state: RootState) => state.repos.repo;
