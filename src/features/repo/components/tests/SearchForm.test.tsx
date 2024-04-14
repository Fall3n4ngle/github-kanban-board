import { Store, configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fetchRepo, repoReducer, repoReducerPath } from "../../store";
import { Provider } from "react-redux";
import SearchForm from "../SearchForm";
import { fireEvent, render } from "@testing-library/react";

describe("test SearchForm component", () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [repoReducerPath]: repoReducer,
      },
    });
  });

  test("renders input and submit button", () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    expect(getByPlaceholderText("Enter repo url")).toBeInTheDocument();
    expect(getByText("Load issues")).toBeInTheDocument();
  });

  test("dispatches fetchRepo action on form submit", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    const spy = vi.spyOn(store, "dispatch");

    const input = getByPlaceholderText("Enter repo url");
    fireEvent.change(input, {
      target: { value: "https://github.com/user/repo" },
    });

    const button = getByText("Load issues");
    fireEvent.click(button);

    const thunk = spy.mock.calls[0][0] as unknown as ReturnType<
      typeof fetchRepo
    >;

    const action = await thunk(store.dispatch, store.getState, {});
    expect(action.type.indexOf("repos/fetch")).toBe(0);
    expect(action.meta.arg).toEqual({ owner: "user", repo: "repo" });
  });
});
