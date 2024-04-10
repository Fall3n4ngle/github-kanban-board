import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getRepoId } from "../../../utils";
import { getIssueStatus } from "../utils";
import { BaseIssue, GuthubIssueStatus, Issue, IssueStatus } from "../types";
import { RootState } from "../../../app/store";

type GuthubIssue = BaseIssue & {
  state: GuthubIssueStatus;
  assignee: null | object;
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
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
          },
        }
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
          created_at: issue.created_at,
          id: issue.id,
          number: issue.number,
          title: issue.title,
          state: status,
          user: {
            login: issue.user.login,
          },
          repoId: getRepoId({ owner, repo }),
        } as Issue;
      });
    } catch {
      rejectWithValue("Failed to fetch issues");
    }
  }
);

const issuesAdapter = createEntityAdapter<Issue>();

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
      issuesAdapter.addMany(state, action.payload as Issue[]);
    });

    builder.addCase(fetchIssues.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });
  },
});

const { selectAll } = issuesAdapter.getSelectors();

type Filters = {
  repoId: string;
  status: IssueStatus;
};

export const selectIssuesByStatus = createSelector(
  selectAll,
  (_: unknown, { repoId, status }: Filters) => ({ repoId, status }),
  (issues, { repoId, status }) => {
    return issues.filter(
      (issue) => issue.repoId === repoId && issue.state === status
    );
  }
);

export const selectIssuesStatus = (state: RootState) => state.issues.isLoading;
export const selectIssuesError = (state: RootState) => state.issues.error;
