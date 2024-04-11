import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Issue, GuthubIssueState } from "../types";
import { RootState } from "../../../app/store";
import { getRepoId } from "../../../utils";
import { getIssueStatus, getIssuesKey } from "../utils";

type GuthubIssue = Issue & {
  state: GuthubIssueState;
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

      const issues: GuthubIssue[] = await response.json();
      const repoId = getRepoId({ owner, repo });
      return { issues, repoId };
    } catch {
      rejectWithValue("Failed to fetch issues");
    }
  }
);

type State = {
  isLoading: boolean;
  error: string | null;
  data: Record<string, Issue[]>;
};

export const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    error: null,
    isLoading: false,
    data: {},
  } as State,
  reducers: {
    changeIssueStatus: (
      state,
      action: PayloadAction<{ from: string; to: string; id: number }>
    ) => {
      const { from, id, to } = action.payload;
      const fromIssues = state.data[from];
      const toIssues = state.data[to];
      const issueToUpdate = fromIssues.find((issue) => issue.id === id);

      if (!issueToUpdate) {
        return;
      }

      state.data[from] = fromIssues.filter((issue) => issue.id !== id);
      state.data[to] = [issueToUpdate, ...toIssues];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!action.payload) return;
      const { issues, repoId } = action.payload;

      const todoKey = getIssuesKey({ repoId, status: "todo" });
      const inProgressKey = getIssuesKey({ repoId, status: "in_progress" });
      const doneKey = getIssuesKey({ repoId, status: "done" });

      state.data[todoKey] = [];
      state.data[inProgressKey] = [];
      state.data[doneKey] = [];

      issues.forEach((issue) => {
        const status = getIssueStatus({
          assignee: issue.assignee,
          status: issue.state,
        });

        const key = getIssuesKey({ status, repoId });
        const set = new Set(state.data[key]);
        const newIssue = {
          id: issue.id,
          title: issue.title,
          comments: issue.comments,
          created_at: issue.created_at,
          number: issue.number,
          user: issue.user,
        };

        if (!set.has(newIssue)) {
          state.data[key].push(newIssue);
        }
      });
    });

    builder.addCase(fetchIssues.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });
  },
});

export const { changeIssueStatus } = issuesSlice.actions;

export const selectIssuesStatus = (state: RootState) => state.issues.isLoading;
export const selectIssuesError = (state: RootState) => state.issues.error;
export const selectIssuesByKey = createSelector(
  (state: RootState) => state.issues.data,
  (_: RootState, issuesKey: string) => issuesKey,
  (issues, issuesKey) => issues[issuesKey]
);
