namespace Day1 {
  type MapType<T extends Object> = {
    // [key in keyof T as `${key}${key}${key}`]: T[key];

    [key in keyof T as `${key & string}${key & string}${key & string}`]: T[key];
  };

  //

  type res = MapType<{ a: 1; b: 2 }>;

  type StringKeys<T> = T extends Object ? keyof T : never;

  type O1keys = StringKeys<{ a: 1; b: "2" }>;
  type O2keys = StringKeys<[]>;

  const sym = Symbol();
  class ObjectDataBind {
    [sym] = sym;
    [key: string]: DataBind;
  }

  class DataBind {
    foo: string;
    constructor(f: string) {
      this.foo = f;
    }
  }

  function fff(arg: ObjectDataBind | DataBind) {
    if (sym in arg) {
      arg;
    } else {
      arg;
    }
  }

  const foo = async (key: string) => {
    switch (key) {
      case "A":
        await Promise.resolve();
        return "A";
      default:
        return null;
    }
  };

  type First<T> = T extends [infer first, ...unknown[]] ? first : never;

  type F = First<[1, 2, 3]>;

  type Last<T> = T extends [...unknown[], infer last] ? last : never;

  type L = Last<[1, 2, 3]>;

  type L2 = Last<[]>;

  type PopArr<T> = T extends []
    ? []
    : T extends [...infer A, infer last]
    ? A
    : never;
  type P = PopArr<[1, 2, 3]>;
  type P2 = PopArr<[]>;

  type UnShiftArr<T, W> = T extends []
    ? [W]
    : T extends [...infer A]
    ? [W, ...A]
    : never;
  type US = UnShiftArr<[1, 2, 3], 0>;
  type US2 = UnShiftArr<[], 0>;

  type ShiftArr<T> = T extends []
    ? []
    : T extends [infer F, ...infer A]
    ? A
    : never;
  type S = ShiftArr<[1, 2, 3]>;
  type S2 = ShiftArr<[]>;

  type StartWith<
    Str extends string,
    key extends string
  > = Str extends `${key}${string}` ? true : false;
  type StartsWithResult = StartWith<"hello world", "hello">;
  type StartsWithResult2 = StartWith<"hello world", "world">;

  type Replace<
    Str extends string,
    From extends string,
    To extends string
  > = Str extends `${infer Start}${From}${infer End}`
    ? `${Start}${To}${Replace<End, From, To>}`
    : Str;
  type ReplaceResult1 = Replace<"hello world", "l", "🐶">;
  type ReplaceResult2 = Replace<"hello world", "he", "HE">;

  type ReplaceStr<
    Str extends string,
    From extends string,
    To extends string
  > = Str extends `${infer Prefix}${From}${infer Suffix}`
    ? `${Prefix}${To}${Suffix}`
    : Str;

  type ReplaceStrResult1 = ReplaceStr<"hello world", "l", "🐶">;
  type ReplaceStrResult2 = ReplaceStr<"hello world", "he", "HE">;

  type TrimRight<T extends string> = T extends `${infer F} ` ? TrimRight<F> : T;
  type TR1 = TrimRight<"  abc  ">;
  type TrimLeft<T extends string> = T extends ` ${infer F}` ? TrimLeft<F> : T;
  type TL1 = TrimLeft<"  abc  ">;
  type Trim<T extends string> = TrimLeft<TrimRight<T>>;
  type T1 = Trim<"  abc  ">;

  type GetParams<F> = F extends (...args: infer Args) => unknown ? Args : never;
  type G1 = GetParams<(a: string, b: boolean) => void>;

  type GetTeturn<F> = F extends (...args: unknown[]) => infer R ? R : never;
  type GT1 = GetTeturn<(a: string, b: boolean) => void>; // never
  type GT2 = GetTeturn<() => void>; // void

  class Dong {
    name: string;

    constructor() {
      this.name = "dong";
    }

    hello(this: Dong) {
      return "hello, I'm " + this.name;
    }
  }

  const dong = new Dong();
  dong.hello();
  dong.hello.call({
    name: "xx",
    hello: function (this: Dong) {
      return "";
    },
  });

  type GetThisParameterType<T> = T extends (
    this: infer ThisType,
    ...args: any[]
  ) => any
    ? ThisType
    : unknown;

  type GetThisType<T> = T extends (this: infer This, ...args: any[]) => unknown
    ? This
    : never;

  type GT = GetThisType<typeof dong.hello>;

  interface Person {
    name: string;
  }

  interface PersonConstructor {
    new (name: string): Person;
  }

  type GetInstanceType<T extends new (...args: any) => any> = T extends new (
    ...args: any
  ) => infer R
    ? R
    : never;
  type GTe = GetInstanceType<PersonConstructor>;

  type GetRefProps<T> = T extends { ref: infer Value } ? Value : never;
  type GR1 = GetRefProps<{ ref: 1 }>;
  type GR2 = GetRefProps<{ ref: undefined }>;
  type GR3 = GetRefProps<null>;

  type Push<T, Ele> = T extends [...args: infer Args] ? [...T, Ele] : T;
  type NewArray = Push<[1, 2, 3], 4>;
  type Push2<T extends [...args: unknown[]], Ele> = [...T, Ele];
  type NewArray2 = Push<[1, 2, 3], 4>;

  type tuple1 = [1, 2];
  type tuple2 = ["guang", "dong"];
  //我们想把它们合并成这样的元组：

  type tuple = [[1, "guang"], [2, "dong"]];

  type Zip<O1 extends [unknown, unknown], O2 extends [unknown, unknown]> = [
    [O1[0], O2[0]],
    [O1[1], O2[1]]
  ];

  type z1 = Zip<tuple1, tuple2>;

  type Zip2<
    T extends [unknown, unknown],
    Q extends [unknown, unknown]
  > = T extends [infer tF, infer tL]
    ? Q extends [infer qF, infer qL]
      ? [[tF, qF], [tL, qL]]
      : never
    : never;

  type z2 = Zip2<tuple1, tuple2>;

  type Zip3<T extends unknown[], Q extends unknown[]> = T extends [
    infer tF,
    ...infer TL
  ]
    ? Q extends [infer qF, ...infer QL]
      ? [[tF, qF], ...Zip3<TL, QL>]
      : []
    : [];

  type z3 = Zip3<tuple1, tuple2>;

  type CapitalizeStr<T extends string> = T extends `${infer F}${infer L}`
    ? `${Uppercase<F>}${L}`
    : T;
  type CS = CapitalizeStr<"hello">;
  type CS2 = CapitalizeStr<"">;

  type CamelCase<T extends string> =
    T extends `${infer L}_${infer R}${infer Rest}`
      ? `${L}${Uppercase<R>}${CamelCase<Rest>}`
      : T;

  type CR = CamelCase<"dong_dong_dong">;
}

namespace Day2 {
  //
  type DropSubStr<
    S extends string,
    key extends string
  > = S extends `${infer First}${key}${infer Last}`
    ? DropSubStr<`${First}${Last}`, key>
    : S;
  type DSTR1 = DropSubStr<"dong~~~", "~">;
  type DSTR2 = DropSubStr<"dong", "~">;

  type AppendArgument<T extends Function, Arg> =
    // T extends () => infer R ? ( newArg: Arg) => R :
    T extends (...args: infer Args) => infer R
      ? (...args: [...Args, Arg]) => R
      : never;

  type AAR1 = AppendArgument<() => void, number>;
  type AAR2 = AppendArgument<(str: string) => void, number>;
  type AAR3 = AppendArgument<(str: string, b: boolean) => 123, number>;

  type Mapping<Obj extends object> = {
    [Key in keyof Obj]: Obj[Key];
  };

  type UppercaseKey<Object extends object> = {
    // [Key in keyof object as Key extends `${infer F}${infer Last}` ? `${Uppercase<F>}${Last}` : Key ]  : Object[Key]
    [Key in keyof Object as Uppercase<Key & string>]: Object[Key];
  };

  // TODO 如何实现递归?
  type UppercaseKeyDeep<Object extends object> = {
    [Key in keyof Object as Uppercase<Key & string>]: Object[Key];
  };

  type UKR1 = UppercaseKey<{
    abc: 123;
    def: 456;
    FFF: 666;
    son: {
      grandSon: true;
    };
  }>;

  type UKR2 = UppercaseKey<{}>;

  function uppercaseObjectKeys(obj: Record<string, unknown>) {
    Object.keys(obj).forEach((key) => {
      const newKey = key.toUpperCase();
      obj[newKey] = obj[key];
      delete obj[key];
    });

    return obj;
  }
}

namespace Day3 {
  type DeepPromiseValueType<T extends Promise<unknown>> = T extends Promise<
    infer R
  >
    ? R extends Promise<unknown>
      ? DeepPromiseValueType<R>
      : R
    : never;

  type DPR = DeepPromiseValueType<Promise<Record<string, number>>>;
  type DPR1 = DeepPromiseValueType<Promise<Promise<Record<string, number>>>>;

  type DeepPromiseValueType2<T> = T extends Promise<infer R>
    ? DeepPromiseValueType2<R>
    : never;

  type DPR2 = DeepPromiseValueType2<Promise<Record<string, number>>>;
  type DPR21 = DeepPromiseValueType2<Promise<Promise<Record<string, number>>>>;

  type ReverseArr<T extends unknown[]> = T extends [infer F, ...infer R]
    ? [...ReverseArr<R>, F]
    : [];

  type RA1 = ReverseArr<[1, 2, 3, 4]>;

  type Includes<Arr extends unknown[], T> = Arr extends [infer F, ...infer Last]
    ? IsEqual<F, T> extends true
      ? true
      : Includes<Last, T>
    : false;

  type A1 = Includes<[1, 2, 3, 4], 1>;
  type A2 = Includes<[1, 2, 3, 4], 5>;
  type A3 = Includes<[], 5>;
  type A4 = Includes<[], []>;

  type IsEqual<T, F> = (T extends F ? true : false) &
    (F extends T ? true : false);

  type Is1 = IsEqual<1, 1>;
  type Is2 = IsEqual<1, "1">;
  type Is3 = IsEqual<1, true>;
  type Is4 = IsEqual<1, false>;
  type Is5 = IsEqual<1, []>;
  type Is6 = IsEqual<1, null>;
  type Is7 = IsEqual<1, {}>;

  type RemoveItem<Arr extends unknown[], T> = Arr extends [
    infer F,
    ...infer Last
  ]
    ? IsEqual<F, T> extends true
      ? [...Last]
      : RemoveItem<Last, T>
    : Arr;

  type R1 = RemoveItem<[1, 2, 3, 4], 1>;
  type R2 = RemoveItem<[1, 2, 3, 4], 5>;
  type R3 = RemoveItem<[], 5>;
  type R4 = RemoveItem<[], []>;

  type BuildArray<
    L extends number,
    Arr extends unknown[] = []
  > = Arr["length"] extends L ? Arr : BuildArray<L, [unknown, ...Arr]>;

  type BA = BuildArray<5>;
  type BA1 = BuildArray<0>;

  type ReplaceAll<
    T extends string,
    S extends string,
    N extends string
  > = S extends ""
    ? T
    : T extends `${infer F}${S}${infer Last}`
    ? ReplaceAll<`${F}${N}${Last}`, S, N>
    : T;

  type RAll1 = ReplaceAll<"foobar", "o", "j">;
  type RAll2 = ReplaceAll<"foobar", "O", "j">;
  type RAll3 = ReplaceAll<"foobar", "", "j">;

  type String2Unit<S extends string> = S extends `${infer F}${infer L}`
    ? F | String2Unit<L>
    : never;

  type SU = String2Unit<"abc">;
  type SU2 = String2Unit<"abc def gh ">;
  type SU3 = String2Unit<"">;

  type StringReverse<S extends string> = S extends `${infer A}${infer B}`
    ? `${StringReverse<B>}${A}`
    : S;

  type SR = StringReverse<"abcde fgh">;
  type SR2 = StringReverse<"">;

  type DeepObjReadonly<O extends Object> = O extends any
    ? {
        readonly [key in keyof O]: O[key] extends object
          ? O[key] extends Function
            ? O[key]
            : DeepObjReadonly<O[key]>
          : O[key];
      }
    : never;

  type DOR = DeepObjReadonly<{ a: 1; b: { c: 2 }; d: () => {} }>;

  type IsObject<T> = T extends Object ? true : false;
  type I1 = IsObject<() => {}>;
  type I2 = IsObject<{}>;

  type Add<A extends number, B extends number> = [
    ...GenArr<A>,
    ...GenArr<B>
  ]["length"];

  // : Aarr['length'] extends A ? Add<A, B, Aarr, Barr> : Add<A, B, [...Aarr, unknown], Barr> :

  type GenArr<
    N extends number,
    Arr extends unknown[] = []
  > = Arr["length"] extends N ? Arr : GenArr<N, [...Arr, unknown]>;

  type GA = GenArr<5>;

  type Add1and = Add<1, 2>;
  type Add1and1 = Add<0, 2>;
  type Add1and2 = Add<100, 2>;

  //  type Minus<A extends number, B extends number> =
  type Minus<
    Num1 extends number,
    Num2 extends number
  > = BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
    ? Rest["length"]
    : never;

  type M1 = Minus<3, 2>;
  type M2 = Minus<2, 3>;
  type M3 = Minus<2, 2>;

  type Multiply<
    N1 extends number,
    N2 extends number,
    T extends unknown[] = []
  > = N2 extends 0
    ? T["length"]
    : Multiply<N1, Minus<N2, 1>, [...GenArr<N1>, ...T]>;

  type Mu1 = Multiply<2, 5>;
  type Mu2 = Multiply<0, 5>;
  type Mu3 = Multiply<5, 0>;

  type StrLen<S extends string, C extends unknown[] = []> =
    // S extends ""
    S extends `${string}${infer L}`
      ? StrLen<`${L}`, [...C, unknown]>
      : C["length"];

  type SL1 = StrLen<"awddwa">;
  type SL2 = StrLen<"">;
  type SL3 = StrLen<"ffa awdd">;

  type Bigger<
    A extends number,
    B extends number,
    T extends unknown[] = []
  > = A extends B
    ? false
    : T["length"] extends B
    ? true
    : T["length"] extends A
    ? false
    : Bigger<A, B, [...T, unknown]>;

  // T["length"] extends A ? false : true;
  type B1 = Bigger<1, 2>;
  type B2 = Bigger<2, 2>;
  type B3 = Bigger<2, 1>;

  type ABC = "a" | "b" | "c";
  type UppercaseA<S extends string> = S extends "a" ? "A" : S;
  type UC1 = UppercaseA<"abc">;
  type UC2 = UppercaseA<ABC>;
  type UC3 = UppercaseA<"aaannnccc">;

  type String2Unit2<S extends string> = S extends `${infer A}${infer Last}`
    ? A | String2Unit<Last>
    : S;

  type SU21 = String2Unit2<"abc">;
  type BEM<
    Block extends string,
    Element extends string[],
    Modifier extends string[]
  > = `${Block}__${Element[number]}--${Modifier[number]}`;

  type bemResult = BEM<"guang", ["aaa", "bbb"], ["warning", "success"]>;

  type Combination<A extends string, B extends string> =
    | A
    | B
    | `${A}${B}`
    | `${B}${A}`;

  type cc1 = Combination<"a", "b">;

  type EE<A extends string, B extends string> = Exclude<B, A>;

  type ee = EE<"a", "b">;

  type AllCombinations<A extends string, B extends string = A> = A extends A
    ? Combination<A, AllCombinations<Exclude<B, A>>>
    : never;
  type AllC = AllCombinations<"a" | "b" | "c">;

  type IsAny<T> = "xx" extends T & 1 ? true : false;

  type isAny1 = IsAny<1>;
  type isAny2 = IsAny<null>;
  type isAny3 = IsAny<undefined>;
  type isAny4 = IsAny<any>;

  type IsUnit<A, B = A> = A extends B
    ? [B] extends [A]
      ? false
      : true
    : never;

  type isUnit1 = IsUnit<1>;
  type isUnit2 = IsUnit<"1">;
  type isUnit3 = IsUnit<[1, 2]>;
  type isUnit4 = IsUnit<"1" | "2">;

  type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
    T
  >() => T extends B ? 1 : 2
    ? false
    : true;

  type Note = NotEqual<1, 2>;
  type FF = () => void;
  type Note2 = NotEqual<FF, FF>;

  type IsUnion<A, B = A> = A extends A
    ? [B] extends [A]
      ? false
      : true
    : never;
  type ParseQueryUnit<T extends string> =
    T extends `${infer First}&${infer Last}`
      ? First | ParseQueryString<`${Last}`>
      : never;

  type ParseQueryString<T extends string> =
    // ParseQueryUnit<T> extends ParseQueryUnit<T>
    // ? UnitToObj<T>
    // : false;
    1;
  // ParseQueryUnit<T> extends ParseQueryUnit<T>
  //   ? UnitToObj<ParseQueryUnit<T>>
  //   : never;

  type PST = ParseQueryString<"a=1&b=2&c=3">;

  type UnitToObj<T extends string> = {
    [key in T as key extends `${infer K}=${string}`
      ? K
      : never]: key extends `${infer A}=${infer Value}` ? Value : never;
  };

  type UtoObj = UnitToObj<"a=100" | "b=200">;

  type QueryStringToObj<T extends string> =
    T extends `${infer Key}=${infer Value}`
      ? {
          [K in Key]: Value;
        }
      : {};

  type QSToOBJ = QueryStringToObj<"a=123&B=456">;
}

namespace Day4 {
  interface Person {
    name: string;
    age: number;
  }

  interface Guang {
    name: string;
    age: number;
    hobbies: string[];
  }

  declare let g: Guang;
  declare let p: Person;
  // g = p;
  // 协变
  p = g;

  let printHobbies: (guang: Guang) => void;

  printHobbies = (guang) => {
    console.log(guang.hobbies);
  };

  let printName: (person: Person) => void;

  printName = (person) => {
    console.log(person.name);
  };

  // printHobbies = printName
  // printName = printHobbies;

  class CarB {
    car: string;
    constructor() {
      this.init();
    }
    init() {
      this.car = "";
    }
  }
}
