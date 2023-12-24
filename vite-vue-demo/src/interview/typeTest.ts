/**
 * TS 工具类型测试
 */
namespace TypeTest {
    type User = {
        id: string;
        name: string;
        email: number;
    };
    type User2 = {
        id: string;
        age: number;
    };
    type Fun = (arg: number) => number;
    type UT = User extends User2 ? string : number;
    type U1 = User & User2;
    type U2 = User | User2;
    let a: U1 = { id: 'a', name: 'string', email: 1, age: 2 };
    let b: U2 = { id: 'b', age: 2 };

    type UserWithoutEmail = Omit<User, 'id' | 'email'>;

    type T0 = Pick<User, 'name' | 'email'>;
    type T1 = Omit<User, 'id' | 'email'>;
    type T3 = Partial<User>;
    type T4 = Required<User>;
    type T5 = Readonly<User>;

    type T2 = Exclude<User, User2>;
    type T22 = Exclude<'a' | 'b' | 'c', 'a' | 'd'>;
    type T23 = Exclude<'a' | 'b' | 'c', 'd'>;
    type T24 = Exclude<'a' | 'b' | 'c', 'a' | 'b' | 'c'>;
    type T25 = Exclude<'a' | 'b' | 'c' | User, 'a' | 'b' | 'c' | User2>;

    type T6 = Extract<User, User2>;
    type T62 = Extract<'a' | 'b' | 'c', 'a' | 'd'>;
    type T63 = Extract<'a' | 'b' | 'c', 'd'>;
    type T64 = Extract<'a' | 'b' | 'c', 'a' | 'b' | 'c'>;
    type T65 = Extract<'a' | 'b' | 'c' | User, 'a' | 'b' | 'c' | User2>;

    type T7 = NonNullable<User | 'a' | null | undefined>;
    type T8 = ReturnType<Fun>;
    type T9 = Record<string, T2>;
    type T10 = keyof any;
}
function TypeTestFun() {
    let a: any = 1;
    let b = a as string;
    let c = <number>a;
}

