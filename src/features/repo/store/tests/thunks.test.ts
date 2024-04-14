import { Mock, describe, expect, test, vi } from "vitest";
import { fetchRepo } from "../thunks";
import { fetchIssues } from "../../../issues";

global.fetch = vi.fn();

describe("test fetchRepo thunk", () => {
  test("should handle resolved response", async () => {
    const mockRepo = {
      id: "test_test",
      name: "test repo",
      owner: {
        login: "login",
        html_url: "html_url",
      },
      stargazers_count: 1,
      html_url: "html_url",
    };

    // eslint-disable-next-line
    (fetch as Mock<any, unknown>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });

    const dispatch = vi.fn();
    const thunk = fetchRepo({ owner: "test", repo: "test" });

    await thunk(dispatch, () => ({}), {});

    const calls = dispatch.mock.calls;
    expect(calls).toHaveLength(2);

    const [repoPending, repoFulfilled] = calls;

    expect(repoPending[0].type).toBe(fetchRepo.pending.type);
    expect(repoFulfilled[0].type).toBe(fetchRepo.fulfilled.type);
    expect(repoFulfilled[0].payload).toEqual({ repo: mockRepo });
  });

  test("should call fetchIssues when has_issues is true", async () => {
    const mockRepo = {
      id: "test_test",
      name: "test repo",
      owner: {
        login: "login",
        html_url: "html_url",
      },
      stargazers_count: 1,
      html_url: "html_url",
      has_issues: true,
    };

    // eslint-disable-next-line
    (fetch as Mock<any, unknown>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });

    const dispatch = vi.fn();
    const repoThunk = fetchRepo({ owner: "test", repo: "test" });

    await repoThunk(dispatch, () => ({}), {});

    const calls = dispatch.mock.calls;
    expect(calls).toHaveLength(3);

    const [repoPending, issuesFulfilled, repoFulfilled] = calls;

    expect(repoPending[0].type).toBe(fetchRepo.pending.type);

    const issuesThunk = issuesFulfilled[0] as unknown as ReturnType<
      typeof fetchIssues
    >;
    const issuesAction = await issuesThunk(
      () => {},
      () => {},
      {}
    );
    expect(issuesAction.type).toEqual("issues/fetch/fulfilled");
    expect(issuesAction.meta.arg).toEqual({ repo: "test", owner: "test" });

    expect(repoFulfilled[0].type).toBe(fetchRepo.fulfilled.type);
    expect(repoFulfilled[0].payload).toEqual({
      repo: {
        id: "test_test",
        name: "test repo",
        owner: {
          login: "login",
          html_url: "html_url",
        },
        stargazers_count: 1,
        html_url: "html_url",
      },
    });
  });

  test("should handle rejected response", async () => {
    // eslint-disable-next-line
    (fetch as Mock<any, unknown>).mockResolvedValue({
      ok: false,
    });

    const dispatch = vi.fn();
    const thunk = fetchRepo({ owner: "test", repo: "test" });

    await thunk(dispatch, () => ({}), {});

    const calls = dispatch.mock.calls;
    expect(calls).toHaveLength(2);

    const [repoPending, repoFulfilled] = calls;

    expect(repoPending[0].type).toBe(fetchRepo.pending.type);
    expect(repoFulfilled[0].type).toBe(fetchRepo.rejected.type);
    expect(repoFulfilled[0].payload).toBe("Failed to fetch repository");
  });
});
