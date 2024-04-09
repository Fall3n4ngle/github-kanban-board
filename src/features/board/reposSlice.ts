import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

type Owner = {
  login: string;
  url: string;
};

type Repo = {
  id: string;
  name: string;
  url: string;
  stargazers_count: number;
  owner: Owner;
};

const reposAdapter = createEntityAdapter({
  selectId: (repo: Repo) => repo.id,
});


type State = {
  isLoading: boolean;
  error: string | null;
};

export const fetchRepo = createAsyncThunk(
  "repos/fetch",
  async (
    { owner, repo }: { owner: string; repo: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const result: Repo = await response.json();

      return fulfillWithValue({
        id: `${owner}_${repo}`,
        name: result.name,
        owner: {
          login: result.owner.login,
          url: result.owner.url,
        },
        stargazers_count: result.stargazers_count,
        url: result.url,
      } as Repo);
    } catch (error) {
      rejectWithValue("Failed to fetch repository");
    }
  }
);

export const reposSlice = createSlice({
  name: "repos",
  initialState: reposAdapter.getInitialState<State>({
    isLoading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepo.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(fetchRepo.fulfilled, (state, action) => {
      state.isLoading = false;
      reposAdapter.addOne(state, action.payload as Repo);
    });

    builder.addCase(fetchRepo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { selectById } = reposAdapter.getSelectors();