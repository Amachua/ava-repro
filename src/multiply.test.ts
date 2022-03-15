import test from "ava";
import multiply from "./multiply.js";

type myCb<U> = (value: U) => unknown;

async function avaEach<T>(data: T[], setup: myCb<T>): Promise<void> {
    await Promise.all(data.map(setup));
}
  
const successCases: [number, number, number][] = [
    [2, 3, 6],
    [5, 5, 25],
    [3, 3, 9],
    [1, 0, 0],
  ];

const failedCases: [number, number, number][] = [
    [2, 3, 18],
    [5, 5, 35],
    [3, 3, 2],
    [1, 0, 8],
  ];

avaEach(successCases, ([a, b, result]) => {
    test(`Properly multiply ${a} * ${b} = ${result}`, (t) => {
        t.deepEqual(multiply(a, b), result);
    });
}).catch(e => { throw e; });

avaEach(failedCases, ([a, b, result]) => {
    test(`Properly fail on ${a} * ${b} = ${result}`, (t) => {
        t.notDeepEqual(multiply(a, b), result);
    });
}).catch(e => { throw e; });
