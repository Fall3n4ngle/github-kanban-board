import { RootState } from "@/app/store";

export const selectIssuesStatus = (state: RootState) => state.issues.isLoading;
export const selectIssuesError = (state: RootState) => state.issues.error;
export const selectIssuesByKey = (state: RootState, issuesKey: string) =>
  state.issues.data[issuesKey];
