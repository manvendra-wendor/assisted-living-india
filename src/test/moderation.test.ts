import { describe, expect, it } from "vitest";
import { canModerateTransition } from "@/lib/moderation";

describe("moderation transitions", () => {
  it("allows review publication after pending moderation", () => expect(canModerateTransition("pending", "published")).toBe(true));
  it("does not silently republish an archived record", () => expect(canModerateTransition("archived", "published")).toBe(false));
  it("allows a rejected record to return to pending", () => expect(canModerateTransition("rejected", "pending")).toBe(true));
});
