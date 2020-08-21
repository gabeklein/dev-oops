type Dict = { [key: string]: string };

type ErrorFactory
  <A extends any[], R extends Error> = 
  (useTemplate: (...args: any[]) => string, ...args: A) => R;

declare class EnhansedError extends Error {
  warn(): void;
  throw(): never;
}

export function createErrorFactory
  <A extends any[], R extends Error, E extends ErrorFactory<A, R>>
  (compute: E):
    <O extends Dict>(define: O) => {
      readonly [P in keyof O]: (...args: A) => R & EnhansedError;
    }

export default function declareErrors
  <O extends Dict>(define: O): {
    readonly [P in keyof O]: (...args: any[]) => EnhansedError;
  };