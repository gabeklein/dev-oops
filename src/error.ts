export class EnhansedError extends Error {
  static mixin<T extends Error>(e: T): T & EnhansedError {
    return Object.assign(e, this.prototype);
  }

  warn(){
    console.warn(this.message);
  }

  throw(){
    throw this;
  }
}