import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIssues } from "@/features/issues";
import { getRepoId } from "@/utils";

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

export const fetchRepo = createAsyncThunk(
  "repos/fetch",
  async (
    { owner, repo }: { owner: string; repo: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
          },
        }
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
      return rejectWithValue("Failed to fetch repository");
    }
  }
);
