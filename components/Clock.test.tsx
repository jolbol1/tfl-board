import { describe, expect, it } from "vitest";

import { getTime } from "./Clock";

describe("getTime", () => {
  it("uses Greenwich Mean Time in winter", () => {
    expect(getTime(new Date("2026-01-15T12:34:56Z"))).toBe("12:34:56");
  });

  it("uses British Summer Time in summer", () => {
    expect(getTime(new Date("2026-07-20T12:34:56Z"))).toBe("13:34:56");
  });
});
