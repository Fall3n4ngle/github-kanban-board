import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

export const selectIssuesStatus = (state: RootState) => state.issues.isLoading;
export const selectIssuesError = (state: RootState) => state.issues.error;
export const selectIssuesByKey = createSelector(
  (state: RootState) => state.issues.data,
  (_: RootState, issuesKey: string) => issuesKey,
  (issues, issuesKey) => issues[issuesKey]
);
