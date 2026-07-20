import { afterEach, describe, expect, it, vi } from "vitest";

import type { TflArrival } from "@/lib/tfl";

import { getArrivalsRefetchInterval } from "./utils";

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
