
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ProcessedPost
 * 
 */
export type ProcessedPost = $Result.DefaultSelection<Prisma.$ProcessedPostPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ProcessedPosts
 * const processedPosts = await prisma.processedPost.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ProcessedPosts
   * const processedPosts = await prisma.processedPost.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.processedPost`: Exposes CRUD operations for the **ProcessedPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessedPosts
    * const processedPosts = await prisma.processedPost.findMany()
    * ```
    */
  get processedPost(): Prisma.ProcessedPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ProcessedPost: 'ProcessedPost',
    Customer: 'Customer'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "processedPost" | "customer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ProcessedPost: {
        payload: Prisma.$ProcessedPostPayload<ExtArgs>
        fields: Prisma.ProcessedPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessedPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessedPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload>
          }
          findFirst: {
            args: Prisma.ProcessedPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessedPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload>
          }
          findMany: {
            args: Prisma.ProcessedPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload>[]
          }
          create: {
            args: Prisma.ProcessedPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload>
          }
          createMany: {
            args: Prisma.ProcessedPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessedPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload>[]
          }
          delete: {
            args: Prisma.ProcessedPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload>
          }
          update: {
            args: Prisma.ProcessedPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload>
          }
          deleteMany: {
            args: Prisma.ProcessedPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessedPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcessedPostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload>[]
          }
          upsert: {
            args: Prisma.ProcessedPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedPostPayload>
          }
          aggregate: {
            args: Prisma.ProcessedPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessedPost>
          }
          groupBy: {
            args: Prisma.ProcessedPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessedPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessedPostCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessedPostCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    processedPost?: ProcessedPostOmit
    customer?: CustomerOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ProcessedPost
   */

  export type AggregateProcessedPost = {
    _count: ProcessedPostCountAggregateOutputType | null
    _avg: ProcessedPostAvgAggregateOutputType | null
    _sum: ProcessedPostSumAggregateOutputType | null
    _min: ProcessedPostMinAggregateOutputType | null
    _max: ProcessedPostMaxAggregateOutputType | null
  }

  export type ProcessedPostAvgAggregateOutputType = {
    id: number | null
    source_id: number | null
    content_length: number | null
    user_ref: number | null
  }

  export type ProcessedPostSumAggregateOutputType = {
    id: number | null
    source_id: number | null
    content_length: number | null
    user_ref: number | null
  }

  export type ProcessedPostMinAggregateOutputType = {
    id: number | null
    source_id: number | null
    title: string | null
    content_length: number | null
    user_ref: number | null
    extracted_at: Date | null
    processed_at: Date | null
  }

  export type ProcessedPostMaxAggregateOutputType = {
    id: number | null
    source_id: number | null
    title: string | null
    content_length: number | null
    user_ref: number | null
    extracted_at: Date | null
    processed_at: Date | null
  }

  export type ProcessedPostCountAggregateOutputType = {
    id: number
    source_id: number
    title: number
    content_length: number
    user_ref: number
    extracted_at: number
    processed_at: number
    _all: number
  }


  export type ProcessedPostAvgAggregateInputType = {
    id?: true
    source_id?: true
    content_length?: true
    user_ref?: true
  }

  export type ProcessedPostSumAggregateInputType = {
    id?: true
    source_id?: true
    content_length?: true
    user_ref?: true
  }

  export type ProcessedPostMinAggregateInputType = {
    id?: true
    source_id?: true
    title?: true
    content_length?: true
    user_ref?: true
    extracted_at?: true
    processed_at?: true
  }

  export type ProcessedPostMaxAggregateInputType = {
    id?: true
    source_id?: true
    title?: true
    content_length?: true
    user_ref?: true
    extracted_at?: true
    processed_at?: true
  }

  export type ProcessedPostCountAggregateInputType = {
    id?: true
    source_id?: true
    title?: true
    content_length?: true
    user_ref?: true
    extracted_at?: true
    processed_at?: true
    _all?: true
  }

  export type ProcessedPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedPost to aggregate.
     */
    where?: ProcessedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedPosts to fetch.
     */
    orderBy?: ProcessedPostOrderByWithRelationInput | ProcessedPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessedPosts
    **/
    _count?: true | ProcessedPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProcessedPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProcessedPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessedPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessedPostMaxAggregateInputType
  }

  export type GetProcessedPostAggregateType<T extends ProcessedPostAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessedPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessedPost[P]>
      : GetScalarType<T[P], AggregateProcessedPost[P]>
  }




  export type ProcessedPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedPostWhereInput
    orderBy?: ProcessedPostOrderByWithAggregationInput | ProcessedPostOrderByWithAggregationInput[]
    by: ProcessedPostScalarFieldEnum[] | ProcessedPostScalarFieldEnum
    having?: ProcessedPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessedPostCountAggregateInputType | true
    _avg?: ProcessedPostAvgAggregateInputType
    _sum?: ProcessedPostSumAggregateInputType
    _min?: ProcessedPostMinAggregateInputType
    _max?: ProcessedPostMaxAggregateInputType
  }

  export type ProcessedPostGroupByOutputType = {
    id: number
    source_id: number
    title: string | null
    content_length: number
    user_ref: number | null
    extracted_at: Date
    processed_at: Date
    _count: ProcessedPostCountAggregateOutputType | null
    _avg: ProcessedPostAvgAggregateOutputType | null
    _sum: ProcessedPostSumAggregateOutputType | null
    _min: ProcessedPostMinAggregateOutputType | null
    _max: ProcessedPostMaxAggregateOutputType | null
  }

  type GetProcessedPostGroupByPayload<T extends ProcessedPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessedPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessedPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessedPostGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessedPostGroupByOutputType[P]>
        }
      >
    >


  export type ProcessedPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    title?: boolean
    content_length?: boolean
    user_ref?: boolean
    extracted_at?: boolean
    processed_at?: boolean
  }, ExtArgs["result"]["processedPost"]>

  export type ProcessedPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    title?: boolean
    content_length?: boolean
    user_ref?: boolean
    extracted_at?: boolean
    processed_at?: boolean
  }, ExtArgs["result"]["processedPost"]>

  export type ProcessedPostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    title?: boolean
    content_length?: boolean
    user_ref?: boolean
    extracted_at?: boolean
    processed_at?: boolean
  }, ExtArgs["result"]["processedPost"]>

  export type ProcessedPostSelectScalar = {
    id?: boolean
    source_id?: boolean
    title?: boolean
    content_length?: boolean
    user_ref?: boolean
    extracted_at?: boolean
    processed_at?: boolean
  }

  export type ProcessedPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source_id" | "title" | "content_length" | "user_ref" | "extracted_at" | "processed_at", ExtArgs["result"]["processedPost"]>

  export type $ProcessedPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessedPost"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      source_id: number
      title: string | null
      content_length: number
      user_ref: number | null
      extracted_at: Date
      processed_at: Date
    }, ExtArgs["result"]["processedPost"]>
    composites: {}
  }

  type ProcessedPostGetPayload<S extends boolean | null | undefined | ProcessedPostDefaultArgs> = $Result.GetResult<Prisma.$ProcessedPostPayload, S>

  type ProcessedPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcessedPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcessedPostCountAggregateInputType | true
    }

  export interface ProcessedPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessedPost'], meta: { name: 'ProcessedPost' } }
    /**
     * Find zero or one ProcessedPost that matches the filter.
     * @param {ProcessedPostFindUniqueArgs} args - Arguments to find a ProcessedPost
     * @example
     * // Get one ProcessedPost
     * const processedPost = await prisma.processedPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessedPostFindUniqueArgs>(args: SelectSubset<T, ProcessedPostFindUniqueArgs<ExtArgs>>): Prisma__ProcessedPostClient<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProcessedPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcessedPostFindUniqueOrThrowArgs} args - Arguments to find a ProcessedPost
     * @example
     * // Get one ProcessedPost
     * const processedPost = await prisma.processedPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessedPostFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessedPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessedPostClient<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedPostFindFirstArgs} args - Arguments to find a ProcessedPost
     * @example
     * // Get one ProcessedPost
     * const processedPost = await prisma.processedPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessedPostFindFirstArgs>(args?: SelectSubset<T, ProcessedPostFindFirstArgs<ExtArgs>>): Prisma__ProcessedPostClient<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedPostFindFirstOrThrowArgs} args - Arguments to find a ProcessedPost
     * @example
     * // Get one ProcessedPost
     * const processedPost = await prisma.processedPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessedPostFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessedPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessedPostClient<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProcessedPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessedPosts
     * const processedPosts = await prisma.processedPost.findMany()
     * 
     * // Get first 10 ProcessedPosts
     * const processedPosts = await prisma.processedPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processedPostWithIdOnly = await prisma.processedPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessedPostFindManyArgs>(args?: SelectSubset<T, ProcessedPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProcessedPost.
     * @param {ProcessedPostCreateArgs} args - Arguments to create a ProcessedPost.
     * @example
     * // Create one ProcessedPost
     * const ProcessedPost = await prisma.processedPost.create({
     *   data: {
     *     // ... data to create a ProcessedPost
     *   }
     * })
     * 
     */
    create<T extends ProcessedPostCreateArgs>(args: SelectSubset<T, ProcessedPostCreateArgs<ExtArgs>>): Prisma__ProcessedPostClient<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProcessedPosts.
     * @param {ProcessedPostCreateManyArgs} args - Arguments to create many ProcessedPosts.
     * @example
     * // Create many ProcessedPosts
     * const processedPost = await prisma.processedPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessedPostCreateManyArgs>(args?: SelectSubset<T, ProcessedPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessedPosts and returns the data saved in the database.
     * @param {ProcessedPostCreateManyAndReturnArgs} args - Arguments to create many ProcessedPosts.
     * @example
     * // Create many ProcessedPosts
     * const processedPost = await prisma.processedPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessedPosts and only return the `id`
     * const processedPostWithIdOnly = await prisma.processedPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessedPostCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessedPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProcessedPost.
     * @param {ProcessedPostDeleteArgs} args - Arguments to delete one ProcessedPost.
     * @example
     * // Delete one ProcessedPost
     * const ProcessedPost = await prisma.processedPost.delete({
     *   where: {
     *     // ... filter to delete one ProcessedPost
     *   }
     * })
     * 
     */
    delete<T extends ProcessedPostDeleteArgs>(args: SelectSubset<T, ProcessedPostDeleteArgs<ExtArgs>>): Prisma__ProcessedPostClient<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProcessedPost.
     * @param {ProcessedPostUpdateArgs} args - Arguments to update one ProcessedPost.
     * @example
     * // Update one ProcessedPost
     * const processedPost = await prisma.processedPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessedPostUpdateArgs>(args: SelectSubset<T, ProcessedPostUpdateArgs<ExtArgs>>): Prisma__ProcessedPostClient<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProcessedPosts.
     * @param {ProcessedPostDeleteManyArgs} args - Arguments to filter ProcessedPosts to delete.
     * @example
     * // Delete a few ProcessedPosts
     * const { count } = await prisma.processedPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessedPostDeleteManyArgs>(args?: SelectSubset<T, ProcessedPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessedPosts
     * const processedPost = await prisma.processedPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessedPostUpdateManyArgs>(args: SelectSubset<T, ProcessedPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedPosts and returns the data updated in the database.
     * @param {ProcessedPostUpdateManyAndReturnArgs} args - Arguments to update many ProcessedPosts.
     * @example
     * // Update many ProcessedPosts
     * const processedPost = await prisma.processedPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProcessedPosts and only return the `id`
     * const processedPostWithIdOnly = await prisma.processedPost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProcessedPostUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcessedPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProcessedPost.
     * @param {ProcessedPostUpsertArgs} args - Arguments to update or create a ProcessedPost.
     * @example
     * // Update or create a ProcessedPost
     * const processedPost = await prisma.processedPost.upsert({
     *   create: {
     *     // ... data to create a ProcessedPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessedPost we want to update
     *   }
     * })
     */
    upsert<T extends ProcessedPostUpsertArgs>(args: SelectSubset<T, ProcessedPostUpsertArgs<ExtArgs>>): Prisma__ProcessedPostClient<$Result.GetResult<Prisma.$ProcessedPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProcessedPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedPostCountArgs} args - Arguments to filter ProcessedPosts to count.
     * @example
     * // Count the number of ProcessedPosts
     * const count = await prisma.processedPost.count({
     *   where: {
     *     // ... the filter for the ProcessedPosts we want to count
     *   }
     * })
    **/
    count<T extends ProcessedPostCountArgs>(
      args?: Subset<T, ProcessedPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessedPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessedPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessedPostAggregateArgs>(args: Subset<T, ProcessedPostAggregateArgs>): Prisma.PrismaPromise<GetProcessedPostAggregateType<T>>

    /**
     * Group by ProcessedPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessedPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessedPostGroupByArgs['orderBy'] }
        : { orderBy?: ProcessedPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessedPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessedPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessedPost model
   */
  readonly fields: ProcessedPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessedPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessedPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessedPost model
   */
  interface ProcessedPostFieldRefs {
    readonly id: FieldRef<"ProcessedPost", 'Int'>
    readonly source_id: FieldRef<"ProcessedPost", 'Int'>
    readonly title: FieldRef<"ProcessedPost", 'String'>
    readonly content_length: FieldRef<"ProcessedPost", 'Int'>
    readonly user_ref: FieldRef<"ProcessedPost", 'Int'>
    readonly extracted_at: FieldRef<"ProcessedPost", 'DateTime'>
    readonly processed_at: FieldRef<"ProcessedPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessedPost findUnique
   */
  export type ProcessedPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedPost to fetch.
     */
    where: ProcessedPostWhereUniqueInput
  }

  /**
   * ProcessedPost findUniqueOrThrow
   */
  export type ProcessedPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedPost to fetch.
     */
    where: ProcessedPostWhereUniqueInput
  }

  /**
   * ProcessedPost findFirst
   */
  export type ProcessedPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedPost to fetch.
     */
    where?: ProcessedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedPosts to fetch.
     */
    orderBy?: ProcessedPostOrderByWithRelationInput | ProcessedPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedPosts.
     */
    cursor?: ProcessedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedPosts.
     */
    distinct?: ProcessedPostScalarFieldEnum | ProcessedPostScalarFieldEnum[]
  }

  /**
   * ProcessedPost findFirstOrThrow
   */
  export type ProcessedPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedPost to fetch.
     */
    where?: ProcessedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedPosts to fetch.
     */
    orderBy?: ProcessedPostOrderByWithRelationInput | ProcessedPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedPosts.
     */
    cursor?: ProcessedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedPosts.
     */
    distinct?: ProcessedPostScalarFieldEnum | ProcessedPostScalarFieldEnum[]
  }

  /**
   * ProcessedPost findMany
   */
  export type ProcessedPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * Filter, which ProcessedPosts to fetch.
     */
    where?: ProcessedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedPosts to fetch.
     */
    orderBy?: ProcessedPostOrderByWithRelationInput | ProcessedPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessedPosts.
     */
    cursor?: ProcessedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedPosts.
     */
    skip?: number
    distinct?: ProcessedPostScalarFieldEnum | ProcessedPostScalarFieldEnum[]
  }

  /**
   * ProcessedPost create
   */
  export type ProcessedPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * The data needed to create a ProcessedPost.
     */
    data: XOR<ProcessedPostCreateInput, ProcessedPostUncheckedCreateInput>
  }

  /**
   * ProcessedPost createMany
   */
  export type ProcessedPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessedPosts.
     */
    data: ProcessedPostCreateManyInput | ProcessedPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedPost createManyAndReturn
   */
  export type ProcessedPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * The data used to create many ProcessedPosts.
     */
    data: ProcessedPostCreateManyInput | ProcessedPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedPost update
   */
  export type ProcessedPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * The data needed to update a ProcessedPost.
     */
    data: XOR<ProcessedPostUpdateInput, ProcessedPostUncheckedUpdateInput>
    /**
     * Choose, which ProcessedPost to update.
     */
    where: ProcessedPostWhereUniqueInput
  }

  /**
   * ProcessedPost updateMany
   */
  export type ProcessedPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessedPosts.
     */
    data: XOR<ProcessedPostUpdateManyMutationInput, ProcessedPostUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedPosts to update
     */
    where?: ProcessedPostWhereInput
    /**
     * Limit how many ProcessedPosts to update.
     */
    limit?: number
  }

  /**
   * ProcessedPost updateManyAndReturn
   */
  export type ProcessedPostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * The data used to update ProcessedPosts.
     */
    data: XOR<ProcessedPostUpdateManyMutationInput, ProcessedPostUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedPosts to update
     */
    where?: ProcessedPostWhereInput
    /**
     * Limit how many ProcessedPosts to update.
     */
    limit?: number
  }

  /**
   * ProcessedPost upsert
   */
  export type ProcessedPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * The filter to search for the ProcessedPost to update in case it exists.
     */
    where: ProcessedPostWhereUniqueInput
    /**
     * In case the ProcessedPost found by the `where` argument doesn't exist, create a new ProcessedPost with this data.
     */
    create: XOR<ProcessedPostCreateInput, ProcessedPostUncheckedCreateInput>
    /**
     * In case the ProcessedPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessedPostUpdateInput, ProcessedPostUncheckedUpdateInput>
  }

  /**
   * ProcessedPost delete
   */
  export type ProcessedPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
    /**
     * Filter which ProcessedPost to delete.
     */
    where: ProcessedPostWhereUniqueInput
  }

  /**
   * ProcessedPost deleteMany
   */
  export type ProcessedPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedPosts to delete
     */
    where?: ProcessedPostWhereInput
    /**
     * Limit how many ProcessedPosts to delete.
     */
    limit?: number
  }

  /**
   * ProcessedPost without action
   */
  export type ProcessedPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedPost
     */
    select?: ProcessedPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedPost
     */
    omit?: ProcessedPostOmit<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    id: number | null
    branchId: number | null
    ccStaffId: number | null
    marStaffId: number | null
    staffId: number | null
    state: number | null
  }

  export type CustomerSumAggregateOutputType = {
    id: number | null
    branchId: number | null
    ccStaffId: number | null
    marStaffId: number | null
    staffId: number | null
    state: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: number | null
    source_id: string | null
    name: string | null
    code: string | null
    codeOld: string | null
    docCode: string | null
    email: string | null
    phone: string | null
    phone2: string | null
    birthday: Date | null
    gender: string | null
    address: string | null
    commune: string | null
    district: string | null
    city: string | null
    citizenIdentity: string | null
    identityGrantDate: Date | null
    identityIssuedBy: string | null
    customerSource: string | null
    customerGroup: string | null
    branchId: number | null
    firstPaidDate: Date | null
    firstCheckinDate: Date | null
    firstTreatmentDate: Date | null
    lastTreatmentDate: Date | null
    lastCheckinDate: Date | null
    ccStaffId: number | null
    caringStaffCode: string | null
    marStaffId: number | null
    marStaffCode: string | null
    staffId: number | null
    staffCode: string | null
    gclid: string | null
    state: number | null
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    modifiedBy: string | null
    extractedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: number | null
    source_id: string | null
    name: string | null
    code: string | null
    codeOld: string | null
    docCode: string | null
    email: string | null
    phone: string | null
    phone2: string | null
    birthday: Date | null
    gender: string | null
    address: string | null
    commune: string | null
    district: string | null
    city: string | null
    citizenIdentity: string | null
    identityGrantDate: Date | null
    identityIssuedBy: string | null
    customerSource: string | null
    customerGroup: string | null
    branchId: number | null
    firstPaidDate: Date | null
    firstCheckinDate: Date | null
    firstTreatmentDate: Date | null
    lastTreatmentDate: Date | null
    lastCheckinDate: Date | null
    ccStaffId: number | null
    caringStaffCode: string | null
    marStaffId: number | null
    marStaffCode: string | null
    staffId: number | null
    staffCode: string | null
    gclid: string | null
    state: number | null
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    modifiedBy: string | null
    extractedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    source_id: number
    name: number
    code: number
    codeOld: number
    docCode: number
    email: number
    phone: number
    phone2: number
    birthday: number
    gender: number
    address: number
    commune: number
    district: number
    city: number
    citizenIdentity: number
    identityGrantDate: number
    identityIssuedBy: number
    customerSource: number
    customerGroup: number
    branchId: number
    firstPaidDate: number
    firstCheckinDate: number
    firstTreatmentDate: number
    lastTreatmentDate: number
    lastCheckinDate: number
    ccStaffId: number
    caringStaffCode: number
    marStaffId: number
    marStaffCode: number
    staffId: number
    staffCode: number
    gclid: number
    state: number
    createdDate: number
    createdBy: number
    modifiedDate: number
    modifiedBy: number
    extractedAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    id?: true
    branchId?: true
    ccStaffId?: true
    marStaffId?: true
    staffId?: true
    state?: true
  }

  export type CustomerSumAggregateInputType = {
    id?: true
    branchId?: true
    ccStaffId?: true
    marStaffId?: true
    staffId?: true
    state?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    source_id?: true
    name?: true
    code?: true
    codeOld?: true
    docCode?: true
    email?: true
    phone?: true
    phone2?: true
    birthday?: true
    gender?: true
    address?: true
    commune?: true
    district?: true
    city?: true
    citizenIdentity?: true
    identityGrantDate?: true
    identityIssuedBy?: true
    customerSource?: true
    customerGroup?: true
    branchId?: true
    firstPaidDate?: true
    firstCheckinDate?: true
    firstTreatmentDate?: true
    lastTreatmentDate?: true
    lastCheckinDate?: true
    ccStaffId?: true
    caringStaffCode?: true
    marStaffId?: true
    marStaffCode?: true
    staffId?: true
    staffCode?: true
    gclid?: true
    state?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    modifiedBy?: true
    extractedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    source_id?: true
    name?: true
    code?: true
    codeOld?: true
    docCode?: true
    email?: true
    phone?: true
    phone2?: true
    birthday?: true
    gender?: true
    address?: true
    commune?: true
    district?: true
    city?: true
    citizenIdentity?: true
    identityGrantDate?: true
    identityIssuedBy?: true
    customerSource?: true
    customerGroup?: true
    branchId?: true
    firstPaidDate?: true
    firstCheckinDate?: true
    firstTreatmentDate?: true
    lastTreatmentDate?: true
    lastCheckinDate?: true
    ccStaffId?: true
    caringStaffCode?: true
    marStaffId?: true
    marStaffCode?: true
    staffId?: true
    staffCode?: true
    gclid?: true
    state?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    modifiedBy?: true
    extractedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    source_id?: true
    name?: true
    code?: true
    codeOld?: true
    docCode?: true
    email?: true
    phone?: true
    phone2?: true
    birthday?: true
    gender?: true
    address?: true
    commune?: true
    district?: true
    city?: true
    citizenIdentity?: true
    identityGrantDate?: true
    identityIssuedBy?: true
    customerSource?: true
    customerGroup?: true
    branchId?: true
    firstPaidDate?: true
    firstCheckinDate?: true
    firstTreatmentDate?: true
    lastTreatmentDate?: true
    lastCheckinDate?: true
    ccStaffId?: true
    caringStaffCode?: true
    marStaffId?: true
    marStaffCode?: true
    staffId?: true
    staffCode?: true
    gclid?: true
    state?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    modifiedBy?: true
    extractedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: number
    source_id: string | null
    name: string | null
    code: string | null
    codeOld: string | null
    docCode: string | null
    email: string | null
    phone: string | null
    phone2: string | null
    birthday: Date | null
    gender: string | null
    address: string | null
    commune: string | null
    district: string | null
    city: string | null
    citizenIdentity: string | null
    identityGrantDate: Date | null
    identityIssuedBy: string | null
    customerSource: string | null
    customerGroup: string | null
    branchId: number | null
    firstPaidDate: Date | null
    firstCheckinDate: Date | null
    firstTreatmentDate: Date | null
    lastTreatmentDate: Date | null
    lastCheckinDate: Date | null
    ccStaffId: number | null
    caringStaffCode: string | null
    marStaffId: number | null
    marStaffCode: string | null
    staffId: number | null
    staffCode: string | null
    gclid: string | null
    state: number | null
    createdDate: Date
    createdBy: string | null
    modifiedDate: Date
    modifiedBy: string | null
    extractedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    name?: boolean
    code?: boolean
    codeOld?: boolean
    docCode?: boolean
    email?: boolean
    phone?: boolean
    phone2?: boolean
    birthday?: boolean
    gender?: boolean
    address?: boolean
    commune?: boolean
    district?: boolean
    city?: boolean
    citizenIdentity?: boolean
    identityGrantDate?: boolean
    identityIssuedBy?: boolean
    customerSource?: boolean
    customerGroup?: boolean
    branchId?: boolean
    firstPaidDate?: boolean
    firstCheckinDate?: boolean
    firstTreatmentDate?: boolean
    lastTreatmentDate?: boolean
    lastCheckinDate?: boolean
    ccStaffId?: boolean
    caringStaffCode?: boolean
    marStaffId?: boolean
    marStaffCode?: boolean
    staffId?: boolean
    staffCode?: boolean
    gclid?: boolean
    state?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    name?: boolean
    code?: boolean
    codeOld?: boolean
    docCode?: boolean
    email?: boolean
    phone?: boolean
    phone2?: boolean
    birthday?: boolean
    gender?: boolean
    address?: boolean
    commune?: boolean
    district?: boolean
    city?: boolean
    citizenIdentity?: boolean
    identityGrantDate?: boolean
    identityIssuedBy?: boolean
    customerSource?: boolean
    customerGroup?: boolean
    branchId?: boolean
    firstPaidDate?: boolean
    firstCheckinDate?: boolean
    firstTreatmentDate?: boolean
    lastTreatmentDate?: boolean
    lastCheckinDate?: boolean
    ccStaffId?: boolean
    caringStaffCode?: boolean
    marStaffId?: boolean
    marStaffCode?: boolean
    staffId?: boolean
    staffCode?: boolean
    gclid?: boolean
    state?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    name?: boolean
    code?: boolean
    codeOld?: boolean
    docCode?: boolean
    email?: boolean
    phone?: boolean
    phone2?: boolean
    birthday?: boolean
    gender?: boolean
    address?: boolean
    commune?: boolean
    district?: boolean
    city?: boolean
    citizenIdentity?: boolean
    identityGrantDate?: boolean
    identityIssuedBy?: boolean
    customerSource?: boolean
    customerGroup?: boolean
    branchId?: boolean
    firstPaidDate?: boolean
    firstCheckinDate?: boolean
    firstTreatmentDate?: boolean
    lastTreatmentDate?: boolean
    lastCheckinDate?: boolean
    ccStaffId?: boolean
    caringStaffCode?: boolean
    marStaffId?: boolean
    marStaffCode?: boolean
    staffId?: boolean
    staffCode?: boolean
    gclid?: boolean
    state?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    source_id?: boolean
    name?: boolean
    code?: boolean
    codeOld?: boolean
    docCode?: boolean
    email?: boolean
    phone?: boolean
    phone2?: boolean
    birthday?: boolean
    gender?: boolean
    address?: boolean
    commune?: boolean
    district?: boolean
    city?: boolean
    citizenIdentity?: boolean
    identityGrantDate?: boolean
    identityIssuedBy?: boolean
    customerSource?: boolean
    customerGroup?: boolean
    branchId?: boolean
    firstPaidDate?: boolean
    firstCheckinDate?: boolean
    firstTreatmentDate?: boolean
    lastTreatmentDate?: boolean
    lastCheckinDate?: boolean
    ccStaffId?: boolean
    caringStaffCode?: boolean
    marStaffId?: boolean
    marStaffCode?: boolean
    staffId?: boolean
    staffCode?: boolean
    gclid?: boolean
    state?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    extractedAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source_id" | "name" | "code" | "codeOld" | "docCode" | "email" | "phone" | "phone2" | "birthday" | "gender" | "address" | "commune" | "district" | "city" | "citizenIdentity" | "identityGrantDate" | "identityIssuedBy" | "customerSource" | "customerGroup" | "branchId" | "firstPaidDate" | "firstCheckinDate" | "firstTreatmentDate" | "lastTreatmentDate" | "lastCheckinDate" | "ccStaffId" | "caringStaffCode" | "marStaffId" | "marStaffCode" | "staffId" | "staffCode" | "gclid" | "state" | "createdDate" | "createdBy" | "modifiedDate" | "modifiedBy" | "extractedAt", ExtArgs["result"]["customer"]>

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      source_id: string | null
      name: string | null
      code: string | null
      codeOld: string | null
      docCode: string | null
      email: string | null
      phone: string | null
      phone2: string | null
      birthday: Date | null
      gender: string | null
      address: string | null
      commune: string | null
      district: string | null
      city: string | null
      citizenIdentity: string | null
      identityGrantDate: Date | null
      identityIssuedBy: string | null
      customerSource: string | null
      customerGroup: string | null
      branchId: number | null
      firstPaidDate: Date | null
      firstCheckinDate: Date | null
      firstTreatmentDate: Date | null
      lastTreatmentDate: Date | null
      lastCheckinDate: Date | null
      ccStaffId: number | null
      caringStaffCode: string | null
      marStaffId: number | null
      marStaffCode: string | null
      staffId: number | null
      staffCode: string | null
      gclid: string | null
      state: number | null
      createdDate: Date
      createdBy: string | null
      modifiedDate: Date
      modifiedBy: string | null
      extractedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'Int'>
    readonly source_id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly code: FieldRef<"Customer", 'String'>
    readonly codeOld: FieldRef<"Customer", 'String'>
    readonly docCode: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly phone2: FieldRef<"Customer", 'String'>
    readonly birthday: FieldRef<"Customer", 'DateTime'>
    readonly gender: FieldRef<"Customer", 'String'>
    readonly address: FieldRef<"Customer", 'String'>
    readonly commune: FieldRef<"Customer", 'String'>
    readonly district: FieldRef<"Customer", 'String'>
    readonly city: FieldRef<"Customer", 'String'>
    readonly citizenIdentity: FieldRef<"Customer", 'String'>
    readonly identityGrantDate: FieldRef<"Customer", 'DateTime'>
    readonly identityIssuedBy: FieldRef<"Customer", 'String'>
    readonly customerSource: FieldRef<"Customer", 'String'>
    readonly customerGroup: FieldRef<"Customer", 'String'>
    readonly branchId: FieldRef<"Customer", 'Int'>
    readonly firstPaidDate: FieldRef<"Customer", 'DateTime'>
    readonly firstCheckinDate: FieldRef<"Customer", 'DateTime'>
    readonly firstTreatmentDate: FieldRef<"Customer", 'DateTime'>
    readonly lastTreatmentDate: FieldRef<"Customer", 'DateTime'>
    readonly lastCheckinDate: FieldRef<"Customer", 'DateTime'>
    readonly ccStaffId: FieldRef<"Customer", 'Int'>
    readonly caringStaffCode: FieldRef<"Customer", 'String'>
    readonly marStaffId: FieldRef<"Customer", 'Int'>
    readonly marStaffCode: FieldRef<"Customer", 'String'>
    readonly staffId: FieldRef<"Customer", 'Int'>
    readonly staffCode: FieldRef<"Customer", 'String'>
    readonly gclid: FieldRef<"Customer", 'String'>
    readonly state: FieldRef<"Customer", 'Int'>
    readonly createdDate: FieldRef<"Customer", 'DateTime'>
    readonly createdBy: FieldRef<"Customer", 'String'>
    readonly modifiedDate: FieldRef<"Customer", 'DateTime'>
    readonly modifiedBy: FieldRef<"Customer", 'String'>
    readonly extractedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProcessedPostScalarFieldEnum: {
    id: 'id',
    source_id: 'source_id',
    title: 'title',
    content_length: 'content_length',
    user_ref: 'user_ref',
    extracted_at: 'extracted_at',
    processed_at: 'processed_at'
  };

  export type ProcessedPostScalarFieldEnum = (typeof ProcessedPostScalarFieldEnum)[keyof typeof ProcessedPostScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    source_id: 'source_id',
    name: 'name',
    code: 'code',
    codeOld: 'codeOld',
    docCode: 'docCode',
    email: 'email',
    phone: 'phone',
    phone2: 'phone2',
    birthday: 'birthday',
    gender: 'gender',
    address: 'address',
    commune: 'commune',
    district: 'district',
    city: 'city',
    citizenIdentity: 'citizenIdentity',
    identityGrantDate: 'identityGrantDate',
    identityIssuedBy: 'identityIssuedBy',
    customerSource: 'customerSource',
    customerGroup: 'customerGroup',
    branchId: 'branchId',
    firstPaidDate: 'firstPaidDate',
    firstCheckinDate: 'firstCheckinDate',
    firstTreatmentDate: 'firstTreatmentDate',
    lastTreatmentDate: 'lastTreatmentDate',
    lastCheckinDate: 'lastCheckinDate',
    ccStaffId: 'ccStaffId',
    caringStaffCode: 'caringStaffCode',
    marStaffId: 'marStaffId',
    marStaffCode: 'marStaffCode',
    staffId: 'staffId',
    staffCode: 'staffCode',
    gclid: 'gclid',
    state: 'state',
    createdDate: 'createdDate',
    createdBy: 'createdBy',
    modifiedDate: 'modifiedDate',
    modifiedBy: 'modifiedBy',
    extractedAt: 'extractedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProcessedPostWhereInput = {
    AND?: ProcessedPostWhereInput | ProcessedPostWhereInput[]
    OR?: ProcessedPostWhereInput[]
    NOT?: ProcessedPostWhereInput | ProcessedPostWhereInput[]
    id?: IntFilter<"ProcessedPost"> | number
    source_id?: IntFilter<"ProcessedPost"> | number
    title?: StringNullableFilter<"ProcessedPost"> | string | null
    content_length?: IntFilter<"ProcessedPost"> | number
    user_ref?: IntNullableFilter<"ProcessedPost"> | number | null
    extracted_at?: DateTimeFilter<"ProcessedPost"> | Date | string
    processed_at?: DateTimeFilter<"ProcessedPost"> | Date | string
  }

  export type ProcessedPostOrderByWithRelationInput = {
    id?: SortOrder
    source_id?: SortOrder
    title?: SortOrderInput | SortOrder
    content_length?: SortOrder
    user_ref?: SortOrderInput | SortOrder
    extracted_at?: SortOrder
    processed_at?: SortOrder
  }

  export type ProcessedPostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    source_id?: number
    AND?: ProcessedPostWhereInput | ProcessedPostWhereInput[]
    OR?: ProcessedPostWhereInput[]
    NOT?: ProcessedPostWhereInput | ProcessedPostWhereInput[]
    title?: StringNullableFilter<"ProcessedPost"> | string | null
    content_length?: IntFilter<"ProcessedPost"> | number
    user_ref?: IntNullableFilter<"ProcessedPost"> | number | null
    extracted_at?: DateTimeFilter<"ProcessedPost"> | Date | string
    processed_at?: DateTimeFilter<"ProcessedPost"> | Date | string
  }, "id" | "source_id">

  export type ProcessedPostOrderByWithAggregationInput = {
    id?: SortOrder
    source_id?: SortOrder
    title?: SortOrderInput | SortOrder
    content_length?: SortOrder
    user_ref?: SortOrderInput | SortOrder
    extracted_at?: SortOrder
    processed_at?: SortOrder
    _count?: ProcessedPostCountOrderByAggregateInput
    _avg?: ProcessedPostAvgOrderByAggregateInput
    _max?: ProcessedPostMaxOrderByAggregateInput
    _min?: ProcessedPostMinOrderByAggregateInput
    _sum?: ProcessedPostSumOrderByAggregateInput
  }

  export type ProcessedPostScalarWhereWithAggregatesInput = {
    AND?: ProcessedPostScalarWhereWithAggregatesInput | ProcessedPostScalarWhereWithAggregatesInput[]
    OR?: ProcessedPostScalarWhereWithAggregatesInput[]
    NOT?: ProcessedPostScalarWhereWithAggregatesInput | ProcessedPostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProcessedPost"> | number
    source_id?: IntWithAggregatesFilter<"ProcessedPost"> | number
    title?: StringNullableWithAggregatesFilter<"ProcessedPost"> | string | null
    content_length?: IntWithAggregatesFilter<"ProcessedPost"> | number
    user_ref?: IntNullableWithAggregatesFilter<"ProcessedPost"> | number | null
    extracted_at?: DateTimeWithAggregatesFilter<"ProcessedPost"> | Date | string
    processed_at?: DateTimeWithAggregatesFilter<"ProcessedPost"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: IntFilter<"Customer"> | number
    source_id?: StringNullableFilter<"Customer"> | string | null
    name?: StringNullableFilter<"Customer"> | string | null
    code?: StringNullableFilter<"Customer"> | string | null
    codeOld?: StringNullableFilter<"Customer"> | string | null
    docCode?: StringNullableFilter<"Customer"> | string | null
    email?: StringNullableFilter<"Customer"> | string | null
    phone?: StringNullableFilter<"Customer"> | string | null
    phone2?: StringNullableFilter<"Customer"> | string | null
    birthday?: DateTimeNullableFilter<"Customer"> | Date | string | null
    gender?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    commune?: StringNullableFilter<"Customer"> | string | null
    district?: StringNullableFilter<"Customer"> | string | null
    city?: StringNullableFilter<"Customer"> | string | null
    citizenIdentity?: StringNullableFilter<"Customer"> | string | null
    identityGrantDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    identityIssuedBy?: StringNullableFilter<"Customer"> | string | null
    customerSource?: StringNullableFilter<"Customer"> | string | null
    customerGroup?: StringNullableFilter<"Customer"> | string | null
    branchId?: IntNullableFilter<"Customer"> | number | null
    firstPaidDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    firstCheckinDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    firstTreatmentDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    lastTreatmentDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    lastCheckinDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    ccStaffId?: IntNullableFilter<"Customer"> | number | null
    caringStaffCode?: StringNullableFilter<"Customer"> | string | null
    marStaffId?: IntNullableFilter<"Customer"> | number | null
    marStaffCode?: StringNullableFilter<"Customer"> | string | null
    staffId?: IntNullableFilter<"Customer"> | number | null
    staffCode?: StringNullableFilter<"Customer"> | string | null
    gclid?: StringNullableFilter<"Customer"> | string | null
    state?: IntNullableFilter<"Customer"> | number | null
    createdDate?: DateTimeFilter<"Customer"> | Date | string
    createdBy?: StringNullableFilter<"Customer"> | string | null
    modifiedDate?: DateTimeFilter<"Customer"> | Date | string
    modifiedBy?: StringNullableFilter<"Customer"> | string | null
    extractedAt?: DateTimeFilter<"Customer"> | Date | string
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    source_id?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    code?: SortOrderInput | SortOrder
    codeOld?: SortOrderInput | SortOrder
    docCode?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    phone2?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    commune?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    citizenIdentity?: SortOrderInput | SortOrder
    identityGrantDate?: SortOrderInput | SortOrder
    identityIssuedBy?: SortOrderInput | SortOrder
    customerSource?: SortOrderInput | SortOrder
    customerGroup?: SortOrderInput | SortOrder
    branchId?: SortOrderInput | SortOrder
    firstPaidDate?: SortOrderInput | SortOrder
    firstCheckinDate?: SortOrderInput | SortOrder
    firstTreatmentDate?: SortOrderInput | SortOrder
    lastTreatmentDate?: SortOrderInput | SortOrder
    lastCheckinDate?: SortOrderInput | SortOrder
    ccStaffId?: SortOrderInput | SortOrder
    caringStaffCode?: SortOrderInput | SortOrder
    marStaffId?: SortOrderInput | SortOrder
    marStaffCode?: SortOrderInput | SortOrder
    staffId?: SortOrderInput | SortOrder
    staffCode?: SortOrderInput | SortOrder
    gclid?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrderInput | SortOrder
    extractedAt?: SortOrder
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    source_id?: string
    code?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringNullableFilter<"Customer"> | string | null
    codeOld?: StringNullableFilter<"Customer"> | string | null
    docCode?: StringNullableFilter<"Customer"> | string | null
    email?: StringNullableFilter<"Customer"> | string | null
    phone?: StringNullableFilter<"Customer"> | string | null
    phone2?: StringNullableFilter<"Customer"> | string | null
    birthday?: DateTimeNullableFilter<"Customer"> | Date | string | null
    gender?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    commune?: StringNullableFilter<"Customer"> | string | null
    district?: StringNullableFilter<"Customer"> | string | null
    city?: StringNullableFilter<"Customer"> | string | null
    citizenIdentity?: StringNullableFilter<"Customer"> | string | null
    identityGrantDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    identityIssuedBy?: StringNullableFilter<"Customer"> | string | null
    customerSource?: StringNullableFilter<"Customer"> | string | null
    customerGroup?: StringNullableFilter<"Customer"> | string | null
    branchId?: IntNullableFilter<"Customer"> | number | null
    firstPaidDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    firstCheckinDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    firstTreatmentDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    lastTreatmentDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    lastCheckinDate?: DateTimeNullableFilter<"Customer"> | Date | string | null
    ccStaffId?: IntNullableFilter<"Customer"> | number | null
    caringStaffCode?: StringNullableFilter<"Customer"> | string | null
    marStaffId?: IntNullableFilter<"Customer"> | number | null
    marStaffCode?: StringNullableFilter<"Customer"> | string | null
    staffId?: IntNullableFilter<"Customer"> | number | null
    staffCode?: StringNullableFilter<"Customer"> | string | null
    gclid?: StringNullableFilter<"Customer"> | string | null
    state?: IntNullableFilter<"Customer"> | number | null
    createdDate?: DateTimeFilter<"Customer"> | Date | string
    createdBy?: StringNullableFilter<"Customer"> | string | null
    modifiedDate?: DateTimeFilter<"Customer"> | Date | string
    modifiedBy?: StringNullableFilter<"Customer"> | string | null
    extractedAt?: DateTimeFilter<"Customer"> | Date | string
  }, "id" | "source_id" | "code">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    source_id?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    code?: SortOrderInput | SortOrder
    codeOld?: SortOrderInput | SortOrder
    docCode?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    phone2?: SortOrderInput | SortOrder
    birthday?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    commune?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    citizenIdentity?: SortOrderInput | SortOrder
    identityGrantDate?: SortOrderInput | SortOrder
    identityIssuedBy?: SortOrderInput | SortOrder
    customerSource?: SortOrderInput | SortOrder
    customerGroup?: SortOrderInput | SortOrder
    branchId?: SortOrderInput | SortOrder
    firstPaidDate?: SortOrderInput | SortOrder
    firstCheckinDate?: SortOrderInput | SortOrder
    firstTreatmentDate?: SortOrderInput | SortOrder
    lastTreatmentDate?: SortOrderInput | SortOrder
    lastCheckinDate?: SortOrderInput | SortOrder
    ccStaffId?: SortOrderInput | SortOrder
    caringStaffCode?: SortOrderInput | SortOrder
    marStaffId?: SortOrderInput | SortOrder
    marStaffCode?: SortOrderInput | SortOrder
    staffId?: SortOrderInput | SortOrder
    staffCode?: SortOrderInput | SortOrder
    gclid?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrderInput | SortOrder
    extractedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Customer"> | number
    source_id?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    name?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    code?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    codeOld?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    docCode?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    email?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    phone2?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    birthday?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    address?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    commune?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    district?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    city?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    citizenIdentity?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    identityGrantDate?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    identityIssuedBy?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    customerSource?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    customerGroup?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    branchId?: IntNullableWithAggregatesFilter<"Customer"> | number | null
    firstPaidDate?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    firstCheckinDate?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    firstTreatmentDate?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    lastTreatmentDate?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    lastCheckinDate?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    ccStaffId?: IntNullableWithAggregatesFilter<"Customer"> | number | null
    caringStaffCode?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    marStaffId?: IntNullableWithAggregatesFilter<"Customer"> | number | null
    marStaffCode?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    staffId?: IntNullableWithAggregatesFilter<"Customer"> | number | null
    staffCode?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    gclid?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    state?: IntNullableWithAggregatesFilter<"Customer"> | number | null
    createdDate?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    modifiedDate?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    modifiedBy?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    extractedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type ProcessedPostCreateInput = {
    source_id: number
    title?: string | null
    content_length: number
    user_ref?: number | null
    extracted_at?: Date | string
    processed_at?: Date | string
  }

  export type ProcessedPostUncheckedCreateInput = {
    id?: number
    source_id: number
    title?: string | null
    content_length: number
    user_ref?: number | null
    extracted_at?: Date | string
    processed_at?: Date | string
  }

  export type ProcessedPostUpdateInput = {
    source_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content_length?: IntFieldUpdateOperationsInput | number
    user_ref?: NullableIntFieldUpdateOperationsInput | number | null
    extracted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedPostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content_length?: IntFieldUpdateOperationsInput | number
    user_ref?: NullableIntFieldUpdateOperationsInput | number | null
    extracted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedPostCreateManyInput = {
    id?: number
    source_id: number
    title?: string | null
    content_length: number
    user_ref?: number | null
    extracted_at?: Date | string
    processed_at?: Date | string
  }

  export type ProcessedPostUpdateManyMutationInput = {
    source_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content_length?: IntFieldUpdateOperationsInput | number
    user_ref?: NullableIntFieldUpdateOperationsInput | number | null
    extracted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedPostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content_length?: IntFieldUpdateOperationsInput | number
    user_ref?: NullableIntFieldUpdateOperationsInput | number | null
    extracted_at?: DateTimeFieldUpdateOperationsInput | Date | string
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    source_id?: string | null
    name?: string | null
    code?: string | null
    codeOld?: string | null
    docCode?: string | null
    email?: string | null
    phone?: string | null
    phone2?: string | null
    birthday?: Date | string | null
    gender?: string | null
    address?: string | null
    commune?: string | null
    district?: string | null
    city?: string | null
    citizenIdentity?: string | null
    identityGrantDate?: Date | string | null
    identityIssuedBy?: string | null
    customerSource?: string | null
    customerGroup?: string | null
    branchId?: number | null
    firstPaidDate?: Date | string | null
    firstCheckinDate?: Date | string | null
    firstTreatmentDate?: Date | string | null
    lastTreatmentDate?: Date | string | null
    lastCheckinDate?: Date | string | null
    ccStaffId?: number | null
    caringStaffCode?: string | null
    marStaffId?: number | null
    marStaffCode?: string | null
    staffId?: number | null
    staffCode?: string | null
    gclid?: string | null
    state?: number | null
    createdDate?: Date | string
    createdBy?: string | null
    modifiedDate?: Date | string
    modifiedBy?: string | null
    extractedAt?: Date | string
  }

  export type CustomerUncheckedCreateInput = {
    id?: number
    source_id?: string | null
    name?: string | null
    code?: string | null
    codeOld?: string | null
    docCode?: string | null
    email?: string | null
    phone?: string | null
    phone2?: string | null
    birthday?: Date | string | null
    gender?: string | null
    address?: string | null
    commune?: string | null
    district?: string | null
    city?: string | null
    citizenIdentity?: string | null
    identityGrantDate?: Date | string | null
    identityIssuedBy?: string | null
    customerSource?: string | null
    customerGroup?: string | null
    branchId?: number | null
    firstPaidDate?: Date | string | null
    firstCheckinDate?: Date | string | null
    firstTreatmentDate?: Date | string | null
    lastTreatmentDate?: Date | string | null
    lastCheckinDate?: Date | string | null
    ccStaffId?: number | null
    caringStaffCode?: string | null
    marStaffId?: number | null
    marStaffCode?: string | null
    staffId?: number | null
    staffCode?: string | null
    gclid?: string | null
    state?: number | null
    createdDate?: Date | string
    createdBy?: string | null
    modifiedDate?: Date | string
    modifiedBy?: string | null
    extractedAt?: Date | string
  }

  export type CustomerUpdateInput = {
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    codeOld?: NullableStringFieldUpdateOperationsInput | string | null
    docCode?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    commune?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    citizenIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    identityGrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    identityIssuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerSource?: NullableStringFieldUpdateOperationsInput | string | null
    customerGroup?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    firstPaidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstCheckinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstTreatmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastTreatmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCheckinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ccStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    caringStaffCode?: NullableStringFieldUpdateOperationsInput | string | null
    marStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    marStaffCode?: NullableStringFieldUpdateOperationsInput | string | null
    staffId?: NullableIntFieldUpdateOperationsInput | number | null
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableIntFieldUpdateOperationsInput | number | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    modifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    codeOld?: NullableStringFieldUpdateOperationsInput | string | null
    docCode?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    commune?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    citizenIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    identityGrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    identityIssuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerSource?: NullableStringFieldUpdateOperationsInput | string | null
    customerGroup?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    firstPaidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstCheckinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstTreatmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastTreatmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCheckinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ccStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    caringStaffCode?: NullableStringFieldUpdateOperationsInput | string | null
    marStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    marStaffCode?: NullableStringFieldUpdateOperationsInput | string | null
    staffId?: NullableIntFieldUpdateOperationsInput | number | null
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableIntFieldUpdateOperationsInput | number | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    modifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateManyInput = {
    id?: number
    source_id?: string | null
    name?: string | null
    code?: string | null
    codeOld?: string | null
    docCode?: string | null
    email?: string | null
    phone?: string | null
    phone2?: string | null
    birthday?: Date | string | null
    gender?: string | null
    address?: string | null
    commune?: string | null
    district?: string | null
    city?: string | null
    citizenIdentity?: string | null
    identityGrantDate?: Date | string | null
    identityIssuedBy?: string | null
    customerSource?: string | null
    customerGroup?: string | null
    branchId?: number | null
    firstPaidDate?: Date | string | null
    firstCheckinDate?: Date | string | null
    firstTreatmentDate?: Date | string | null
    lastTreatmentDate?: Date | string | null
    lastCheckinDate?: Date | string | null
    ccStaffId?: number | null
    caringStaffCode?: string | null
    marStaffId?: number | null
    marStaffCode?: string | null
    staffId?: number | null
    staffCode?: string | null
    gclid?: string | null
    state?: number | null
    createdDate?: Date | string
    createdBy?: string | null
    modifiedDate?: Date | string
    modifiedBy?: string | null
    extractedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    codeOld?: NullableStringFieldUpdateOperationsInput | string | null
    docCode?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    commune?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    citizenIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    identityGrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    identityIssuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerSource?: NullableStringFieldUpdateOperationsInput | string | null
    customerGroup?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    firstPaidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstCheckinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstTreatmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastTreatmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCheckinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ccStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    caringStaffCode?: NullableStringFieldUpdateOperationsInput | string | null
    marStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    marStaffCode?: NullableStringFieldUpdateOperationsInput | string | null
    staffId?: NullableIntFieldUpdateOperationsInput | number | null
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableIntFieldUpdateOperationsInput | number | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    modifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    code?: NullableStringFieldUpdateOperationsInput | string | null
    codeOld?: NullableStringFieldUpdateOperationsInput | string | null
    docCode?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    phone2?: NullableStringFieldUpdateOperationsInput | string | null
    birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    commune?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    citizenIdentity?: NullableStringFieldUpdateOperationsInput | string | null
    identityGrantDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    identityIssuedBy?: NullableStringFieldUpdateOperationsInput | string | null
    customerSource?: NullableStringFieldUpdateOperationsInput | string | null
    customerGroup?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    firstPaidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstCheckinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    firstTreatmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastTreatmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCheckinDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ccStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    caringStaffCode?: NullableStringFieldUpdateOperationsInput | string | null
    marStaffId?: NullableIntFieldUpdateOperationsInput | number | null
    marStaffCode?: NullableStringFieldUpdateOperationsInput | string | null
    staffId?: NullableIntFieldUpdateOperationsInput | number | null
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    gclid?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableIntFieldUpdateOperationsInput | number | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    modifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProcessedPostCountOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    title?: SortOrder
    content_length?: SortOrder
    user_ref?: SortOrder
    extracted_at?: SortOrder
    processed_at?: SortOrder
  }

  export type ProcessedPostAvgOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    content_length?: SortOrder
    user_ref?: SortOrder
  }

  export type ProcessedPostMaxOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    title?: SortOrder
    content_length?: SortOrder
    user_ref?: SortOrder
    extracted_at?: SortOrder
    processed_at?: SortOrder
  }

  export type ProcessedPostMinOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    title?: SortOrder
    content_length?: SortOrder
    user_ref?: SortOrder
    extracted_at?: SortOrder
    processed_at?: SortOrder
  }

  export type ProcessedPostSumOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    content_length?: SortOrder
    user_ref?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    codeOld?: SortOrder
    docCode?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phone2?: SortOrder
    birthday?: SortOrder
    gender?: SortOrder
    address?: SortOrder
    commune?: SortOrder
    district?: SortOrder
    city?: SortOrder
    citizenIdentity?: SortOrder
    identityGrantDate?: SortOrder
    identityIssuedBy?: SortOrder
    customerSource?: SortOrder
    customerGroup?: SortOrder
    branchId?: SortOrder
    firstPaidDate?: SortOrder
    firstCheckinDate?: SortOrder
    firstTreatmentDate?: SortOrder
    lastTreatmentDate?: SortOrder
    lastCheckinDate?: SortOrder
    ccStaffId?: SortOrder
    caringStaffCode?: SortOrder
    marStaffId?: SortOrder
    marStaffCode?: SortOrder
    staffId?: SortOrder
    staffCode?: SortOrder
    gclid?: SortOrder
    state?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrder
    extractedAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    id?: SortOrder
    branchId?: SortOrder
    ccStaffId?: SortOrder
    marStaffId?: SortOrder
    staffId?: SortOrder
    state?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    codeOld?: SortOrder
    docCode?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phone2?: SortOrder
    birthday?: SortOrder
    gender?: SortOrder
    address?: SortOrder
    commune?: SortOrder
    district?: SortOrder
    city?: SortOrder
    citizenIdentity?: SortOrder
    identityGrantDate?: SortOrder
    identityIssuedBy?: SortOrder
    customerSource?: SortOrder
    customerGroup?: SortOrder
    branchId?: SortOrder
    firstPaidDate?: SortOrder
    firstCheckinDate?: SortOrder
    firstTreatmentDate?: SortOrder
    lastTreatmentDate?: SortOrder
    lastCheckinDate?: SortOrder
    ccStaffId?: SortOrder
    caringStaffCode?: SortOrder
    marStaffId?: SortOrder
    marStaffCode?: SortOrder
    staffId?: SortOrder
    staffCode?: SortOrder
    gclid?: SortOrder
    state?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrder
    extractedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    codeOld?: SortOrder
    docCode?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    phone2?: SortOrder
    birthday?: SortOrder
    gender?: SortOrder
    address?: SortOrder
    commune?: SortOrder
    district?: SortOrder
    city?: SortOrder
    citizenIdentity?: SortOrder
    identityGrantDate?: SortOrder
    identityIssuedBy?: SortOrder
    customerSource?: SortOrder
    customerGroup?: SortOrder
    branchId?: SortOrder
    firstPaidDate?: SortOrder
    firstCheckinDate?: SortOrder
    firstTreatmentDate?: SortOrder
    lastTreatmentDate?: SortOrder
    lastCheckinDate?: SortOrder
    ccStaffId?: SortOrder
    caringStaffCode?: SortOrder
    marStaffId?: SortOrder
    marStaffCode?: SortOrder
    staffId?: SortOrder
    staffCode?: SortOrder
    gclid?: SortOrder
    state?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrder
    extractedAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    id?: SortOrder
    branchId?: SortOrder
    ccStaffId?: SortOrder
    marStaffId?: SortOrder
    staffId?: SortOrder
    state?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}