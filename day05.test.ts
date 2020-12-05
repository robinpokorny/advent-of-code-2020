/* === TYPES === */
type Binary = 1 | 0;

/* === PREPARE INPUT === */
export const prepareInput = ([input]: TemplateStringsArray) =>
  input.split("\n").map(lineToBinary).map(binaryToNumber);

/* === UTILS === */
const MAP_TO_ONE = "BR";
const lineToBinary = (line: string): Binary[] =>
  [...line].map((char) => (MAP_TO_ONE.includes(char) ? 1 : 0));

const binaryToNumber = (val: Binary[]) => Number.parseInt(val.join(""), 2);

const range = (from: number, to: number) =>
  [...Array(to - from + 1).keys()].map((i) => i + from);

/* === IMPLEMENTATION === */

/* === TESTS === */

test("Day <day>a - test", () => {
  expect(testInput).toEqual([567, 119, 820]);
});

test("Day <day>a - prod", () => {
  const maxPass = Math.max(...prodInput);

  expect(maxPass).toBe(938);
});

test("Day <day>b - prod", () => {
  const minPass = Math.min(...prodInput);
  const maxPass = Math.max(...prodInput);

  const myPass = range(minPass, maxPass).find(
    (pass) => !prodInput.includes(pass)
  );

  expect(myPass).toBe(696);
});

/* === INPUTS === */

const testInput = prepareInput`BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;

const prodInput = prepareInput`FBFBFFBLLR
FBBBFFBLLL
BFBFFFFRRR
BFBBBFBRLL
FBFBBFBLLL
BBBFFFBRRR
FBFFFBFRRL
BFFFFFFRLR
FBFFBBFRRL
FBFBBFBRLL
BFBBBFBRRR
BBFBFFBRLL
FBBFBFFLLL
FBBFFFBRLR
BBFFFFBLRL
FFFBBBBRLR
FFBBBFBRLL
FBBBFBFLLL
FBBBFFFRLL
FBBFBBFLRR
FBFBBBBLLL
BBFBFBFLRR
FBFFFBFRLR
FFFBBFBLLL
FBFFBBBRLL
FBBBFBFLRL
BFFFBFBRRL
BFFBFFBLRR
BBFBBBBRRL
FBFBBBBRRR
BBBFFBBLRL
BBFBFFFRRR
FFBBBBBRRL
BFFBBFFLLR
BBFFFFBRRR
FBFBFFFRLL
FFFBFBBLLL
FBBFBFBLRR
FBFBFBFLLL
BFFFFFFLRR
BFFBBFFRLL
FFBFBBFLLL
FBFBBBFRLL
BFFFFFFLLR
FFFBFBFRLR
FBFFFFBLLL
FFBFBBBLLL
BBFFBBBLRL
BBFBBBBLRR
BFBFBFFRLL
FFFBFBBRLL
FBBBFBBRLL
FBFFFFFLRR
BFFBFBBRLR
BFFBBBBRRR
FBBBBBFLRR
BFFFBFFRRL
FBFBFFFLLR
FBBBFBBRRL
FFBFBBBLRR
FFBFBFBLRR
BFFFBFBLRL
BFFBFBBLRR
BFFFFFBLLR
FBFFBBBRRL
BFFBFFFLLR
BBBFFFFRRL
FBBFBBBRRR
FBFBBBFLLL
FBBFFBFRRR
FFBFFFBLRR
BFFFFBBRRL
FBBBFBFRLL
FFBBFFFLLL
BBFFFFFRLL
BFFBFFBRLR
FFBFFBFRRL
FBBFFFBLLR
FFFBFBFLRR
BFBFBBBRLR
BFBFFBFLLR
FFFBBFBRLR
FFFBBBFLLL
BBFFFFBRLR
FFBBFFFLRR
BBBFFBFLLR
FBFBFFFRRR
BBFFBFBRLL
FBFBFFFLRR
FBBFBFBRRR
FBBFBFFLRR
BFBFFFBRRR
BFBFFFBRLR
BFFBBBFRRL
BBFFBBBLLL
BFBFFBFRRL
BFBFFFFLLL
BFBFFFBLLL
FBFFFFFRRL
FFBFFBBLLL
BFFBFFBLRL
BFFBFBBLLR
FBBFFFBLLL
BFFFBFBLLR
FFFBBBFLRR
BFBFBFFLRR
FBBFFFFRLR
FBFBBFFLLR
FBFFBFBRRL
FBBFFBFLLR
FBFBFBBLRL
FFFBFFBRLL
BBFBBBFRLL
FFBFBBBRLL
BBBFFFBLLR
BFBBBFBLRL
BFBFFFFLRR
FFBFBFFRLR
FBFBFFBRLL
FFBFFFFLLR
FBFFBFFLRL
FFFBFFBLLR
FFFBFBFRRR
BFBBFBBRRR
BFFBBBFLLL
BFFFBBBRRR
BFBBBFFRRR
BBBFFFFRLL
BFBBBFBLLL
FFFBFBFLRL
FFBBFBFRRR
FFBBFBFRLR
BFBBBBBRLR
BBBFBFFLLR
FFBBBBFLLL
BFBFBBFRLL
BFBFBBBRRL
BFBBBBBLRL
BFFBBFBRRR
FBFFFFFRLR
BFFBFBFRRL
BFFBBFBLLR
FBBFFBFRRL
BFFFBFBRLR
BBFFBFFRRL
FBFFBBFRLL
FFBFFFBRLL
BBBFFFBRRL
BFBFFBFLLL
FBFBBFBRRL
FFFBBFFRRR
BBFBFFBLRR
BBBFFFBLRL
BFFFBBBLRL
FBFFFBBLLR
FBBFBBBRRL
FBFBBFBRLR
BFBFFFBRRL
FBBFBFBLRL
FFBBBFBLLL
FFBBBFFRRL
FFBFFBFRLL
FBFBBBFRRL
BFBFBBFLLL
FFBFFBFLLL
FBBBBFBLLL
FFBFBFFRRR
FBBFFBFLRR
BBFFFFBLLL
FBFFFFFRRR
BFFBBBFLLR
FFFBFFFRRL
BBFFFBBRRR
FFBFFBBLLR
FBFBFBFRRL
BFBFFBBRLL
FFFBBBFRLR
FFBFFFFRRL
FBBBFFBLRL
BFFBBFBRLR
FBFBBBFRLR
FFFBFFBLRL
BFFFFFBRLR
FBFFBBBRLR
BBBFBFFRLL
BBFFFBFRLR
FFBFBBFRLR
BFFFBBFLLR
BBFBFBFLLL
BBBFFBBLLR
BFFFFBBLLR
BBFBBBBRLR
FBFFFBFRLL
BFBBFBBLRL
FBFBFFBRLR
FBBFFFBRRL
BFBFFFFRRL
FFBFFFBLRL
BBFBBFBRLL
BFFFFFBLLL
BBBFFBFLLL
FBFBBBBLLR
BBFFFBFLLL
BFFBFBFLRR
BBBFBFFLRL
FFBFBFFRLL
FBBFFFFLLL
FFBBFBBRRR
BFBFFFBLRR
BFFBFBBRRL
BBFBBBFLRL
BFBBFBFLLL
BFBBBBFRLR
BBFBBFFLLL
BBFFBBFRLL
FBBBBFBRLR
FBBBBBFRLR
BFFFFBFRLR
BFFFFFFRRL
FBBFBFFRRR
FFBFFBBLRR
BBBFFFBRLR
FFFBBFFLLR
BBFBBFBRRR
FFBBFBFRRL
FBFFFFBRRR
FBBBBBBRRL
BBFBFFBRLR
BBBFFBBLLL
BFFBFBFLRL
BFFFFBBLRR
BFFBBFBLRL
BFBBFBFRRL
BFBFBBBLRR
FBBFFFBRRR
FFFBBBBLLR
BBFBBBBRRR
FFBFFBFLRL
BFBFBBFRRR
BFBFBFFRRR
FBBFFFFRRL
FFFBFBFRLL
BBFFFFFLLL
BBFBBBFRRR
FFBBBFFRLL
FBBFBFFRLR
BFFFFFBRRR
BFFFBFFRRR
BBBFFBFRRL
BFFBBFFLRL
FBFFBFBRRR
BFBBFFBRLL
BFFFBBBRLR
FFBBFBFLRR
FBFFBBBLRL
BBFFBFFRLL
FFFBFFFRRR
FBFBFFFRLR
FFBFBFFLRR
BBFFBFBLRR
BBFFFBBRLL
BFBFBBFLRL
FBFFBBFRLR
BFFFBFBLLL
FBFFBFFRRL
FBBBBBFRRR
FBFFBBFLLR
BFBBFBBRLR
FBBFBBBLLL
BBBFBFBLLL
BFBFBFBLLR
BFFFFBBLRL
BBFBFBBLLR
BBFFFBBLRR
BBFFBFFRRR
BFFFFFFRRR
FBFBFBBRRL
BFBFFBFLRL
BFBBBBBLLR
BBBFFFFLLR
FBFFBFFLRR
BFFFBFFRLL
FFBFBBFLRR
BFFBFBFLLR
FBFFFBFLLL
FFBBFFBLLR
BBFBFBFRLR
FBFBBFFRLR
BFBBBBFLLR
FFBFBFFLRL
BFBBBBFLLL
BFFFBFFRLR
FBFFFBBLLL
FFBFBFBRLL
FBFBFFBRRR
BFBBFBFLRL
FFFBBBBRRL
FFBFBBBRRR
BFFBBFFRLR
FBFBBFFLRR
FBFFFBBRRR
BFBBFFFRLR
FFBFFFBRRR
FFBFFFBLLR
BFBFFFBLRL
FBFBFBBRLL
FBBBFBBRRR
BBFFBFBRLR
BFFFBBFRLL
FBFBFBFLLR
FFBFFBBRRR
BFBFBBFLRR
FFBBFBBLLR
FFBFFFBRLR
FFFBBBBLLL
BBBFFBFRRR
FBBFBBFLLR
BFBBBFFRRL
FBBBBFFLRL
BFBFBBBLRL
FFBFBBFLLR
BFFFBFBRLL
BFFBFFFRRL
BFFBFFFRLL
FFBBFBBLLL
BBFFFBFRRL
BBFBFBFRRR
FBFBBFFRRL
BFBBFBBLLL
FBFFBFFLLR
FBBBBFFRLR
FBFFBFBRLL
FFBBBBFRRR
FBBBBFBRRR
FBFBBBFLRR
FBBFBFBLLR
FBBBFBFLRR
FBFFBBFLLL
BFBFFFBLLR
FBFFFFBLRR
BFBBBFFLRR
BFBFBBFRLR
FBBFFFBLRL
FBBBBFFRLL
BBBFBFFRRL
BFBFBBBRLL
FFFBBBFLLR
FBBBBBFLLR
BFBFBBFLLR
BFBFBBBRRR
BFBBFBBRLL
FBFFFFBRRL
BBFBFBBRRR
FFBFBFBRRR
FFBFBBFRRL
BBFFFFBRLL
BFFBBBFRLL
FBBBFFBLLR
BFBFBFBRLL
FBBFFBBRLL
FBFFFBBRLR
BBFFBBBRRR
FBBBBBBRRR
FBBFBBFRRL
BFFFBBFLRL
FFFBFBBLRR
FBBBBBBLLL
FFFBFBBRRL
BBBFFFFRRR
BFFFBFFLLL
FFFBFBBLLR
FBFFBBFLRL
BFBBFFFRLL
BBFBFBBLLL
FBBBFFFLRR
BFFBFFBLLL
FBBFBFBRLL
BFBBFFFLLR
FBBFFFBLRR
BFFBBBBLLL
BBFFFBFRRR
FFBBBBFLRL
FBBFFFFLRL
FFFBFBFLLR
BFBBBFBRRL
FFFBBBFRRR
FBBBFBFRLR
BFBFBFFRLR
BFBFFBBLLR
FBFFBFBRLR
BBFBFFFLRL
FBBBFBBLLR
FFBFFBBRLL
FBFFFBBRLL
BFFFFFBRLL
BFFBBBBLLR
FFBBBBFRLL
FFBBBFBRRR
FBBBFBBLLL
FBBBFFBRRL
FFBBBBBLRR
BBFBBBFLRR
BBFBBFFLRL
BBFFBBBRLR
FBFBFFFRRL
BFBFFBBRRL
BBFBBBBRLL
BFFBBBBRRL
BBFBBFFRLR
BFFBBFBLLL
FBBBBBBRLR
FBBFBBBLRL
FFBFFBFRRR
FFFBFFBLRR
BFBBBFBLRR
FFBBFFBRRR
FFFBBBBRRR
FBFFBBBLRR
BFBFFBBLRL
FFBBBBBRLL
BBFBFFBRRR
FFBBFFBLLL
BBFBBFBLLL
BFBFBBBLLR
FBBBFBBRLR
BFBBFFFLRL
BFBBFFFLLL
BFBBFBFRLL
FBFFFFBRLR
FBBFFFFRLL
FFBFBFFLLR
BFFBFBFRRR
BFFBBFBRLL
BFBFBFBRRR
FBFFBFFLLL
FBBFBBFLLL
BBFBBBFLLL
BBFBBFFRLL
BFFFBFFLRR
FBFFFBFRRR
FBBBBFFLRR
FFBBBBBLLL
BFBBBBFRLL
FBBFFBBRRL
FFBFFBBRLR
BFBFBFBRLR
FFBFBBFLRL
FFBBBFBLRL
BFFBBFFLRR
FBFBFBBRRR
FBFBBFBLRL
FBFFFFBLLR
FFBBBBFLRR
FBFBBBBLRL
FFFBBFFRLR
BBBFFBFRLR
FFFBBFBRRR
FFBFFFFRLR
BFFBFFBRRL
FBFBFFFLRL
FFBFBFBLRL
FBBBFBBLRR
BFFFFBFRRL
FBFFFBBLRL
FFFBBBFRLL
BFFBBFFLLL
FFFBFBBRLR
FBBFBBFLRL
BFFFFFFLLL
FFFBBFFLRR
FFBFFBFLRR
FFBBBBFLLR
BFFFBFFLLR
FBBFBBBLRR
BBBFFBFLRR
FBBFFBBLRL
FBFBBBBRRL
BBFFBBFLLR
BBBFFBFRLL
FBFFFFBLRL
BBBFBFFRLR
BBFFBBFLRL
BFBFBFBLLL
FFBFBBFRRR
BFBBBFFLLR
FBBFFFFLRR
BFBFFFFRLL
FBFFBBBLLL
BBFFFFFLRL
BFFBFBFLLL
BBFBBBFRRL
FBFFFBFLRL
BFFFBBBLLL
FFBBBFFLLL
BBFFFFFRRL
FBBFFBFLRL
FBBBFBBLRL
FFBBFBFRLL
FFBFBBFRLL
BBFFFBBRLR
FBFBBFBLLR
FBFFBBBRRR
FBFFFFFLRL
BBFBBBBLLR
FFBBBFFLRL
BFBBBBFRRR
FBBBBBFRLL
FFBBFFBRRL
FBBBFFBLRR
BFBFFBFRLR
FBFFFBFLRR
FBFBFFBLRL
FBFBFBFRLL
BBFBFFFLLR
BFBBFFBLRR
FFFBFFBRRR
BBFFBFFLLR
BFFBFBFRLL
BFBBFBFRLR
BBFFFFBLRR
BBFFFFFRRR
FFFBBFFRLL
BFFBFFFLRR
BFBBBBBRRL
FBBBFFBRLL
BFFFBFBRRR
FFFBFFBRLR
FBBFBBBRLR
BFFFFFBLRL
BFBFFBFLRR
FBFBBFBLRR
FFBFBFBLLL
BBFBFBBRRL
FBBBBFBLRR
FBFBBBFLLR
FBFBFFBLRR
BBFBFBFLLR
BBFFBFBLLL
FFBBFFBRLR
FFBFBFFRRL
FBFBBBBRLR
BBFBBFFRRL
FFBBBBBRRR
BBFBFFBLLL
BFFBBFFRRR
BFBBFBFLLR
FFBFFBBRRL
BFFBBFBRRL
FFBFFFFRLL
BFFBFFBRRR
BFFFBFBLRR
BFFFFFBLRR
FFBBFFFLRL
FBFBBFBRRR
FBFBFBBRLR
BBFBFBFRLL
BFFBBBFLRL
BBFBBBFRLR
BBFBFBBLRL
FBBBFFBRRR
FBBFFBFRLL
FBBBBBFLRL
FBBFFBBLLR
FBFBBFFRRR
FBFBBBBRLL
FFBFBBBRLR
FBBBBFFLLL
BFBBFFBLRL
BBFBFBBRLR
FFBBFFBLRR
FFBFFFFRRR
FFBFBFFLLL
BFFFBBFRRR
FBBFBBBLLR
BFFFBBFRLR
BFFFFBFLLL
BBFFFBFLLR
FBFFFFFLLL
BBBFFFBLLL
BBBFFBBRRL
BFFBBBBRLL
BFBFFFFRLR
FBBBFFFRLR
BBFBFFFRLL
FFBBFFFRLL
BFBBFFBRRL
BBFFBBBLRR
BBBFFBBRRR
FFFBBFBRRL
FFBFFFFLRL
BFBBFBBLRR
FFFBFBBLRL
FBFFBFBLLL
FBFBBBBLRR
BFBBBFFLLL
FFBBFBBRRL
BBBFFFFLRR
BBFFFFFRLR
BBBFFFBRLL
BBBFFFFLRL
FFBBBFBRRL
FFBFFFBRRL
BFFBBBFLRR
FFFBBFBLLR
BFBBFBBRRL
FBBBBFFRRR
FBFBFBFLRR
BBFBBFBRLR
BBFFBBFRLR
BBFBFFFRRL
FBFBBBFLRL
BFFFFBBRLR
FBBBFFFRRR
BBFFBBFLRR
BFFFBBFLRR
FFBBFBFLLL
FFBBBBBLLR
BFFBFFBRLL
BFFBFFFRRR
BBFBFBFRRL
BFBFFBBRLR
BBBFBFFRRR
FBFFBFBLRR
FFFBBFFLRL
FBFBFBFRLR
BFBFFFFLRL
BBFFFFBLLR
FFBFBBBRRL
BBFBBFBLLR
BFFBFBBLLL
BFBBBFBLLR
BFBBFFFRRR
BFFFBBFLLL
FFBBFFFLLR
FBFFFBBLRR
BFBFBFBLRR
BFBBFBFLRR
BFFFBBBLRR
FBFBBFFLLL
BFBBBBBRLL
BFBFBFBRRL
BBBFFFBLRR
BBFFFFBRRL
BBFBFFBLRL
FFBBBFBLRR
FBBFBFFRLL
FFBBFBBLRL
FBBFFFBRLL
BBBFBFFLRR
FFFBFFBLLL
BFBBBBBLLL
BBFFFFFLLR
FBFBFFFLLL
BBFBBFBLRL
BFBFFBBLLL
BBFBBBBLRL
FBBBBFBRRL
BFFBFBBRRR
FBFBBBFRRR
BFFBBBFRRR
BFFFBBBLLR
FFBBBBFRLR
BFBFFBFRRR
FBFBFBFRRR
FFFBFBBRRR
BFBFFFFLLR
FBBBBBBLRL
BFFFFBFLRL
BFFFFFFLRL
BFFFBBBRLL
BFFFFBBRLL
FBBFFFFRRR
BBBFFBBRLL
BFBBFFBLLL
FFFBBFBLRL
FBBBFBFLLR
BFFBFBBLRL
BBBFBFBLRL
BBFBFFFLRR
BBFBFFBRRL
BFBFBFBLRL
FBBBBFBRLL
BBFBBFBRRL
BBFFBFBLRL
FBBBBBFRRL
FBBFBFBLLL
FFBBFFBRLL
BBFFFBBLLL
BFFFBBFRRL
BBFBBFFRRR
FBBBBBBLRR
FFBBBFBRLR
BFFFFFBRRL
FBFFFFFRLL
BBFFBFFRLR
BBFFBFBLLR
BBFFBFBRRL
BBBFFFFRLR
BBFFBFFLRR
FFBBFFFRRL
BFFFBBBRRL
BBBFFFFLLL
BBFBFFBLLR
BBFBBFFLLR
FFBBBBFRRL
FBFBFBBLLR
FFFBBBBLRL
BFBFFFBRLL
FBFFBFFRLL
FBBFFBFRLR
BFFFFBFLLR
FBBBBBFLLL
BBFBBBFLLR
FBBBBFBLLR
FBFFBBBLLR
BBFFBBFRRL
FFBBBFBLLR
FBFFBFBLRL
FBFFFFBRLL
BFBFFBFRLL
FFBBFBFLRL
FBBFFBFLLL
BBFBBFFLRR
FFBFFBFRLR
BFFFFBFLRR
BFBBFBBLLR
BFBFBFFLRL
FFBBFFBLRL
FBBBFBFRRL
FFFBBFBRLL
BBFFBFFLRL
FBFBFFBLLL
FBBFBBFRRR
FFBFFFFLRR
FBFFBFFRLR
FBBBFFBRLR
BBFFBFFLLL
BBFBBBBLLL
FBFBBFFRLL
BFBBBBFLRR
FBFFBBFLRR
BFFBBFBLRR
BBFFFBFRLL
BBBFFBFLRL
BBFFBFBRRR
BBBFBFBLLR
FBFBFBBLLL
BBFBFFFRLR
BFFBFFFRLR
BFBBBFFLRL
FFBBFFFRRR
FFBBBFFRLR
BFBFBFFLLL
FBBFFBBLLL
FBBFBBBRLL
FFBBBBBLRL
FFFBBBBRLL
BFBBBBFRRL
FBBFFBBRRR
BFBBBBBLRR
BFBBFBFRRR
BBFFBBBRLL
BBFBFBBLRR
BFBFFBBRRR
FBFBBFFLRL
FBBBFFFLLR
BFBBBFFRLR
BFFBBBBLRR
FFBBBFFRRR
FBBBFBFRRR
FFFBBBFRRL
BFBFBBFRRL
FFBBFBBLRR
FFFBFBFLLL
FBBFBBFRLL
BBFFFBBLRL
FFFBBBFLRL
FBFFFBBRRL
FBBBBFFRRL
FFBBFBBRLL
BBFFBBFLLL
BFFBFFFLLL
FFBBBFFLRR
BFBBBFBRLR
BFFBBBFRLR
FFFBBFFLLL
FFBFFBBLRL
FBFFBFFRRR
BFBBBFFRLL
FBBFFBBRLR
BFFBBBBLRL
BBFFFFFLRR
BBFBFFFLLL
FBFFFFFLLR
FBBBBFFLLR
BBFFFBFLRL
FBBFBFBRLR
FBBFBFBRRL
FFBBFFFRLR
FFBFBBBLRL
FFBBBBBRLR
BBFFFBFLRR
BFBBFFFRRL
BBFBFBFLRL
FBBBBBBRLL
FBBFBFFLRL
FBFBFBFLRL
BFBFBFFRRL
BFBBFFBRRR
FBFFFBFLLR
FBBBFFFLRL
BFBBFFBLLR
FFBFFFFLLL
BFBBFFFLRR
FBBFBFFLLR
BBBFFBBRLR
FFBFBBBLLR
FBFBFFBRRL
FFBBFBFLLR
BFFBFBFRLR
BFFBFFBLLR
BBBFBFFLLL
FFBFFBFLLR
FFFBBBBLRR
FFFBFFBRRL
FBBBFFFRRL
BBFFFBBRRL
BBFBBFBLRR
BBFFBBBRRL
BBFBFBBRLL
BFFFFFFRLL
BFFBFFFLRL
BFFFFBFRRR
BFFFBFFLRL
BFBFFBBLRR
FFBBFBBRLR
BFBBBBBRRR
BFFBBFFRRL
FFBFFFBLLL
FBBFBBFRLR
BBFFBBBLLR
FFFBBFFRRL
FFFBBFBLRR
FBFBFBBLRR
FBBBFFFLLL
FFBFBFBLLR
BFBBFFBRLR
BFFFFBBLLL
BFBBBBFLRL
FBBBBBBLLR
BFFFFBBRRR
BBFFFBBLLR
FFBBBFFLLR
FFFBFBFRRL
BFFFFBFRLL
BFFBBBBRLR
FBFFBFBLLR
FBBFFBBLRR
BBBFFBBLRR
BFFBFBBRLL
BFBFBFFLLR
FFBFBFBRRL
BBFFBBFRRR
FFBFBFBRLR
FBBFFFFLLR
FBBFBFFRRL
FBFFBBFRRR
FBBBBFBLRL`;
