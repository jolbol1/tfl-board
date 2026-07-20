import { describe, expect, it } from "vitest";

import { MAX_BOARD_ROWS, normalizeBoardSize } from "./board-size";

describe("normalizeBoardSize", () => {
  it("keeps zero and row counts within the supported range", () => {
    expect(normalizeBoardSize(0, 3)).toBe(0);
    expect(normalizeBoardSize("12", 3)).toBe(12);
  });

  it("clamps oversized row counts", () => {
    expect(normalizeBoardSize(MAX_BOARD_ROWS + 1, 3)).toBe(MAX_BOARD_ROWS);
  });

  it("uses the fallback for invalid row counts", () => {
    expect(normalizeBoardSize(-1, 3)).toBe(3);
    expect(normalizeBoardSize(1.5, 3)).toBe(3);
    expect(normalizeBoardSize("many", 3)).toBe(3);
  });
});
