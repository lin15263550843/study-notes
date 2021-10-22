declare interface Function {
    myApply(thisArg: any, args: any[]): any;
    myCall(thisArg: any, ...args: any[]): any;
    myBind(thisArg: any, ...args: any[]): any;
}
