/* === TYPES === */
type World = Set<string>;

type Point = number[];

type GetNeighbours = (point: string | Point) => Point[];
/* === PREPARE INPUT === */

export const prepareInput = ([input]: TemplateStringsArray) =>
  input.split("\n").map((line) => line.split(""));

/* === UTILS === */
const ROUND = [-1, 0, 1];

const cartesian = <T>(...sets: T[][]) =>
  sets.reduce((acc, set) => acc.flatMap((x) => set.map((y) => [...x, y])), [
    [],
  ] as T[][]);

const getActive = (dim: number, input: string[][]) => {
  const world: World = new Set();

  input.forEach((column, x) =>
    column.forEach((point, y) => {
      if (point === "#") world.add(`${x},${y}${",0".repeat(dim - 2)}`);
    })
  );

  return world;
};

const neighbours3 = cartesian(ROUND, ROUND, ROUND).filter(
  (point) => !point.every((x) => x === 0)
);

const getNeighbours3: GetNeighbours = (point) => {
  const [x, y, z] =
    typeof point === "string" ? point.split(",").map(Number) : point;
  return neighbours3.map(([dx, dy, dz]) => [x + dx, y + dy, z + dz]);
};

const neighbours4 = cartesian(ROUND, ROUND, ROUND, ROUND).filter(
  (point) => !point.every((x) => x === 0)
);

const getNeighbours4: GetNeighbours = (point) => {
  const [x, y, z, w] =
    typeof point === "string" ? point.split(",").map(Number) : point;
  return neighbours4.map(([dx, dy, dz, dw]) => [
    x + dx,
    y + dy,
    z + dz,
    w + dw,
  ]);
};

/* === IMPLEMENTATION === */
const nextWorld = (getNeighbours: GetNeighbours) => (world: World): World =>
  new Set(
    [...world]
      .flatMap(getNeighbours)
      .filter((point) => {
        const activeNeighbours = getNeighbours(point).filter((x) =>
          world.has(x.join(","))
        ).length;

        if (
          world.has(point.join(",")) &&
          (activeNeighbours === 2 || activeNeighbours === 3)
        )
          return true;
        if (!world.has(point.join(",")) && activeNeighbours === 3) return true;

        return false;
      })
      .map((x) => x.join(","))
  );

/* === TESTS === */

test("Day 17a - test", () => {
  const result = Array(6)
    .fill(0)
    .reduce(nextWorld(getNeighbours3), getActive(3, testInput));

  expect(result.size).toBe(112);
});

test("Day 17a - prod", () => {
  const result = Array(6)
    .fill(0)
    .reduce(nextWorld(getNeighbours3), getActive(3, prodInput));

  expect(result.size).toBe(346);
});

test("Day 17b - test", () => {
  const result = Array(6)
    .fill(0)
    .reduce(nextWorld(getNeighbours4), getActive(4, testInput));

  expect(result.size).toBe(848);
});

test("Day 17b - prod", () => {
  const result = Array(6)
    .fill(0)
    .reduce(nextWorld(getNeighbours4), getActive(4, prodInput));

  expect(result.size).toBe(1632);
});

/* === INPUTS === */

const testInput = prepareInput`.#.
..#
###`;

const prodInput = prepareInput`...#.#.#
..#..#..
#.#.##.#
###.##..
#####.##
#.......
#..#..##
...##.##`;
