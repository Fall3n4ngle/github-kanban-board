import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getRepoId } from "../../../utils";
import { getIssueStatus } from "../utils/getIssueStatus";

type BaseIssue = {
  id: number;
  title: string;
  number: number;
  createdAt: Date;
  user: {
    login: string;
  };
  comments: number;
};

export type GuthubIssueStatus = "open" | "closed";

type GuthubIssue = BaseIssue & {
  state: GuthubIssueStatus;
  assignee: null | object;
};

export type StateIssueStatus = "todo" | "in_progress" | "done";

type StateIssue = BaseIssue & {
  repoId: string;
  state: StateIssueStatus;
};

export const fetchIssues = createAsyncThunk(
  "issues/fetch",
  async (
    { owner, repo }: { owner: string; repo: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=all`,
      );

      if (!response.ok) {
        throw new Error("");
      }

      const result: GuthubIssue[] = await response.json();

      return result.map((issue) => {
        const status = getIssueStatus({
          assignee: issue.assignee,
          status: issue.state,
        });

        return {
          comments: issue.comments,
          createdAt: issue.createdAt,
          id: issue.id,
          number: issue.number,
          title: issue.title,
          state: status,
          user: {
            login: issue.user.login,
          },
          repoId: getRepoId({ owner, repo }),
        } as StateIssue;
      });
    } catch {
      rejectWithValue("Failed to fetch issues");
    }
  }
);

const issuesAdapter = createEntityAdapter<StateIssue>();

type State = {
  isLoading: boolean;
  error: string | null;
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState: issuesAdapter.getInitialState<State>({
    isLoading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.isLoading = false;
      issuesAdapter.addMany(state, action.payload as StateIssue[]);
    });

    builder.addCase(fetchIssues.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });
  },
});
