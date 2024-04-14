import { Store, configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, test } from "vitest";
import { issuesReducer, issuesReducerPath } from "../../store";
import { render, screen, within } from "@testing-library/react";
import { Provider } from "react-redux";
import Board from "../Board";

describe("test Board component", () => {
  let store: Store;
  const repoId = "test_test";

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [issuesReducerPath]: issuesReducer,
      },
      preloadedState: {
        issues: {
          data: {
            [`${repoId}_todo`]: [
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
            [`${repoId}_in_progress`]: [
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
            [`${repoId}_done`]: [
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
          },
          error: null,
          isLoading: false,
        },
      },
    });
  });

  test("should render columns and issues", () => {
    render(
      <Provider store={store}>
        <Board repoId={repoId} />
      </Provider>
    );

    const todoColumn = screen.getByTestId(`${repoId}_todo`);
    expect(todoColumn).toBeInTheDocument();
    expect(within(todoColumn).getByTestId(1)).toBeInTheDocument();
    
    const inProgressColumn = screen.getByTestId(`${repoId}_in_progress`);
    expect(inProgressColumn).toBeInTheDocument();
    expect(within(inProgressColumn).getByTestId(2)).toBeInTheDocument();

    const doneColumn = screen.getByTestId(`${repoId}_done`);
    expect(doneColumn).toBeInTheDocument();
    expect(within(doneColumn).getByTestId(3)).toBeInTheDocument();
  });
});
