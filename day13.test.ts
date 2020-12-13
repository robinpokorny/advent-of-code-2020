/* === TYPES === */
type Input = {
  time: number;
  busses: string[];
};

type RemainderModulo = {
  remainder: bigint;
  modulo: bigint;
};

/* === PREPARE INPUT === */

export const prepareInput = ([input]: TemplateStringsArray): Input => {
  const [time, busses] = input.split("\n");

  return {
    time: Number(time),
    busses: busses.split(","),
  };
};

/* === UTILS === */

const range = (from: number, to: number) =>
  [...Array(to - from + 1).keys()].map((i) => i + from);

const multiplicativeInverse = (x: bigint, modulo: bigint) =>
  range(1, Number(modulo))
    .map(BigInt)
    .find((candidate) => ((x % modulo) * candidate) % modulo === BigInt(1)) ||
  BigInt(1);

// Chinese Remainder Theorem Solver
const solveCRT = (rms: RemainderModulo[]): bigint => {
  const N = rms.map(({ modulo }) => modulo).reduce((a, b) => a * b);

  return (
    rms
      .map(({ remainder, modulo }) => {
        const n = N / modulo;

        return remainder * multiplicativeInverse(n, modulo) * n;
      })
      .reduce((a, b) => a + b, BigInt(0)) % N
  );
};

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

const earliestInOrder = (busses: string[]): bigint =>
  solveCRT(
    busses
      .map(Number)
      .map((bus, minute) => [bus, minute])
      .filter(([bus]) => !Number.isNaN(bus))
      .map(
        ([bus, minute]) =>
          ({
            remainder: BigInt(bus - minute),
            modulo: BigInt(bus),
          } as RemainderModulo)
      )
  );

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

test("Day 13b - test", () => {
  const { busses } = testInput;

  expect(earliestInOrder(busses).toString()).toBe("1068781");
});

test("Day 13b - prod", () => {
  const { busses } = prodInput;

  expect(earliestInOrder(busses).toString()).toBe("552612234243498");
});

/* === INPUTS === */

const testInput = prepareInput`939
7,13,x,x,59,x,31,19`;

const prodInput = prepareInput`1001287
13,x,x,x,x,x,x,37,x,x,x,x,x,461,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,739,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,x,x,x,23`;
