import { describe, expect, test } from "vitest";
import { fetchRepo } from "../thunks";
import { repoReducer } from "../slice";

describe("test repo's slice extraReducers", () => {
  const initialState = {
    isLoading: false,
    error: null,
    repo: null,
  };

  test("should handle fetch repo pending", () => {
    const action = { type: fetchRepo.pending.type };
    const state = repoReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test("should handle fetch repo fulfilled", () => {
    const action = {
      type: fetchRepo.fulfilled.type,
      payload: { repo: "test" },
    };

    const state = repoReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      repo: "test",
    });
  });

  test("should handle fetch repo error", () => {
    const action = { type: fetchRepo.rejected.type, payload: "Error" };
    const state = repoReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error: "Error",
    });
  });
});
