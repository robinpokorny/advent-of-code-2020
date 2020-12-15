/* === IMPLEMENTATION === */
export const vanEck = (N: number, starting: number[]): number => {
  const memory = new Map(starting.map((v, i) => [v, i]));

  let prev = -Infinity;

  for (let i = starting.length; i < N; i++) {
    const prevIndex = memory.get(prev);
    memory.set(prev, i - 1);

    prev = prevIndex != null ? i - 1 - prevIndex : 0;
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
