import { createAsyncThunk } from "@reduxjs/toolkit";
import { GuthubIssueState, Issue } from "../types";
import { getRepoId } from "../../../utils";

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