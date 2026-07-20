import { afterEach, describe, expect, it, vi } from "vitest";

import type { TflArrival } from "@/lib/tfl";

import { getArrivalsRefetchInterval, getBoardRowCount } from "./utils";

const NOW = new Date("2026-07-20T12:00:00Z");

const expiredArrival: TflArrival = {
  id: "expired",
  destinationName: "Brixton Underground Station",
  expectedArrival: "2026-07-20T11:59:00Z",
};

describe("getArrivalsRefetchInterval", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("refreshes quickly when the earliest prediction has expired", () => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);

    expect(getArrivalsRefetchInterval([expiredArrival])).toBe(1_000);
  });

  it("backs off when the latest refresh failed", () => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);

    expect(getArrivalsRefetchInterval([expiredArrival], true)).toBe(90_000);
  });
});

describe("getBoardRowCount", () => {
  it("keeps the configured minimum for fixed-size boards", () => {
    expect(getBoardRowCount(1, 10)).toBe(3);
    expect(getBoardRowCount(5, 10)).toBe(5);
  });

  it("reserves a warning slot while displaying every arrival", () => {
    expect(getBoardRowCount(0, 1)).toBe(3);
    expect(getBoardRowCount(0, 5)).toBe(6);
  });
});
