declare interface Function {
    myApply<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, args: A): R;
    myCall<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A): R;
}
