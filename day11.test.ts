/* === TYPES === */
enum Seat {
  floor = ".",
  empty = "L",
  occupied = "#",
}

type World = Readonly<Seat[][]>;

type GetNeighbours = (world: World, x: number, y: number) => Seat[];

/* === PREPARE INPUT === */

export const prepareInput = ([input]: TemplateStringsArray): World =>
  input.split("\n").map((line) => line.split("") as Seat[]);

/* === UTILS === */

// prettier-ignore
const neighbours = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1], /*0, 0*/ [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1],
];
const getDirectNeighbours: GetNeighbours = (world, x, y) =>
  neighbours.map(([dx, dy]) => world[x + dx]?.[y + dy] || Seat.floor);

const getFirstInSight: GetNeighbours = (world, x, y) =>
  neighbours.map(([dx, dy]) => {
    let steps = 1;

    while (true) {
      const [gx, gy] = [x + dx * steps, y + dy * steps];

      if (!world[gx]?.[gy]) {
        return Seat.floor;
      }

      if (world[gx][gy] !== Seat.floor) {
        return world[gx][gy];
      }

      steps++;
    }
  });

const countOccupied = (seats: Seat[]): number =>
  seats.filter((seat) => seat === Seat.occupied).length;

const countOccupiedInWorld = (world: World): number =>
  countOccupied(world.flat());

const runSeat = (
  world: World,
  seat: Seat,
  x: number,
  y: number,
  leaveAt: number,
  getNeighbours: GetNeighbours
): Seat => {
  if (seat === Seat.floor) return Seat.floor;

  const occupiedNeighbours = countOccupied(getNeighbours(world, x, y));

  if (seat === Seat.empty && occupiedNeighbours === 0) return Seat.occupied;

  if (seat === Seat.occupied && occupiedNeighbours >= leaveAt)
    return Seat.empty;

  return seat;
};

const run = (
  world: World,
  leaveAt: number,
  getNeighbours: GetNeighbours
): World =>
  world.map((row, i) =>
    row.map((seat, j) => runSeat(world, seat, i, j, leaveAt, getNeighbours))
  );

/* === IMPLEMENTATION === */
const occupiedWhenStable = (
  world: World,
  leaveAt: number = 4,

  getNeighbours: GetNeighbours = getDirectNeighbours
): number => {
  let prev: World = [[]];

  do {
    prev = world;
    world = run(world, leaveAt, getNeighbours);
  } while (countOccupiedInWorld(world) !== countOccupiedInWorld(prev));

  return countOccupiedInWorld(world);
};

/* === TESTS === */

test("Day <day>a - test", () => {
  const result = occupiedWhenStable(testInput);

  expect(result).toBe(37);
});

test.skip("Day <day>a - prod", () => {
  const result = occupiedWhenStable(prodInput);

  expect(result).toBe(2275);
});

test("Day <day>b - test", () => {
  const result = occupiedWhenStable(testInput, 5, getFirstInSight);

  expect(result).toBe(26);
});

test("Day <day>b - prod", () => {
  const result = occupiedWhenStable(prodInput, 5, getFirstInSight);

  expect(result).toBe(26);
});

/* === INPUTS === */

const testInput = prepareInput`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const prodInput = prepareInput`LLLLLLLLL.LLLL.LLLLL.LLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLL..LLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLL.L
LLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL
......L.LL.....L.L..L.....L.L..LL.L.LL.L...L..L..............L..L......LL.....LL...L.L.....
LLLLLLLLL.LLLL.LLLLLLLLLLLL.LLLLLLLLLLLLL..LLLLLLLLLLLL.LLLLLLLL.LLLLLLLL..LLLLLLL.LLLLLLLL
LLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLL.LLL.LLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL..LLL.LLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
...L..L....LL.L.L......LLLLL.....LL....L.......L.LL.L.L.L..LL...LLLLLL.LL........L.L.......
LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLL
.LLLLLLLL.LLLL..LLLL.LLLLLL.LLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLL.LLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLL.LL.LLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLL.LL.LLLLLLL.LLLLLLLL
LLLLLLLLL.L.LL.LLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLLLLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
......L.L..L.L...LLL.....L.L..L......LL...L..L..L.L......L.L..L....LLLL....L..L....L.L..L.L
LLLLLL.LL.LLLLLLLLLL.LLLLLL.LLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLL.LLL.LLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLL
LLLL.LLLL.LLLLLLLLL..LLLLLLLLLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLLLLLLL.LLL.LLLLLLLLLLL.LLL.LL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLLLLLLLLL.LL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLL.LLLL.LLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.L.LL.LLLLL.LLLLLL.LLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
.LLL......L........L.....L..LL.L..L..L.L....L.L............L...........LLL..L..LL....LL..L.
LLLLLLLLLLLLLL.LLLLL.LLLLLL.LLLLLLLL.LLLL.LLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLLLLLLLLLLLLL..LLLLLLLLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLL.L.LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL
.......LL..L.LLL.L....L..L....L......L..L...LL...L.L...LL....L.L........L...L...L.L.......L
LLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLLLLLLL..LLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLL.LL.LLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
.L..LLL.L....LL.L..L..LL..L.LL.L......L........LLL.....L..LL...L.LL.LL.....L....L..LL.L....
LLLLLLLLLLL.LL.LLL.LLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLLLLLLLLL.LLLLLLLL.LLLLLL.LLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLLLLL..LLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL
L..L.LL....L..LL.L.....L.....L...L..L..L...L....L.L.L..LL.L......L...L......L....L.....L.L.
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLL.LLLL.LLLLLL.LLLLLLLLLLLLLLL..LLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.L.LLL.LLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLL.L.LLLLL.LLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL
.L..L.L...LLL.LL.L.L...L........LLLLL.L..L......L.....L....L.LL.L.LLL...LL..LL.LL..LL.....L
LLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLL.LLLLLLLL..LLLLLLL.LLLLLLLL
..L.L..L...L..L.L........L.L.LLL..L.L...LLL..L..........L........L....LLLL.LL...L......LL..
LLLLLLLLL.LLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLLL.LLLLLL.LLLLLLLL.LLLLLLLL..LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLL.LLL
LLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLL.LL.LLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL
....LL.L..L...LL......L.....L..LL.L.......LL...L....LLLLL..L..L.LLL.......LL..LL...LL.....L
LLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLL.L.LLLLLL
LLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLL.L.LLLL.LLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLL.LLLLLLL.
.L.LL..L.LLL.L...L.......L..LLL.....L...LL...LLL...L.LL............L.L....LL.....L.L..LL..L
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLL.LLLL.LLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLL.LLLLL
LLLLLLLLL.LLLL.LLLLL.L.L.LLLLLLLLLLL.LLLL.L.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLL.LLLLLLLLLL.L.LLLLLLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLLLLLLL.LLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLL..L....L.LL..L.L.LLL.LL..L.......L.LL..L..L....L..L...L...L.L..L.L.L.L.L.L.LLL.L.....L.L
LLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLL.LL.LLLLL
LLLLLLLLL.LLLL.LLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLLLLLLLLLLLLL.LLLLLL.LL.LLLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLL.LLLLLLLLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLLLLLL.LLLL.LLLLLL.LLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL
.L..L..LL.L..L..L.L.L.LL..L....L.....L.LL..........L..L...LLL.L....LL...LL...L.LL.L.....LL.
LLLL.LLLL.LLLL.LLLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLL
LLLLLLLLL.LLLLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLLL.LLL.LLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL.LL.L.LLLLLL.LL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL
LLLLLLLLL.LLLL..LLLL.LLLLLL.LLLLLLLL.LL.L.LLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLL
LLLLLLLLL.LLLL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLL
LLLLLLLLL.LLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LL.LLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL..LLLLLLLL
LLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLL.LLLLL`;