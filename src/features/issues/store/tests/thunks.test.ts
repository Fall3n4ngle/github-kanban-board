import { describe, expect, test, vi } from "vitest";
import { fetchIssues } from "../thunks";

global.fetch = vi.fn();

describe("test fetch issues thunk", () => {
  test("should handle resolved response", async () => {
    const mockIssues = [
      {
        id: 1,
        title: "issue 1",
        comments: 1,
        created_at: "",
        number: 1,
        state: "open",
        assignee: null,
        user: {
          login: "user1",
        },
      },
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIssues),
    });

    const dispatch = vi.fn();
    const thunk = fetchIssues({ owner: "test", repo: "test" });

    await thunk(dispatch, () => ({}), {});

    const calls = dispatch.mock.calls;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchIssues.pending.type);
    expect(end[0].type).toBe(fetchIssues.fulfilled.type);
    expect(end[0].payload).toEqual({ issues: mockIssues, repoId: "test_test" });
  });

  test("should handle rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = vi.fn();
    const thunk = fetchIssues({ owner: "test", repo: "test" });

    await thunk(dispatch, () => ({}), {});

    const calls = dispatch.mock.calls;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchIssues.pending.type);
    expect(end[0].type).toBe(fetchIssues.rejected.type);
    expect(end[0].payload).toBe("Failed to fetch issues");
  })
});
