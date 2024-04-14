import { repoReducer, repoReducerPath } from "@/features/repo";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";
import Issues from "../Issues";
import { issuesReducer, issuesReducerPath } from "../../store";

describe("test Issues component", () => {
  test("should return message if there is no repo", () => {
    const store = configureStore({
      reducer: {
        [repoReducerPath]: repoReducer,
        [issuesReducerPath]: issuesReducer,
      },
    });

    render(
      <Provider store={store}>
        <Issues />
      </Provider>
    );

    expect(
      screen.getByText("Enter repo url to load issues")
    ).toBeInTheDocument();
  });

  test("should render issues error", () => {
    const store = configureStore({
      reducer: {
        [repoReducerPath]: repoReducer,
        [issuesReducerPath]: issuesReducer,
      },
      preloadedState: {
        issues: {
          error: "Test error",
          data: {},
          isLoading: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <Issues />
      </Provider>
    );

    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  test("should render loader on loading state", () => {
    const store = configureStore({
      reducer: {
        [repoReducerPath]: repoReducer,
        [issuesReducerPath]: issuesReducer,
      },
      preloadedState: {
        issues: {
          error: null,
          data: {},
          isLoading: true,
        },
      },
    });

    render(
      <Provider store={store}>
        <Issues />
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("should render board if there is repo", () => {
    const repoId = "test_test";

    const store = configureStore({
      reducer: {
        [repoReducerPath]: repoReducer,
        [issuesReducerPath]: issuesReducer,
      },
      preloadedState: {
        issues: {
          error: null,
          data: {
            [`${repoId}_todo`]: [],
            [`${repoId}_in_progress`]: [],
            [`${repoId}_done`]: [],
          },
          isLoading: false,
        },
        repos: {
          error: null,
          isLoading: false,
          repo: {
            html_url: "",
            id: repoId,
            name: "",
            owner: {
              html_url: "",
              login: "",
            },
            stargazers_count: 1,
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Issues />
      </Provider>
    );

    expect(screen.getByTestId("board")).toBeInTheDocument();
  });
});
