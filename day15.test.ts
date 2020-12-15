/* === TYPES === */

type Memory = Map<number, { at: number; diffToPrev: number | null }>;

/* === IMPLEMENTATION === */
export const vanEck = (N: number, starting: number[]): number => {
  const memory: Memory = new Map(
    starting.map((n, i) => [n, { at: i + 1, diffToPrev: null }])
  );

  let prev = -Infinity;

  for (let i = starting.length + 1; i <= N; i++) {
    prev = memory.get(prev)?.diffToPrev ?? 0;

    const { at } = memory.get(prev) ?? {};
    memory.set(prev, { at: i, diffToPrev: at ? i - at : null });
  }

  return prev;
};

/* === TESTS === */

test("Day 15a - test", () => {
  expect(vanEck(2020, [0, 3, 6])).toBe(436);
});

test("Day 15a - prod", () => {
  expect(vanEck(2020, [9, 19, 1, 6, 0, 5, 4])).toBe(1522);
});

test("Day 15b - prod", () => {
  expect(vanEck(30000000, [9, 19, 1, 6, 0, 5, 4])).toBe(18234);
});
