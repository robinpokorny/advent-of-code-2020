/* === TYPES === */
type Input = {
  time: number;
  busses: string[];
};

/* === PREPARE INPUT === */

export const prepareInput = ([input]: TemplateStringsArray): Input => {
  const [time, busses] = input.split("\n");
  console.log(busses);
  return {
    time: Number(time),
    busses: busses.split(","),
  };
};

/* === UTILS === */

/* === IMPLEMENTATION === */
const nextBus = (time: number, busses: string[]) => {
  const inService = busses.map(Number).filter(Boolean);

  const withNext = inService.map((bus) => {
    const at = Math.ceil(time / bus) * bus;
    const wait = at - time;

    return { bus, at, wait };
  });

  return withNext.sort(({ wait: waitA }, { wait: waitB }) => waitA - waitB)[0];
};

/* === TESTS === */

test("Day 13a - test", () => {
  const { time, busses } = testInput;

  const next = nextBus(time, busses);

  expect(next.bus).toBe(59);
  expect(next.at).toBe(944);

  expect(next.bus * next.wait).toBe(295);
});

test("Day 13a - prod", () => {
  const { time, busses } = prodInput;

  const next = nextBus(time, busses);

  expect(next.bus * next.wait).toBe(2305);
});

test.skip("Day 13b - test", () => {});

test.skip("Day 13b - prod", () => {});

/* === INPUTS === */

const testInput = prepareInput`939
7,13,x,x,59,x,31,19`;

const prodInput = prepareInput`1001287
13,x,x,x,x,x,x,37,x,x,x,x,x,461,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,739,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,x,x,x,23`;
