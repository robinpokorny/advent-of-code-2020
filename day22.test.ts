/* === TYPES === */

/* === PREPARE INPUT === */

export const prepareInput = ([input]: TemplateStringsArray) =>
  input
    .split("\n\n")
    .map((block) => block.split("\n"))
    .map<number[]>(([_player, ...deck]) => deck.map(Number)) as [
    number[],
    number[]
  ];

/* === UTILS === */
const isEmpty = (arr: unknown[]): boolean => arr.length === 0;

const getScore = (arr: number[]): number =>
  [...arr]
    .reverse()
    .map((n, i) => n * (i + 1))
    .reduce((a, b) => a + b, 0);

/* === IMPLEMENTATION === */
const combat = ([deck1, deck2]: [number[], number[]]): [number[], number[]] => {
  if (isEmpty(deck1) || isEmpty(deck2)) return [deck1, deck2];

  const [top1, ...rest1] = deck1;
  const [top2, ...rest2] = deck2;

  if (top1 > top2) {
    return combat([[...rest1, top1, top2], rest2]);
  } else {
    return combat([rest1, [...rest2, top2, top1]]);
  }
};

/* === TESTS === */

test("Day 22a - test", () => {
  const [deck1, deck2] = combat(testInput);

  expect(deck2).toEqual([3, 2, 10, 6, 8, 5, 9, 4, 7, 1]);

  expect(getScore(deck1) + getScore(deck2)).toBe(306);
});

test("Day 22a - prod", () => {
  const [deck1, deck2] = combat(prodInput);

  expect(getScore(deck1) + getScore(deck2)).toBe(31629);
});

test.skip("Day 22b - test", () => {});

test.skip("Day 22b - prod", () => {});

/* === INPUTS === */

const testInput = prepareInput`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

const prodInput = prepareInput`Player 1:
28
50
9
11
4
45
19
26
42
43
31
46
21
40
33
20
7
6
17
44
5
39
35
27
10

Player 2:
18
16
29
41
14
12
30
37
36
24
48
38
47
34
15
8
49
23
1
3
32
25
22
13
2`;
