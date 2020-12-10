/* === TYPES === */
type Diffs = Record<1 | 2 | 3, number>;

/* === PREPARE INPUT === */
export const prepareInput = ([input]: TemplateStringsArray) =>
  input.split("\n").map(Number);

/* === UTILS === */
const numCompare = (a: number, b: number) => a - b;
const last = <T>(xs: T[]): T => xs[xs.length - 1];
const empty = (): Diffs => ({ 1: 0, 2: 0, 3: 0 });
const countDiffs = (diffs: Diffs, x: number, i: number, xs: number[]) => {
  const prev = xs[i - 1] || 0;
  const diff = (x - prev) as 1 | 2 | 3;

  diffs[diff] = diffs[diff] + 1;

  return diffs;
};

/* === IMPLEMENTATION === */
const joltageDiff = (adapters: number[]): Diffs => {
  const sorted = adapters.sort(numCompare);

  const withDevice = [...sorted, last(sorted) + 3];

  return withDevice.reduce(countDiffs, empty());
};

/* === TESTS === */

test("Day <day>a - test", () => {
  const diffs = joltageDiff(testInput);

  expect(diffs[1] * diffs[3]).toBe(220);
});

test("Day <day>a - prod", () => {
  const diffs = joltageDiff(prodInput);

  console.log(diffs);

  expect(diffs[1] * diffs[3]).toBe(1836);
});

test.skip("Day <day>b - test", () => {});

test.skip("Day <day>b - prod", () => {});

/* === INPUTS === */

const testInput = prepareInput`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const prodInput = prepareInput`71
30
134
33
51
115
122
38
61
103
21
12
44
129
29
89
54
83
96
91
133
102
99
52
144
82
22
68
7
15
93
125
14
92
1
146
67
132
114
59
72
107
34
119
136
60
20
53
8
46
55
26
126
77
65
78
13
108
142
27
75
110
90
35
143
86
116
79
48
113
101
2
123
58
19
76
16
66
135
64
28
9
6
100
124
47
109
23
139
145
5
45
106
41`;
