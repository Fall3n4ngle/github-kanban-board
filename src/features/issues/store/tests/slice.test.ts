import { expect, test, describe } from "vitest";
import { fetchIssues } from "../thunks";
import { changeIssueStatus, issuesReducer, swapIssues } from "../slice";

describe("test issues slice's extraReducers", () => {
  const initialState = {
    error: null,
    isLoading: false,
    data: {},
  };

  test("should handle fetch issues pending", () => {
    const action = { type: fetchIssues.pending.type };
    const state = issuesReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test("should handle fetch issues fulfilled", () => {
    const payload = {
      repoId: "test_repo",
      issues: [
        {
          id: 1,
          title: "issue 1",
          comments: 1,
          created_at: "",
          number: 1,
          state: "open",
          assignee: null,
          html_url: "test url",
          user: {
            login: "user1",
          },
        },
        {
          id: 2,
          title: "issue 2",
          comments: 2,
          created_at: "",
          state: "open",
          assignee: {},
          number: 2,
          html_url: "test url",
          user: {
            login: "user2",
          },
        },
        {
          id: 3,
          title: "issue 3",
          comments: 3,
          created_at: "",
          state: "closed",
          assignee: null,
          number: 3,
          html_url: "test url",
          user: {
            login: "user3",
          },
        },
      ],
    };

    const action = { type: fetchIssues.fulfilled.type, payload };
    const state = issuesReducer(initialState, action);

    expect(state.data).toEqual({
      test_repo_todo: [
        {
          id: 1,
          title: "issue 1",
          comments: 1,
          created_at: "",
          number: 1,
          html_url: "test url",
          user: {
            login: "user1",
          },
        },
      ],
      test_repo_in_progress: [
        {
          id: 2,
          title: "issue 2",
          comments: 2,
          created_at: "",
          number: 2,
          html_url: "test url",
          user: {
            login: "user2",
          },
        },
      ],
      test_repo_done: [
        {
          id: 3,
          title: "issue 3",
          comments: 3,
          created_at: "",
          number: 3,
          html_url: "test url",
          user: {
            login: "user3",
          },
        },
      ],
    });
  });

  test("should handle fetch issues error", () => {
    const action = { type: fetchIssues.rejected.type, payload: "Error" };
    const state = issuesReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("test issues slice's reducers", () => {
  const created_at = new Date();

  const initialState = {
    isLoading: false,
    error: null,
    data: {
      test_repo_todo: [
        {
          id: 1,
          title: "issue 1",
          comments: 1,
          created_at,
          number: 1,
          html_url: "test url",
          user: {
            login: "user1",
          },
        },
      ],
      test_repo_in_progress: [
        {
          id: 2,
          title: "issue 2",
          comments: 2,
          created_at,
          number: 2,
          html_url: "test url",
          user: {
            login: "user2",
          },
        },
      ],
      test_repo_done: [
        {
          id: 3,
          title: "issue 3",
          comments: 3,
          created_at,
          number: 3,
          html_url: "test url",
          user: {
            login: "user3",
          },
        },
        {
          id: 4,
          title: "issue 3",
          comments: 3,
          created_at,
          number: 3,
          html_url: "test url",
          user: {
            login: "user3",
          },
        },
      ],
    },
  };

  test("should change issue status", () => {
    const action = {
      type: changeIssueStatus.type,
      payload: { from: "test_repo_todo", to: "test_repo_done", id: 1 },
    };

    const state = issuesReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      data: {
        test_repo_todo: [],
        test_repo_in_progress: [
          {
            id: 2,
            title: "issue 2",
            comments: 2,
            created_at,
            number: 2,
            html_url: "test url",
            user: {
              login: "user2",
            },
          },
        ],
        test_repo_done: [
          {
            id: 1,
            title: "issue 1",
            comments: 1,
            created_at,
            number: 1,
            html_url: "test url",
            user: {
              login: "user1",
            },
          },
          {
            id: 3,
            title: "issue 3",
            comments: 3,
            created_at,
            number: 3,
            html_url: "test url",
            user: {
              login: "user3",
            },
          },
          {
            id: 4,
            title: "issue 3",
            comments: 3,
            created_at,
            number: 3,
            html_url: "test url",
            user: {
              login: "user3",
            },
          },
        ],
      },
    });
  });

  test("should swap issues", () => {
    const action = {
      type: swapIssues.type,
      payload: { issuesKey: "test_repo_done", index1: 0, index2: 1 },
    };

    const state = issuesReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      data: {
        test_repo_todo: [
          {
            id: 1,
            title: "issue 1",
            comments: 1,
            created_at,
            number: 1,
            html_url: "test url",
            user: {
              login: "user1",
            },
          },
        ],
        test_repo_in_progress: [
          {
            id: 2,
            title: "issue 2",
            comments: 2,
            created_at,
            number: 2,
            html_url: "test url",
            user: {
              login: "user2",
            },
          },
        ],
        test_repo_done: [
          {
            id: 4,
            title: "issue 3",
            comments: 3,
            created_at,
            number: 3,
            html_url: "test url",
            user: {
              login: "user3",
            },
          },
          {
            id: 3,
            title: "issue 3",
            comments: 3,
            created_at,
            number: 3,
            html_url: "test url",
            user: {
              login: "user3",
            },
          },
        ],
      },
    });
  });
});
