import { describe } from "node:test";
import { expect, test } from "vitest";
import { getRepoDetails } from "../getRepoDetails";

describe("test getRepoDetails function", () => {
  test("should return repo details if correct repo url is passed", () => {
    const validUrl = "https://github.com/owner/repo";

    expect(getRepoDetails(validUrl)).toEqual({
      owner: "owner",
      repo: "repo",
    });
  });

  test("should return null if incorrect repo url is passed", () => {
    const invalidUrl = "https://notgithub.com/owner/repo";
    expect(getRepoDetails(invalidUrl)).toBeNull();
  });
});
