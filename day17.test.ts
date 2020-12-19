/* === TYPES === */
type World = Set<string>;

type Point = [number, number, number];
/* === PREPARE INPUT === */

export const prepareInput = ([input]: TemplateStringsArray) =>
  input.split("\n").map((line) => line.split(""));

/* === UTILS === */
const getActive = (input: string[][]) => {
  const world: World = new Set();

  input.forEach((column, x) =>
    column.forEach((point, y) => {
      if (point === "#") world.add(`${x},${y},0`);
    })
  );

  return world;
};

// prettier-ignore
const neighbours = [
  [-1, -1, -1], [-1, 0, -1], [-1, 1, -1],
  [ 0, -1, -1], [ 0, 0, -1], [ 0, 1, -1],
  [ 1, -1, -1], [ 1, 0, -1], [ 1, 1, -1],
  [-1, -1,  0], [-1, 0,  0], [-1, 1,  0],
  [ 0, -1,  0], /*0, 0,  0*/ [ 0, 1,  0],
  [ 1, -1,  0], [ 1, 0,  0], [ 1, 1,  0],
  [-1, -1,  1], [-1, 0,  1], [-1, 1,  1],
  [ 0, -1,  1], [ 0, 0,  1], [ 0, 1,  1],
  [ 1, -1,  1], [ 1, 0,  1], [ 1, 1,  1],
];

const getNeighbours = (point: string | Point): Point[] => {
  const [x, y, z] =
    typeof point === "string" ? point.split(",").map(Number) : point;
  return neighbours.map(([dx, dy, dz]) => [x + dx, y + dy, z + dz]);
};

/* === IMPLEMENTATION === */
const nextWorld = (world: World): World =>
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
  const result = Array(6).fill(0).reduce(nextWorld, getActive(testInput));
  expect(result.size).toBe(112);
});

test("Day 17a - prod", () => {
  const result = Array(6).fill(0).reduce(nextWorld, getActive(prodInput));
  expect(result.size).toBe(346);
});

test.skip("Day 17b - test", () => {});

test.skip("Day 17b - prod", () => {});

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
