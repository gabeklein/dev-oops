import { createMessageFactory } from "./message";
import { EnhansedError } from "./error";

type Bunch<T> = { [key: string]: T };

type ErrorFactory
  <A extends any[], R extends Error> = 
  (useTemplate: (...args: any[]) => string, ...args: A) => R;

export default createErrorFactory((template, ...args) => {
  return new Error(template(...args));
})

export function createErrorFactory
  <A extends any[], R extends Error, E extends ErrorFactory<A, R>>
  (compute: E){

  return function declareErrors
    <O extends Bunch<string>>
    (register: O){

    const Errors = {} as any;

    for(const name in register){
      const template = register[name];
      const message = createMessageFactory(template);

      function buildThisError(...args: A){
        const error = compute(message, ...args);
        debugger
        return EnhansedError.mixin(error);
      }

      Errors[name] = buildThisError;
    }

    return Errors as {
      readonly [P in keyof O]: (...args: A) => R & EnhansedError;
    };
  }
}