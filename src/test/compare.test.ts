import { describe, expect, it } from "vitest";
import { toggleComparison } from "@/lib/compare";

describe("comparison selection", () => {
  it("adds and removes properties", () => {
    expect(toggleComparison(["one"], "two")).toEqual(["one", "two"]);
    expect(toggleComparison(["one", "two"], "one")).toEqual(["two"]);
  });

  it("never exceeds three properties", () => {
    expect(toggleComparison(["one", "two", "three"], "four")).toEqual(["one", "two", "three"]);
  });
});
