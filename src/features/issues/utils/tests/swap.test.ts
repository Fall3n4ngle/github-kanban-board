import { describe, it, expect } from "vitest";
import { swap } from "../swap";

describe("swap", () => {
  it("should swap the elements at the given indices", () => {
    const arr = [1, 2, 3, 4, 5];
    const swapped = swap(arr, 0, 4);
    expect(swapped).toEqual([5, 2, 3, 4, 1]);
  });

  it("should not mutate the original array", () => {
    const arr = [1, 2, 3, 4, 5];
    const swapped = swap(arr, 0, 4);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
    expect(swapped).not.toBe(arr);
  });

  it("should handle swapping with the same index", () => {
    const arr = [1, 2, 3, 4, 5];
    const swapped = swap(arr, 2, 2);
    expect(swapped).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return a copy of the original array when indices are out of bounds", () => {
    const arr = [1, 2, 3, 4, 5];
    const swapped = swap(arr, -1, 10);
    expect(swapped).toEqual([1, 2, 3, 4, 5]);
  });
});
