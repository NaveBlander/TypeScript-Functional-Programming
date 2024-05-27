import { Result, makeFailure, makeOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}
 
export const findResult : <T>(pred: (x: T) => boolean, a: T[]) => Result<T> = <T>(pred: (x: T) => boolean, a: T[]) :
    Result<T> => {
        const validElements: T[] = a.filter(pred);
        return (
            validElements.length === 0
            ? (makeFailure("no such elements exists"))
            : (makeOk(validElements[0]))
        );
    }

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 : (a: number[]) => Result<number> = (a: number[]): Result<number> => {
    const res = findResult(isEven, a);
    return (bind(res, (x: number) => makeOk(x*x)));
}

const isEven : (n: number) => boolean = (n: number) : boolean => {
    return (n % 2 === 0);
}

export const returnSquaredIfFoundEven_v3 : (a: number[]) => number = (a: number[]) : number => {
    const res = findResult(isEven, a);
    return (either(res, (x: number) => (x*x), (message: string) => (-1)));
}