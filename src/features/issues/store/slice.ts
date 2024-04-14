import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Issue } from "../types";
import { getIssueStatus, getIssuesKey } from "../utils";
import { fetchIssues } from "./thunks";
import { swap } from "../../../utils";

export type State = {
  isLoading: boolean;
  error: string | null;
  data: Record<string, Issue[]>;
};

const issuesSlice = createSlice({
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
    swapIssues: (
      state,
      action: PayloadAction<{
        index1: number;
        index2: number;
        issuesKey: string;
      }>
    ) => {
      const { index1, index2, issuesKey } = action.payload;
      state.data[issuesKey] = swap(state.data[issuesKey], index1, index2);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      if (!action.payload) return;
      const { issues, repoId } = action.payload;

      const todoKey = getIssuesKey({ repoId, status: "todo" });
      const inProgressKey = getIssuesKey({ repoId, status: "in_progress" });
      const doneKey = getIssuesKey({ repoId, status: "done" });

      if (!state.data[todoKey]) {
        state.data[todoKey] = [];
      }

      if (!state.data[inProgressKey]) {
        state.data[inProgressKey] = [];
      }
      
      if (!state.data[doneKey]) {
        state.data[doneKey] = [];
      }

      const sets = {
        [todoKey]: new Set(state.data[todoKey].map((i) => i.id)),
        [inProgressKey]: new Set(state.data[inProgressKey].map((i) => i.id)),
        [doneKey]: new Set(state.data[doneKey].map((i) => i.id)),
      };

      issues.forEach((issue) => {
        const status = getIssueStatus({
          assignee: issue.assignee,
          status: issue.state,
        });

        const key = getIssuesKey({ status, repoId });
        if (sets[key].has(issue.id)) return;

        const newIssue = {
          id: issue.id,
          title: issue.title,
          comments: issue.comments,
          created_at: issue.created_at,
          number: issue.number,
          user: issue.user,
          html_url: issue.html_url,
        };

        state.data[key].push(newIssue);
      });

      state.isLoading = false;
    });

    builder.addCase(fetchIssues.rejected, (state, { payload }) => {
      state.isLoading = false;
      if (!payload) return;
      state.error = payload as string;
    });
  },
});

export const { changeIssueStatus, swapIssues } = issuesSlice.actions;
export const { reducer: issuesReducer, reducerPath: issuesReducerPath } =
  issuesSlice;
