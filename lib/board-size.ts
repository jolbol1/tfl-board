export const MAX_BOARD_ROWS = 50;

export function normalizeBoardSize(value: unknown, fallback: number) {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    return fallback;
  }

  return Math.min(parsed, MAX_BOARD_ROWS);
}
