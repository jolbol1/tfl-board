import { describe, expect, it } from "vitest";

import { parseTflArrivals } from "./tfl";

describe("parseTflArrivals", () => {
  it("keeps valid arrivals and optional display fields", () => {
    expect(
      parseTflArrivals([
        {
          id: "arrival-1",
          destinationName: "Brixton Underground Station",
          expectedArrival: "2026-07-20T12:00:00Z",
          lineName: "Victoria",
          platformName: "Southbound",
          currentLocation: "At Oxford Circus",
        },
      ])
    ).toEqual([
      {
        id: "arrival-1",
        destinationName: "Brixton Underground Station",
        expectedArrival: "2026-07-20T12:00:00Z",
        lineName: "Victoria",
        platformName: "Southbound",
        currentLocation: "At Oxford Circus",
      },
    ]);
  });

  it("drops records without the fields needed to render them", () => {
    expect(
      parseTflArrivals([
        { destinationName: "Brixton", expectedArrival: "2026-07-20T12:00:00Z" },
        { id: "arrival-2", expectedArrival: "2026-07-20T12:00:00Z" },
        { id: "arrival-3", destinationName: "Brixton", expectedArrival: "invalid" },
      ])
    ).toEqual([]);
  });

  it("rejects an invalid top-level response", () => {
    expect(() => parseTflArrivals({ arrivals: [] })).toThrow(
      "TfL arrivals response was not an array"
    );
  });
});
