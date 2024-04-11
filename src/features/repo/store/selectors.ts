import { RootState } from "../../../app/store";

export const selectRepoStatus = (state: RootState) => state.repos.isLoading;
export const selectRepoError = (state: RootState) => state.repos.error;
export const selectRepo = (state: RootState) => state.repos.repo;
