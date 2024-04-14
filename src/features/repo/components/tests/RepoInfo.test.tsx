import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RepoInfo from "../RepoInfo";
import { describe, expect, test } from "vitest";
import { repoReducer, repoReducerPath } from "../../store";

describe("test RepoInfo component", () => {
  test("renders correctly when loading", () => {
    const store = configureStore({
      reducer: {
        [repoReducerPath]: repoReducer,
      },
      preloadedState: {
        repos: {
          isLoading: true,
          error: null,
          repo: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <RepoInfo />
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders correctly when there is an error", () => {
    const store = configureStore({
      reducer: {
        [repoReducerPath]: repoReducer,
      },
      preloadedState: {
        repos: {
          isLoading: false,
          error: "Network error",
          repo: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <RepoInfo />
      </Provider>
    );

    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  test("renders correctly when there is a repo", () => {
    const store = configureStore({
      reducer: {
        [repoReducerPath]: repoReducer,
      },
      preloadedState: {
        repos: {
          isLoading: false,
          error: null,
          repo: {
            owner: {
              login: "test",
              html_url: "https://github.com/test",
            },
            name: "test-repo",
            html_url: "https://github.com/test/test-repo",
            stargazers_count: 1000,
            id: "1",
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <RepoInfo />
      </Provider>
    );

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("1 k stars")).toBeInTheDocument();
  });
});
