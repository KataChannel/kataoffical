
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
 * Model Revenue
 * 
 */
export type Revenue = $Result.DefaultSelection<Prisma.$RevenuePayload>
/**
 * Model Treatment
 * 
 */
export type Treatment = $Result.DefaultSelection<Prisma.$TreatmentPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>

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

  /**
   * `prisma.revenue`: Exposes CRUD operations for the **Revenue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Revenues
    * const revenues = await prisma.revenue.findMany()
    * ```
    */
  get revenue(): Prisma.RevenueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.treatment`: Exposes CRUD operations for the **Treatment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Treatments
    * const treatments = await prisma.treatment.findMany()
    * ```
    */
  get treatment(): Prisma.TreatmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;
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
    Customer: 'Customer',
    Revenue: 'Revenue',
    Treatment: 'Treatment',
    Appointment: 'Appointment'
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
      modelProps: "processedPost" | "customer" | "revenue" | "treatment" | "appointment"
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
      Revenue: {
        payload: Prisma.$RevenuePayload<ExtArgs>
        fields: Prisma.RevenueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RevenueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RevenueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload>
          }
          findFirst: {
            args: Prisma.RevenueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RevenueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload>
          }
          findMany: {
            args: Prisma.RevenueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload>[]
          }
          create: {
            args: Prisma.RevenueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload>
          }
          createMany: {
            args: Prisma.RevenueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RevenueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload>[]
          }
          delete: {
            args: Prisma.RevenueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload>
          }
          update: {
            args: Prisma.RevenueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload>
          }
          deleteMany: {
            args: Prisma.RevenueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RevenueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RevenueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload>[]
          }
          upsert: {
            args: Prisma.RevenueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RevenuePayload>
          }
          aggregate: {
            args: Prisma.RevenueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRevenue>
          }
          groupBy: {
            args: Prisma.RevenueGroupByArgs<ExtArgs>
            result: $Utils.Optional<RevenueGroupByOutputType>[]
          }
          count: {
            args: Prisma.RevenueCountArgs<ExtArgs>
            result: $Utils.Optional<RevenueCountAggregateOutputType> | number
          }
        }
      }
      Treatment: {
        payload: Prisma.$TreatmentPayload<ExtArgs>
        fields: Prisma.TreatmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreatmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreatmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          findFirst: {
            args: Prisma.TreatmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreatmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          findMany: {
            args: Prisma.TreatmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
          }
          create: {
            args: Prisma.TreatmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          createMany: {
            args: Prisma.TreatmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TreatmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
          }
          delete: {
            args: Prisma.TreatmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          update: {
            args: Prisma.TreatmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          deleteMany: {
            args: Prisma.TreatmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TreatmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TreatmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
          }
          upsert: {
            args: Prisma.TreatmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          aggregate: {
            args: Prisma.TreatmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTreatment>
          }
          groupBy: {
            args: Prisma.TreatmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TreatmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreatmentCountArgs<ExtArgs>
            result: $Utils.Optional<TreatmentCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
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
    revenue?: RevenueOmit
    treatment?: TreatmentOmit
    appointment?: AppointmentOmit
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
   * Model Revenue
   */

  export type AggregateRevenue = {
    _count: RevenueCountAggregateOutputType | null
    _avg: RevenueAvgAggregateOutputType | null
    _sum: RevenueSumAggregateOutputType | null
    _min: RevenueMinAggregateOutputType | null
    _max: RevenueMaxAggregateOutputType | null
  }

  export type RevenueAvgAggregateOutputType = {
    id: number | null
    branchId: number | null
    depositId: number | null
    paidAmount: number | null
    discountAmount: number | null
    depositAmountUsing: number | null
    totalPaid: number | null
    debtAmount: number | null
    serviceId: number | null
    isProduct: number | null
    quantity: number | null
    priceRoot: number | null
    priceUnit: number | null
    price: number | null
    amount: number | null
    timeToTreatment: number | null
    percentOfService: number | null
    treatIndex: number | null
    consultId1: number | null
    consultId2: number | null
    consultId3: number | null
    consultId4: number | null
    techId: number | null
    tele1: number | null
    tele2: number | null
    state: number | null
  }

  export type RevenueSumAggregateOutputType = {
    id: number | null
    branchId: number | null
    depositId: number | null
    paidAmount: number | null
    discountAmount: number | null
    depositAmountUsing: number | null
    totalPaid: number | null
    debtAmount: number | null
    serviceId: number | null
    isProduct: number | null
    quantity: number | null
    priceRoot: number | null
    priceUnit: number | null
    price: number | null
    amount: number | null
    timeToTreatment: number | null
    percentOfService: number | null
    treatIndex: number | null
    consultId1: number | null
    consultId2: number | null
    consultId3: number | null
    consultId4: number | null
    techId: number | null
    tele1: number | null
    tele2: number | null
    state: number | null
  }

  export type RevenueMinAggregateOutputType = {
    id: number | null
    source_id: string | null
    code: string | null
    branchId: number | null
    custCode: string | null
    custName: string | null
    custPhone: string | null
    custAddress: string | null
    custBirthday: Date | null
    depositId: number | null
    paidAmount: number | null
    discountAmount: number | null
    depositAmountUsing: number | null
    totalPaid: number | null
    debtAmount: number | null
    methodName: string | null
    content: string | null
    serviceId: number | null
    isProduct: number | null
    quantity: number | null
    priceRoot: number | null
    priceUnit: number | null
    price: number | null
    amount: number | null
    timeToTreatment: number | null
    percentOfService: number | null
    treatIndex: number | null
    type: string | null
    typeName: string | null
    consultId1: number | null
    consultId2: number | null
    consultId3: number | null
    consultId4: number | null
    techId: number | null
    tele1: number | null
    tele2: number | null
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    state: number | null
    extractedAt: Date | null
  }

  export type RevenueMaxAggregateOutputType = {
    id: number | null
    source_id: string | null
    code: string | null
    branchId: number | null
    custCode: string | null
    custName: string | null
    custPhone: string | null
    custAddress: string | null
    custBirthday: Date | null
    depositId: number | null
    paidAmount: number | null
    discountAmount: number | null
    depositAmountUsing: number | null
    totalPaid: number | null
    debtAmount: number | null
    methodName: string | null
    content: string | null
    serviceId: number | null
    isProduct: number | null
    quantity: number | null
    priceRoot: number | null
    priceUnit: number | null
    price: number | null
    amount: number | null
    timeToTreatment: number | null
    percentOfService: number | null
    treatIndex: number | null
    type: string | null
    typeName: string | null
    consultId1: number | null
    consultId2: number | null
    consultId3: number | null
    consultId4: number | null
    techId: number | null
    tele1: number | null
    tele2: number | null
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    state: number | null
    extractedAt: Date | null
  }

  export type RevenueCountAggregateOutputType = {
    id: number
    source_id: number
    code: number
    branchId: number
    custCode: number
    custName: number
    custPhone: number
    custAddress: number
    custBirthday: number
    depositId: number
    paidAmount: number
    discountAmount: number
    depositAmountUsing: number
    totalPaid: number
    debtAmount: number
    methodName: number
    content: number
    serviceId: number
    isProduct: number
    quantity: number
    priceRoot: number
    priceUnit: number
    price: number
    amount: number
    timeToTreatment: number
    percentOfService: number
    treatIndex: number
    type: number
    typeName: number
    consultId1: number
    consultId2: number
    consultId3: number
    consultId4: number
    techId: number
    tele1: number
    tele2: number
    createdDate: number
    createdBy: number
    modifiedDate: number
    state: number
    extractedAt: number
    _all: number
  }


  export type RevenueAvgAggregateInputType = {
    id?: true
    branchId?: true
    depositId?: true
    paidAmount?: true
    discountAmount?: true
    depositAmountUsing?: true
    totalPaid?: true
    debtAmount?: true
    serviceId?: true
    isProduct?: true
    quantity?: true
    priceRoot?: true
    priceUnit?: true
    price?: true
    amount?: true
    timeToTreatment?: true
    percentOfService?: true
    treatIndex?: true
    consultId1?: true
    consultId2?: true
    consultId3?: true
    consultId4?: true
    techId?: true
    tele1?: true
    tele2?: true
    state?: true
  }

  export type RevenueSumAggregateInputType = {
    id?: true
    branchId?: true
    depositId?: true
    paidAmount?: true
    discountAmount?: true
    depositAmountUsing?: true
    totalPaid?: true
    debtAmount?: true
    serviceId?: true
    isProduct?: true
    quantity?: true
    priceRoot?: true
    priceUnit?: true
    price?: true
    amount?: true
    timeToTreatment?: true
    percentOfService?: true
    treatIndex?: true
    consultId1?: true
    consultId2?: true
    consultId3?: true
    consultId4?: true
    techId?: true
    tele1?: true
    tele2?: true
    state?: true
  }

  export type RevenueMinAggregateInputType = {
    id?: true
    source_id?: true
    code?: true
    branchId?: true
    custCode?: true
    custName?: true
    custPhone?: true
    custAddress?: true
    custBirthday?: true
    depositId?: true
    paidAmount?: true
    discountAmount?: true
    depositAmountUsing?: true
    totalPaid?: true
    debtAmount?: true
    methodName?: true
    content?: true
    serviceId?: true
    isProduct?: true
    quantity?: true
    priceRoot?: true
    priceUnit?: true
    price?: true
    amount?: true
    timeToTreatment?: true
    percentOfService?: true
    treatIndex?: true
    type?: true
    typeName?: true
    consultId1?: true
    consultId2?: true
    consultId3?: true
    consultId4?: true
    techId?: true
    tele1?: true
    tele2?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    state?: true
    extractedAt?: true
  }

  export type RevenueMaxAggregateInputType = {
    id?: true
    source_id?: true
    code?: true
    branchId?: true
    custCode?: true
    custName?: true
    custPhone?: true
    custAddress?: true
    custBirthday?: true
    depositId?: true
    paidAmount?: true
    discountAmount?: true
    depositAmountUsing?: true
    totalPaid?: true
    debtAmount?: true
    methodName?: true
    content?: true
    serviceId?: true
    isProduct?: true
    quantity?: true
    priceRoot?: true
    priceUnit?: true
    price?: true
    amount?: true
    timeToTreatment?: true
    percentOfService?: true
    treatIndex?: true
    type?: true
    typeName?: true
    consultId1?: true
    consultId2?: true
    consultId3?: true
    consultId4?: true
    techId?: true
    tele1?: true
    tele2?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    state?: true
    extractedAt?: true
  }

  export type RevenueCountAggregateInputType = {
    id?: true
    source_id?: true
    code?: true
    branchId?: true
    custCode?: true
    custName?: true
    custPhone?: true
    custAddress?: true
    custBirthday?: true
    depositId?: true
    paidAmount?: true
    discountAmount?: true
    depositAmountUsing?: true
    totalPaid?: true
    debtAmount?: true
    methodName?: true
    content?: true
    serviceId?: true
    isProduct?: true
    quantity?: true
    priceRoot?: true
    priceUnit?: true
    price?: true
    amount?: true
    timeToTreatment?: true
    percentOfService?: true
    treatIndex?: true
    type?: true
    typeName?: true
    consultId1?: true
    consultId2?: true
    consultId3?: true
    consultId4?: true
    techId?: true
    tele1?: true
    tele2?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    state?: true
    extractedAt?: true
    _all?: true
  }

  export type RevenueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Revenue to aggregate.
     */
    where?: RevenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revenues to fetch.
     */
    orderBy?: RevenueOrderByWithRelationInput | RevenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RevenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revenues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revenues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Revenues
    **/
    _count?: true | RevenueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RevenueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RevenueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RevenueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RevenueMaxAggregateInputType
  }

  export type GetRevenueAggregateType<T extends RevenueAggregateArgs> = {
        [P in keyof T & keyof AggregateRevenue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRevenue[P]>
      : GetScalarType<T[P], AggregateRevenue[P]>
  }




  export type RevenueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RevenueWhereInput
    orderBy?: RevenueOrderByWithAggregationInput | RevenueOrderByWithAggregationInput[]
    by: RevenueScalarFieldEnum[] | RevenueScalarFieldEnum
    having?: RevenueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RevenueCountAggregateInputType | true
    _avg?: RevenueAvgAggregateInputType
    _sum?: RevenueSumAggregateInputType
    _min?: RevenueMinAggregateInputType
    _max?: RevenueMaxAggregateInputType
  }

  export type RevenueGroupByOutputType = {
    id: number
    source_id: string
    code: string | null
    branchId: number | null
    custCode: string | null
    custName: string | null
    custPhone: string | null
    custAddress: string | null
    custBirthday: Date | null
    depositId: number | null
    paidAmount: number | null
    discountAmount: number
    depositAmountUsing: number
    totalPaid: number
    debtAmount: number
    methodName: string | null
    content: string | null
    serviceId: number
    isProduct: number
    quantity: number
    priceRoot: number
    priceUnit: number
    price: number
    amount: number
    timeToTreatment: number
    percentOfService: number
    treatIndex: number
    type: string | null
    typeName: string | null
    consultId1: number
    consultId2: number
    consultId3: number
    consultId4: number
    techId: number
    tele1: number
    tele2: number
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    state: number | null
    extractedAt: Date
    _count: RevenueCountAggregateOutputType | null
    _avg: RevenueAvgAggregateOutputType | null
    _sum: RevenueSumAggregateOutputType | null
    _min: RevenueMinAggregateOutputType | null
    _max: RevenueMaxAggregateOutputType | null
  }

  type GetRevenueGroupByPayload<T extends RevenueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RevenueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RevenueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RevenueGroupByOutputType[P]>
            : GetScalarType<T[P], RevenueGroupByOutputType[P]>
        }
      >
    >


  export type RevenueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    code?: boolean
    branchId?: boolean
    custCode?: boolean
    custName?: boolean
    custPhone?: boolean
    custAddress?: boolean
    custBirthday?: boolean
    depositId?: boolean
    paidAmount?: boolean
    discountAmount?: boolean
    depositAmountUsing?: boolean
    totalPaid?: boolean
    debtAmount?: boolean
    methodName?: boolean
    content?: boolean
    serviceId?: boolean
    isProduct?: boolean
    quantity?: boolean
    priceRoot?: boolean
    priceUnit?: boolean
    price?: boolean
    amount?: boolean
    timeToTreatment?: boolean
    percentOfService?: boolean
    treatIndex?: boolean
    type?: boolean
    typeName?: boolean
    consultId1?: boolean
    consultId2?: boolean
    consultId3?: boolean
    consultId4?: boolean
    techId?: boolean
    tele1?: boolean
    tele2?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    state?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["revenue"]>

  export type RevenueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    code?: boolean
    branchId?: boolean
    custCode?: boolean
    custName?: boolean
    custPhone?: boolean
    custAddress?: boolean
    custBirthday?: boolean
    depositId?: boolean
    paidAmount?: boolean
    discountAmount?: boolean
    depositAmountUsing?: boolean
    totalPaid?: boolean
    debtAmount?: boolean
    methodName?: boolean
    content?: boolean
    serviceId?: boolean
    isProduct?: boolean
    quantity?: boolean
    priceRoot?: boolean
    priceUnit?: boolean
    price?: boolean
    amount?: boolean
    timeToTreatment?: boolean
    percentOfService?: boolean
    treatIndex?: boolean
    type?: boolean
    typeName?: boolean
    consultId1?: boolean
    consultId2?: boolean
    consultId3?: boolean
    consultId4?: boolean
    techId?: boolean
    tele1?: boolean
    tele2?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    state?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["revenue"]>

  export type RevenueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    code?: boolean
    branchId?: boolean
    custCode?: boolean
    custName?: boolean
    custPhone?: boolean
    custAddress?: boolean
    custBirthday?: boolean
    depositId?: boolean
    paidAmount?: boolean
    discountAmount?: boolean
    depositAmountUsing?: boolean
    totalPaid?: boolean
    debtAmount?: boolean
    methodName?: boolean
    content?: boolean
    serviceId?: boolean
    isProduct?: boolean
    quantity?: boolean
    priceRoot?: boolean
    priceUnit?: boolean
    price?: boolean
    amount?: boolean
    timeToTreatment?: boolean
    percentOfService?: boolean
    treatIndex?: boolean
    type?: boolean
    typeName?: boolean
    consultId1?: boolean
    consultId2?: boolean
    consultId3?: boolean
    consultId4?: boolean
    techId?: boolean
    tele1?: boolean
    tele2?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    state?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["revenue"]>

  export type RevenueSelectScalar = {
    id?: boolean
    source_id?: boolean
    code?: boolean
    branchId?: boolean
    custCode?: boolean
    custName?: boolean
    custPhone?: boolean
    custAddress?: boolean
    custBirthday?: boolean
    depositId?: boolean
    paidAmount?: boolean
    discountAmount?: boolean
    depositAmountUsing?: boolean
    totalPaid?: boolean
    debtAmount?: boolean
    methodName?: boolean
    content?: boolean
    serviceId?: boolean
    isProduct?: boolean
    quantity?: boolean
    priceRoot?: boolean
    priceUnit?: boolean
    price?: boolean
    amount?: boolean
    timeToTreatment?: boolean
    percentOfService?: boolean
    treatIndex?: boolean
    type?: boolean
    typeName?: boolean
    consultId1?: boolean
    consultId2?: boolean
    consultId3?: boolean
    consultId4?: boolean
    techId?: boolean
    tele1?: boolean
    tele2?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    state?: boolean
    extractedAt?: boolean
  }

  export type RevenueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source_id" | "code" | "branchId" | "custCode" | "custName" | "custPhone" | "custAddress" | "custBirthday" | "depositId" | "paidAmount" | "discountAmount" | "depositAmountUsing" | "totalPaid" | "debtAmount" | "methodName" | "content" | "serviceId" | "isProduct" | "quantity" | "priceRoot" | "priceUnit" | "price" | "amount" | "timeToTreatment" | "percentOfService" | "treatIndex" | "type" | "typeName" | "consultId1" | "consultId2" | "consultId3" | "consultId4" | "techId" | "tele1" | "tele2" | "createdDate" | "createdBy" | "modifiedDate" | "state" | "extractedAt", ExtArgs["result"]["revenue"]>

  export type $RevenuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Revenue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      source_id: string
      code: string | null
      branchId: number | null
      custCode: string | null
      custName: string | null
      custPhone: string | null
      custAddress: string | null
      custBirthday: Date | null
      depositId: number | null
      paidAmount: number | null
      discountAmount: number
      depositAmountUsing: number
      totalPaid: number
      debtAmount: number
      methodName: string | null
      content: string | null
      serviceId: number
      isProduct: number
      quantity: number
      priceRoot: number
      priceUnit: number
      price: number
      amount: number
      timeToTreatment: number
      percentOfService: number
      treatIndex: number
      type: string | null
      typeName: string | null
      consultId1: number
      consultId2: number
      consultId3: number
      consultId4: number
      techId: number
      tele1: number
      tele2: number
      createdDate: Date | null
      createdBy: string | null
      modifiedDate: Date | null
      state: number | null
      extractedAt: Date
    }, ExtArgs["result"]["revenue"]>
    composites: {}
  }

  type RevenueGetPayload<S extends boolean | null | undefined | RevenueDefaultArgs> = $Result.GetResult<Prisma.$RevenuePayload, S>

  type RevenueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RevenueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RevenueCountAggregateInputType | true
    }

  export interface RevenueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Revenue'], meta: { name: 'Revenue' } }
    /**
     * Find zero or one Revenue that matches the filter.
     * @param {RevenueFindUniqueArgs} args - Arguments to find a Revenue
     * @example
     * // Get one Revenue
     * const revenue = await prisma.revenue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RevenueFindUniqueArgs>(args: SelectSubset<T, RevenueFindUniqueArgs<ExtArgs>>): Prisma__RevenueClient<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Revenue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RevenueFindUniqueOrThrowArgs} args - Arguments to find a Revenue
     * @example
     * // Get one Revenue
     * const revenue = await prisma.revenue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RevenueFindUniqueOrThrowArgs>(args: SelectSubset<T, RevenueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RevenueClient<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Revenue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevenueFindFirstArgs} args - Arguments to find a Revenue
     * @example
     * // Get one Revenue
     * const revenue = await prisma.revenue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RevenueFindFirstArgs>(args?: SelectSubset<T, RevenueFindFirstArgs<ExtArgs>>): Prisma__RevenueClient<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Revenue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevenueFindFirstOrThrowArgs} args - Arguments to find a Revenue
     * @example
     * // Get one Revenue
     * const revenue = await prisma.revenue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RevenueFindFirstOrThrowArgs>(args?: SelectSubset<T, RevenueFindFirstOrThrowArgs<ExtArgs>>): Prisma__RevenueClient<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Revenues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevenueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Revenues
     * const revenues = await prisma.revenue.findMany()
     * 
     * // Get first 10 Revenues
     * const revenues = await prisma.revenue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const revenueWithIdOnly = await prisma.revenue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RevenueFindManyArgs>(args?: SelectSubset<T, RevenueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Revenue.
     * @param {RevenueCreateArgs} args - Arguments to create a Revenue.
     * @example
     * // Create one Revenue
     * const Revenue = await prisma.revenue.create({
     *   data: {
     *     // ... data to create a Revenue
     *   }
     * })
     * 
     */
    create<T extends RevenueCreateArgs>(args: SelectSubset<T, RevenueCreateArgs<ExtArgs>>): Prisma__RevenueClient<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Revenues.
     * @param {RevenueCreateManyArgs} args - Arguments to create many Revenues.
     * @example
     * // Create many Revenues
     * const revenue = await prisma.revenue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RevenueCreateManyArgs>(args?: SelectSubset<T, RevenueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Revenues and returns the data saved in the database.
     * @param {RevenueCreateManyAndReturnArgs} args - Arguments to create many Revenues.
     * @example
     * // Create many Revenues
     * const revenue = await prisma.revenue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Revenues and only return the `id`
     * const revenueWithIdOnly = await prisma.revenue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RevenueCreateManyAndReturnArgs>(args?: SelectSubset<T, RevenueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Revenue.
     * @param {RevenueDeleteArgs} args - Arguments to delete one Revenue.
     * @example
     * // Delete one Revenue
     * const Revenue = await prisma.revenue.delete({
     *   where: {
     *     // ... filter to delete one Revenue
     *   }
     * })
     * 
     */
    delete<T extends RevenueDeleteArgs>(args: SelectSubset<T, RevenueDeleteArgs<ExtArgs>>): Prisma__RevenueClient<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Revenue.
     * @param {RevenueUpdateArgs} args - Arguments to update one Revenue.
     * @example
     * // Update one Revenue
     * const revenue = await prisma.revenue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RevenueUpdateArgs>(args: SelectSubset<T, RevenueUpdateArgs<ExtArgs>>): Prisma__RevenueClient<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Revenues.
     * @param {RevenueDeleteManyArgs} args - Arguments to filter Revenues to delete.
     * @example
     * // Delete a few Revenues
     * const { count } = await prisma.revenue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RevenueDeleteManyArgs>(args?: SelectSubset<T, RevenueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Revenues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevenueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Revenues
     * const revenue = await prisma.revenue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RevenueUpdateManyArgs>(args: SelectSubset<T, RevenueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Revenues and returns the data updated in the database.
     * @param {RevenueUpdateManyAndReturnArgs} args - Arguments to update many Revenues.
     * @example
     * // Update many Revenues
     * const revenue = await prisma.revenue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Revenues and only return the `id`
     * const revenueWithIdOnly = await prisma.revenue.updateManyAndReturn({
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
    updateManyAndReturn<T extends RevenueUpdateManyAndReturnArgs>(args: SelectSubset<T, RevenueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Revenue.
     * @param {RevenueUpsertArgs} args - Arguments to update or create a Revenue.
     * @example
     * // Update or create a Revenue
     * const revenue = await prisma.revenue.upsert({
     *   create: {
     *     // ... data to create a Revenue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Revenue we want to update
     *   }
     * })
     */
    upsert<T extends RevenueUpsertArgs>(args: SelectSubset<T, RevenueUpsertArgs<ExtArgs>>): Prisma__RevenueClient<$Result.GetResult<Prisma.$RevenuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Revenues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevenueCountArgs} args - Arguments to filter Revenues to count.
     * @example
     * // Count the number of Revenues
     * const count = await prisma.revenue.count({
     *   where: {
     *     // ... the filter for the Revenues we want to count
     *   }
     * })
    **/
    count<T extends RevenueCountArgs>(
      args?: Subset<T, RevenueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RevenueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Revenue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevenueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RevenueAggregateArgs>(args: Subset<T, RevenueAggregateArgs>): Prisma.PrismaPromise<GetRevenueAggregateType<T>>

    /**
     * Group by Revenue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RevenueGroupByArgs} args - Group by arguments.
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
      T extends RevenueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RevenueGroupByArgs['orderBy'] }
        : { orderBy?: RevenueGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RevenueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRevenueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Revenue model
   */
  readonly fields: RevenueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Revenue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RevenueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Revenue model
   */
  interface RevenueFieldRefs {
    readonly id: FieldRef<"Revenue", 'Int'>
    readonly source_id: FieldRef<"Revenue", 'String'>
    readonly code: FieldRef<"Revenue", 'String'>
    readonly branchId: FieldRef<"Revenue", 'Int'>
    readonly custCode: FieldRef<"Revenue", 'String'>
    readonly custName: FieldRef<"Revenue", 'String'>
    readonly custPhone: FieldRef<"Revenue", 'String'>
    readonly custAddress: FieldRef<"Revenue", 'String'>
    readonly custBirthday: FieldRef<"Revenue", 'DateTime'>
    readonly depositId: FieldRef<"Revenue", 'Int'>
    readonly paidAmount: FieldRef<"Revenue", 'Float'>
    readonly discountAmount: FieldRef<"Revenue", 'Float'>
    readonly depositAmountUsing: FieldRef<"Revenue", 'Float'>
    readonly totalPaid: FieldRef<"Revenue", 'Float'>
    readonly debtAmount: FieldRef<"Revenue", 'Float'>
    readonly methodName: FieldRef<"Revenue", 'String'>
    readonly content: FieldRef<"Revenue", 'String'>
    readonly serviceId: FieldRef<"Revenue", 'Int'>
    readonly isProduct: FieldRef<"Revenue", 'Int'>
    readonly quantity: FieldRef<"Revenue", 'Float'>
    readonly priceRoot: FieldRef<"Revenue", 'Float'>
    readonly priceUnit: FieldRef<"Revenue", 'Float'>
    readonly price: FieldRef<"Revenue", 'Float'>
    readonly amount: FieldRef<"Revenue", 'Float'>
    readonly timeToTreatment: FieldRef<"Revenue", 'Int'>
    readonly percentOfService: FieldRef<"Revenue", 'Float'>
    readonly treatIndex: FieldRef<"Revenue", 'Int'>
    readonly type: FieldRef<"Revenue", 'String'>
    readonly typeName: FieldRef<"Revenue", 'String'>
    readonly consultId1: FieldRef<"Revenue", 'Int'>
    readonly consultId2: FieldRef<"Revenue", 'Int'>
    readonly consultId3: FieldRef<"Revenue", 'Int'>
    readonly consultId4: FieldRef<"Revenue", 'Int'>
    readonly techId: FieldRef<"Revenue", 'Int'>
    readonly tele1: FieldRef<"Revenue", 'Int'>
    readonly tele2: FieldRef<"Revenue", 'Int'>
    readonly createdDate: FieldRef<"Revenue", 'DateTime'>
    readonly createdBy: FieldRef<"Revenue", 'String'>
    readonly modifiedDate: FieldRef<"Revenue", 'DateTime'>
    readonly state: FieldRef<"Revenue", 'Int'>
    readonly extractedAt: FieldRef<"Revenue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Revenue findUnique
   */
  export type RevenueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * Filter, which Revenue to fetch.
     */
    where: RevenueWhereUniqueInput
  }

  /**
   * Revenue findUniqueOrThrow
   */
  export type RevenueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * Filter, which Revenue to fetch.
     */
    where: RevenueWhereUniqueInput
  }

  /**
   * Revenue findFirst
   */
  export type RevenueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * Filter, which Revenue to fetch.
     */
    where?: RevenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revenues to fetch.
     */
    orderBy?: RevenueOrderByWithRelationInput | RevenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Revenues.
     */
    cursor?: RevenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revenues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revenues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Revenues.
     */
    distinct?: RevenueScalarFieldEnum | RevenueScalarFieldEnum[]
  }

  /**
   * Revenue findFirstOrThrow
   */
  export type RevenueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * Filter, which Revenue to fetch.
     */
    where?: RevenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revenues to fetch.
     */
    orderBy?: RevenueOrderByWithRelationInput | RevenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Revenues.
     */
    cursor?: RevenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revenues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revenues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Revenues.
     */
    distinct?: RevenueScalarFieldEnum | RevenueScalarFieldEnum[]
  }

  /**
   * Revenue findMany
   */
  export type RevenueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * Filter, which Revenues to fetch.
     */
    where?: RevenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Revenues to fetch.
     */
    orderBy?: RevenueOrderByWithRelationInput | RevenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Revenues.
     */
    cursor?: RevenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Revenues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Revenues.
     */
    skip?: number
    distinct?: RevenueScalarFieldEnum | RevenueScalarFieldEnum[]
  }

  /**
   * Revenue create
   */
  export type RevenueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * The data needed to create a Revenue.
     */
    data: XOR<RevenueCreateInput, RevenueUncheckedCreateInput>
  }

  /**
   * Revenue createMany
   */
  export type RevenueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Revenues.
     */
    data: RevenueCreateManyInput | RevenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Revenue createManyAndReturn
   */
  export type RevenueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * The data used to create many Revenues.
     */
    data: RevenueCreateManyInput | RevenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Revenue update
   */
  export type RevenueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * The data needed to update a Revenue.
     */
    data: XOR<RevenueUpdateInput, RevenueUncheckedUpdateInput>
    /**
     * Choose, which Revenue to update.
     */
    where: RevenueWhereUniqueInput
  }

  /**
   * Revenue updateMany
   */
  export type RevenueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Revenues.
     */
    data: XOR<RevenueUpdateManyMutationInput, RevenueUncheckedUpdateManyInput>
    /**
     * Filter which Revenues to update
     */
    where?: RevenueWhereInput
    /**
     * Limit how many Revenues to update.
     */
    limit?: number
  }

  /**
   * Revenue updateManyAndReturn
   */
  export type RevenueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * The data used to update Revenues.
     */
    data: XOR<RevenueUpdateManyMutationInput, RevenueUncheckedUpdateManyInput>
    /**
     * Filter which Revenues to update
     */
    where?: RevenueWhereInput
    /**
     * Limit how many Revenues to update.
     */
    limit?: number
  }

  /**
   * Revenue upsert
   */
  export type RevenueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * The filter to search for the Revenue to update in case it exists.
     */
    where: RevenueWhereUniqueInput
    /**
     * In case the Revenue found by the `where` argument doesn't exist, create a new Revenue with this data.
     */
    create: XOR<RevenueCreateInput, RevenueUncheckedCreateInput>
    /**
     * In case the Revenue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RevenueUpdateInput, RevenueUncheckedUpdateInput>
  }

  /**
   * Revenue delete
   */
  export type RevenueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
    /**
     * Filter which Revenue to delete.
     */
    where: RevenueWhereUniqueInput
  }

  /**
   * Revenue deleteMany
   */
  export type RevenueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Revenues to delete
     */
    where?: RevenueWhereInput
    /**
     * Limit how many Revenues to delete.
     */
    limit?: number
  }

  /**
   * Revenue without action
   */
  export type RevenueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Revenue
     */
    select?: RevenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Revenue
     */
    omit?: RevenueOmit<ExtArgs> | null
  }


  /**
   * Model Treatment
   */

  export type AggregateTreatment = {
    _count: TreatmentCountAggregateOutputType | null
    _avg: TreatmentAvgAggregateOutputType | null
    _sum: TreatmentSumAggregateOutputType | null
    _min: TreatmentMinAggregateOutputType | null
    _max: TreatmentMaxAggregateOutputType | null
  }

  export type TreatmentAvgAggregateOutputType = {
    id: number | null
    serviceId: number | null
    serviceTypeId: number | null
    tabId: number | null
    comboId: number | null
    timeToTreatment: number | null
    priceUnit: number | null
    quantity: number | null
    discount: number | null
    priceRoot: number | null
    priceDiscounted: number | null
    doctor: number | null
    doctor2: number | null
    doctor3: number | null
    doctor4: number | null
    assistant: number | null
    assistant2: number | null
    assistant3: number | null
    assistant4: number | null
    technician: number | null
    technician2: number | null
    timeTreatIndex: number | null
    percent: number | null
    percentNew: number | null
    percentStage: number | null
    percentNewStage: number | null
    branchId: number | null
    modifiedBy: number | null
    state: number | null
  }

  export type TreatmentSumAggregateOutputType = {
    id: number | null
    serviceId: number | null
    serviceTypeId: number | null
    tabId: number | null
    comboId: number | null
    timeToTreatment: number | null
    priceUnit: number | null
    quantity: number | null
    discount: number | null
    priceRoot: number | null
    priceDiscounted: number | null
    doctor: number | null
    doctor2: number | null
    doctor3: number | null
    doctor4: number | null
    assistant: number | null
    assistant2: number | null
    assistant3: number | null
    assistant4: number | null
    technician: number | null
    technician2: number | null
    timeTreatIndex: number | null
    percent: number | null
    percentNew: number | null
    percentStage: number | null
    percentNewStage: number | null
    branchId: number | null
    modifiedBy: number | null
    state: number | null
  }

  export type TreatmentMinAggregateOutputType = {
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
    serviceId: number | null
    serviceTypeId: number | null
    serviceCode: string | null
    tabId: number | null
    tabCode: string | null
    comboId: number | null
    comboCode: string | null
    serviceName: string | null
    timeIndex: string | null
    timeToTreatment: number | null
    teethChoosing: string | null
    priceUnit: number | null
    quantity: number | null
    discount: number | null
    priceRoot: number | null
    priceDiscounted: number | null
    doctor: number | null
    doctor2: number | null
    doctor3: number | null
    doctor4: number | null
    assistant: number | null
    assistant2: number | null
    assistant3: number | null
    assistant4: number | null
    technician: number | null
    technician2: number | null
    timeTreatIndex: number | null
    percent: number | null
    percentNew: number | null
    percentStage: number | null
    percentNewStage: number | null
    note: string | null
    content: string | null
    contentNext: string | null
    symptoms: string | null
    treatDateNext: Date | null
    branchId: number | null
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    modifiedBy: number | null
    state: number | null
    extractedAt: Date | null
  }

  export type TreatmentMaxAggregateOutputType = {
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
    serviceId: number | null
    serviceTypeId: number | null
    serviceCode: string | null
    tabId: number | null
    tabCode: string | null
    comboId: number | null
    comboCode: string | null
    serviceName: string | null
    timeIndex: string | null
    timeToTreatment: number | null
    teethChoosing: string | null
    priceUnit: number | null
    quantity: number | null
    discount: number | null
    priceRoot: number | null
    priceDiscounted: number | null
    doctor: number | null
    doctor2: number | null
    doctor3: number | null
    doctor4: number | null
    assistant: number | null
    assistant2: number | null
    assistant3: number | null
    assistant4: number | null
    technician: number | null
    technician2: number | null
    timeTreatIndex: number | null
    percent: number | null
    percentNew: number | null
    percentStage: number | null
    percentNewStage: number | null
    note: string | null
    content: string | null
    contentNext: string | null
    symptoms: string | null
    treatDateNext: Date | null
    branchId: number | null
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    modifiedBy: number | null
    state: number | null
    extractedAt: Date | null
  }

  export type TreatmentCountAggregateOutputType = {
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
    serviceId: number
    serviceTypeId: number
    serviceCode: number
    tabId: number
    tabCode: number
    comboId: number
    comboCode: number
    serviceName: number
    timeIndex: number
    timeToTreatment: number
    teethChoosing: number
    priceUnit: number
    quantity: number
    discount: number
    priceRoot: number
    priceDiscounted: number
    doctor: number
    doctor2: number
    doctor3: number
    doctor4: number
    assistant: number
    assistant2: number
    assistant3: number
    assistant4: number
    technician: number
    technician2: number
    timeTreatIndex: number
    percent: number
    percentNew: number
    percentStage: number
    percentNewStage: number
    note: number
    content: number
    contentNext: number
    symptoms: number
    treatDateNext: number
    branchId: number
    createdDate: number
    createdBy: number
    modifiedDate: number
    modifiedBy: number
    state: number
    extractedAt: number
    _all: number
  }


  export type TreatmentAvgAggregateInputType = {
    id?: true
    serviceId?: true
    serviceTypeId?: true
    tabId?: true
    comboId?: true
    timeToTreatment?: true
    priceUnit?: true
    quantity?: true
    discount?: true
    priceRoot?: true
    priceDiscounted?: true
    doctor?: true
    doctor2?: true
    doctor3?: true
    doctor4?: true
    assistant?: true
    assistant2?: true
    assistant3?: true
    assistant4?: true
    technician?: true
    technician2?: true
    timeTreatIndex?: true
    percent?: true
    percentNew?: true
    percentStage?: true
    percentNewStage?: true
    branchId?: true
    modifiedBy?: true
    state?: true
  }

  export type TreatmentSumAggregateInputType = {
    id?: true
    serviceId?: true
    serviceTypeId?: true
    tabId?: true
    comboId?: true
    timeToTreatment?: true
    priceUnit?: true
    quantity?: true
    discount?: true
    priceRoot?: true
    priceDiscounted?: true
    doctor?: true
    doctor2?: true
    doctor3?: true
    doctor4?: true
    assistant?: true
    assistant2?: true
    assistant3?: true
    assistant4?: true
    technician?: true
    technician2?: true
    timeTreatIndex?: true
    percent?: true
    percentNew?: true
    percentStage?: true
    percentNewStage?: true
    branchId?: true
    modifiedBy?: true
    state?: true
  }

  export type TreatmentMinAggregateInputType = {
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
    serviceId?: true
    serviceTypeId?: true
    serviceCode?: true
    tabId?: true
    tabCode?: true
    comboId?: true
    comboCode?: true
    serviceName?: true
    timeIndex?: true
    timeToTreatment?: true
    teethChoosing?: true
    priceUnit?: true
    quantity?: true
    discount?: true
    priceRoot?: true
    priceDiscounted?: true
    doctor?: true
    doctor2?: true
    doctor3?: true
    doctor4?: true
    assistant?: true
    assistant2?: true
    assistant3?: true
    assistant4?: true
    technician?: true
    technician2?: true
    timeTreatIndex?: true
    percent?: true
    percentNew?: true
    percentStage?: true
    percentNewStage?: true
    note?: true
    content?: true
    contentNext?: true
    symptoms?: true
    treatDateNext?: true
    branchId?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    modifiedBy?: true
    state?: true
    extractedAt?: true
  }

  export type TreatmentMaxAggregateInputType = {
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
    serviceId?: true
    serviceTypeId?: true
    serviceCode?: true
    tabId?: true
    tabCode?: true
    comboId?: true
    comboCode?: true
    serviceName?: true
    timeIndex?: true
    timeToTreatment?: true
    teethChoosing?: true
    priceUnit?: true
    quantity?: true
    discount?: true
    priceRoot?: true
    priceDiscounted?: true
    doctor?: true
    doctor2?: true
    doctor3?: true
    doctor4?: true
    assistant?: true
    assistant2?: true
    assistant3?: true
    assistant4?: true
    technician?: true
    technician2?: true
    timeTreatIndex?: true
    percent?: true
    percentNew?: true
    percentStage?: true
    percentNewStage?: true
    note?: true
    content?: true
    contentNext?: true
    symptoms?: true
    treatDateNext?: true
    branchId?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    modifiedBy?: true
    state?: true
    extractedAt?: true
  }

  export type TreatmentCountAggregateInputType = {
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
    serviceId?: true
    serviceTypeId?: true
    serviceCode?: true
    tabId?: true
    tabCode?: true
    comboId?: true
    comboCode?: true
    serviceName?: true
    timeIndex?: true
    timeToTreatment?: true
    teethChoosing?: true
    priceUnit?: true
    quantity?: true
    discount?: true
    priceRoot?: true
    priceDiscounted?: true
    doctor?: true
    doctor2?: true
    doctor3?: true
    doctor4?: true
    assistant?: true
    assistant2?: true
    assistant3?: true
    assistant4?: true
    technician?: true
    technician2?: true
    timeTreatIndex?: true
    percent?: true
    percentNew?: true
    percentStage?: true
    percentNewStage?: true
    note?: true
    content?: true
    contentNext?: true
    symptoms?: true
    treatDateNext?: true
    branchId?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    modifiedBy?: true
    state?: true
    extractedAt?: true
    _all?: true
  }

  export type TreatmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Treatment to aggregate.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Treatments
    **/
    _count?: true | TreatmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TreatmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TreatmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreatmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreatmentMaxAggregateInputType
  }

  export type GetTreatmentAggregateType<T extends TreatmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTreatment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreatment[P]>
      : GetScalarType<T[P], AggregateTreatment[P]>
  }




  export type TreatmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreatmentWhereInput
    orderBy?: TreatmentOrderByWithAggregationInput | TreatmentOrderByWithAggregationInput[]
    by: TreatmentScalarFieldEnum[] | TreatmentScalarFieldEnum
    having?: TreatmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreatmentCountAggregateInputType | true
    _avg?: TreatmentAvgAggregateInputType
    _sum?: TreatmentSumAggregateInputType
    _min?: TreatmentMinAggregateInputType
    _max?: TreatmentMaxAggregateInputType
  }

  export type TreatmentGroupByOutputType = {
    id: number
    source_id: string
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
    serviceId: number
    serviceTypeId: number
    serviceCode: string | null
    tabId: number
    tabCode: string | null
    comboId: number
    comboCode: string | null
    serviceName: string | null
    timeIndex: string | null
    timeToTreatment: number
    teethChoosing: string | null
    priceUnit: number
    quantity: number
    discount: number
    priceRoot: number
    priceDiscounted: number
    doctor: number
    doctor2: number
    doctor3: number
    doctor4: number
    assistant: number
    assistant2: number
    assistant3: number
    assistant4: number
    technician: number
    technician2: number
    timeTreatIndex: number
    percent: number
    percentNew: number
    percentStage: number
    percentNewStage: number
    note: string | null
    content: string | null
    contentNext: string | null
    symptoms: string | null
    treatDateNext: Date | null
    branchId: number
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    modifiedBy: number | null
    state: number
    extractedAt: Date
    _count: TreatmentCountAggregateOutputType | null
    _avg: TreatmentAvgAggregateOutputType | null
    _sum: TreatmentSumAggregateOutputType | null
    _min: TreatmentMinAggregateOutputType | null
    _max: TreatmentMaxAggregateOutputType | null
  }

  type GetTreatmentGroupByPayload<T extends TreatmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreatmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreatmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreatmentGroupByOutputType[P]>
            : GetScalarType<T[P], TreatmentGroupByOutputType[P]>
        }
      >
    >


  export type TreatmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    serviceId?: boolean
    serviceTypeId?: boolean
    serviceCode?: boolean
    tabId?: boolean
    tabCode?: boolean
    comboId?: boolean
    comboCode?: boolean
    serviceName?: boolean
    timeIndex?: boolean
    timeToTreatment?: boolean
    teethChoosing?: boolean
    priceUnit?: boolean
    quantity?: boolean
    discount?: boolean
    priceRoot?: boolean
    priceDiscounted?: boolean
    doctor?: boolean
    doctor2?: boolean
    doctor3?: boolean
    doctor4?: boolean
    assistant?: boolean
    assistant2?: boolean
    assistant3?: boolean
    assistant4?: boolean
    technician?: boolean
    technician2?: boolean
    timeTreatIndex?: boolean
    percent?: boolean
    percentNew?: boolean
    percentStage?: boolean
    percentNewStage?: boolean
    note?: boolean
    content?: boolean
    contentNext?: boolean
    symptoms?: boolean
    treatDateNext?: boolean
    branchId?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    state?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["treatment"]>

  export type TreatmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    serviceId?: boolean
    serviceTypeId?: boolean
    serviceCode?: boolean
    tabId?: boolean
    tabCode?: boolean
    comboId?: boolean
    comboCode?: boolean
    serviceName?: boolean
    timeIndex?: boolean
    timeToTreatment?: boolean
    teethChoosing?: boolean
    priceUnit?: boolean
    quantity?: boolean
    discount?: boolean
    priceRoot?: boolean
    priceDiscounted?: boolean
    doctor?: boolean
    doctor2?: boolean
    doctor3?: boolean
    doctor4?: boolean
    assistant?: boolean
    assistant2?: boolean
    assistant3?: boolean
    assistant4?: boolean
    technician?: boolean
    technician2?: boolean
    timeTreatIndex?: boolean
    percent?: boolean
    percentNew?: boolean
    percentStage?: boolean
    percentNewStage?: boolean
    note?: boolean
    content?: boolean
    contentNext?: boolean
    symptoms?: boolean
    treatDateNext?: boolean
    branchId?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    state?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["treatment"]>

  export type TreatmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    serviceId?: boolean
    serviceTypeId?: boolean
    serviceCode?: boolean
    tabId?: boolean
    tabCode?: boolean
    comboId?: boolean
    comboCode?: boolean
    serviceName?: boolean
    timeIndex?: boolean
    timeToTreatment?: boolean
    teethChoosing?: boolean
    priceUnit?: boolean
    quantity?: boolean
    discount?: boolean
    priceRoot?: boolean
    priceDiscounted?: boolean
    doctor?: boolean
    doctor2?: boolean
    doctor3?: boolean
    doctor4?: boolean
    assistant?: boolean
    assistant2?: boolean
    assistant3?: boolean
    assistant4?: boolean
    technician?: boolean
    technician2?: boolean
    timeTreatIndex?: boolean
    percent?: boolean
    percentNew?: boolean
    percentStage?: boolean
    percentNewStage?: boolean
    note?: boolean
    content?: boolean
    contentNext?: boolean
    symptoms?: boolean
    treatDateNext?: boolean
    branchId?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    state?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["treatment"]>

  export type TreatmentSelectScalar = {
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
    serviceId?: boolean
    serviceTypeId?: boolean
    serviceCode?: boolean
    tabId?: boolean
    tabCode?: boolean
    comboId?: boolean
    comboCode?: boolean
    serviceName?: boolean
    timeIndex?: boolean
    timeToTreatment?: boolean
    teethChoosing?: boolean
    priceUnit?: boolean
    quantity?: boolean
    discount?: boolean
    priceRoot?: boolean
    priceDiscounted?: boolean
    doctor?: boolean
    doctor2?: boolean
    doctor3?: boolean
    doctor4?: boolean
    assistant?: boolean
    assistant2?: boolean
    assistant3?: boolean
    assistant4?: boolean
    technician?: boolean
    technician2?: boolean
    timeTreatIndex?: boolean
    percent?: boolean
    percentNew?: boolean
    percentStage?: boolean
    percentNewStage?: boolean
    note?: boolean
    content?: boolean
    contentNext?: boolean
    symptoms?: boolean
    treatDateNext?: boolean
    branchId?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    state?: boolean
    extractedAt?: boolean
  }

  export type TreatmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source_id" | "name" | "code" | "codeOld" | "docCode" | "email" | "phone" | "phone2" | "birthday" | "gender" | "address" | "commune" | "district" | "city" | "serviceId" | "serviceTypeId" | "serviceCode" | "tabId" | "tabCode" | "comboId" | "comboCode" | "serviceName" | "timeIndex" | "timeToTreatment" | "teethChoosing" | "priceUnit" | "quantity" | "discount" | "priceRoot" | "priceDiscounted" | "doctor" | "doctor2" | "doctor3" | "doctor4" | "assistant" | "assistant2" | "assistant3" | "assistant4" | "technician" | "technician2" | "timeTreatIndex" | "percent" | "percentNew" | "percentStage" | "percentNewStage" | "note" | "content" | "contentNext" | "symptoms" | "treatDateNext" | "branchId" | "createdDate" | "createdBy" | "modifiedDate" | "modifiedBy" | "state" | "extractedAt", ExtArgs["result"]["treatment"]>

  export type $TreatmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Treatment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      source_id: string
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
      serviceId: number
      serviceTypeId: number
      serviceCode: string | null
      tabId: number
      tabCode: string | null
      comboId: number
      comboCode: string | null
      serviceName: string | null
      timeIndex: string | null
      timeToTreatment: number
      teethChoosing: string | null
      priceUnit: number
      quantity: number
      discount: number
      priceRoot: number
      priceDiscounted: number
      doctor: number
      doctor2: number
      doctor3: number
      doctor4: number
      assistant: number
      assistant2: number
      assistant3: number
      assistant4: number
      technician: number
      technician2: number
      timeTreatIndex: number
      percent: number
      percentNew: number
      percentStage: number
      percentNewStage: number
      note: string | null
      content: string | null
      contentNext: string | null
      symptoms: string | null
      treatDateNext: Date | null
      branchId: number
      createdDate: Date | null
      createdBy: string | null
      modifiedDate: Date | null
      modifiedBy: number | null
      state: number
      extractedAt: Date
    }, ExtArgs["result"]["treatment"]>
    composites: {}
  }

  type TreatmentGetPayload<S extends boolean | null | undefined | TreatmentDefaultArgs> = $Result.GetResult<Prisma.$TreatmentPayload, S>

  type TreatmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TreatmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TreatmentCountAggregateInputType | true
    }

  export interface TreatmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Treatment'], meta: { name: 'Treatment' } }
    /**
     * Find zero or one Treatment that matches the filter.
     * @param {TreatmentFindUniqueArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TreatmentFindUniqueArgs>(args: SelectSubset<T, TreatmentFindUniqueArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Treatment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TreatmentFindUniqueOrThrowArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TreatmentFindUniqueOrThrowArgs>(args: SelectSubset<T, TreatmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Treatment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentFindFirstArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TreatmentFindFirstArgs>(args?: SelectSubset<T, TreatmentFindFirstArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Treatment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentFindFirstOrThrowArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TreatmentFindFirstOrThrowArgs>(args?: SelectSubset<T, TreatmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Treatments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Treatments
     * const treatments = await prisma.treatment.findMany()
     * 
     * // Get first 10 Treatments
     * const treatments = await prisma.treatment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const treatmentWithIdOnly = await prisma.treatment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TreatmentFindManyArgs>(args?: SelectSubset<T, TreatmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Treatment.
     * @param {TreatmentCreateArgs} args - Arguments to create a Treatment.
     * @example
     * // Create one Treatment
     * const Treatment = await prisma.treatment.create({
     *   data: {
     *     // ... data to create a Treatment
     *   }
     * })
     * 
     */
    create<T extends TreatmentCreateArgs>(args: SelectSubset<T, TreatmentCreateArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Treatments.
     * @param {TreatmentCreateManyArgs} args - Arguments to create many Treatments.
     * @example
     * // Create many Treatments
     * const treatment = await prisma.treatment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TreatmentCreateManyArgs>(args?: SelectSubset<T, TreatmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Treatments and returns the data saved in the database.
     * @param {TreatmentCreateManyAndReturnArgs} args - Arguments to create many Treatments.
     * @example
     * // Create many Treatments
     * const treatment = await prisma.treatment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Treatments and only return the `id`
     * const treatmentWithIdOnly = await prisma.treatment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TreatmentCreateManyAndReturnArgs>(args?: SelectSubset<T, TreatmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Treatment.
     * @param {TreatmentDeleteArgs} args - Arguments to delete one Treatment.
     * @example
     * // Delete one Treatment
     * const Treatment = await prisma.treatment.delete({
     *   where: {
     *     // ... filter to delete one Treatment
     *   }
     * })
     * 
     */
    delete<T extends TreatmentDeleteArgs>(args: SelectSubset<T, TreatmentDeleteArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Treatment.
     * @param {TreatmentUpdateArgs} args - Arguments to update one Treatment.
     * @example
     * // Update one Treatment
     * const treatment = await prisma.treatment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TreatmentUpdateArgs>(args: SelectSubset<T, TreatmentUpdateArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Treatments.
     * @param {TreatmentDeleteManyArgs} args - Arguments to filter Treatments to delete.
     * @example
     * // Delete a few Treatments
     * const { count } = await prisma.treatment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TreatmentDeleteManyArgs>(args?: SelectSubset<T, TreatmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Treatments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Treatments
     * const treatment = await prisma.treatment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TreatmentUpdateManyArgs>(args: SelectSubset<T, TreatmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Treatments and returns the data updated in the database.
     * @param {TreatmentUpdateManyAndReturnArgs} args - Arguments to update many Treatments.
     * @example
     * // Update many Treatments
     * const treatment = await prisma.treatment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Treatments and only return the `id`
     * const treatmentWithIdOnly = await prisma.treatment.updateManyAndReturn({
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
    updateManyAndReturn<T extends TreatmentUpdateManyAndReturnArgs>(args: SelectSubset<T, TreatmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Treatment.
     * @param {TreatmentUpsertArgs} args - Arguments to update or create a Treatment.
     * @example
     * // Update or create a Treatment
     * const treatment = await prisma.treatment.upsert({
     *   create: {
     *     // ... data to create a Treatment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Treatment we want to update
     *   }
     * })
     */
    upsert<T extends TreatmentUpsertArgs>(args: SelectSubset<T, TreatmentUpsertArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Treatments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentCountArgs} args - Arguments to filter Treatments to count.
     * @example
     * // Count the number of Treatments
     * const count = await prisma.treatment.count({
     *   where: {
     *     // ... the filter for the Treatments we want to count
     *   }
     * })
    **/
    count<T extends TreatmentCountArgs>(
      args?: Subset<T, TreatmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreatmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Treatment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TreatmentAggregateArgs>(args: Subset<T, TreatmentAggregateArgs>): Prisma.PrismaPromise<GetTreatmentAggregateType<T>>

    /**
     * Group by Treatment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentGroupByArgs} args - Group by arguments.
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
      T extends TreatmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreatmentGroupByArgs['orderBy'] }
        : { orderBy?: TreatmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TreatmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreatmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Treatment model
   */
  readonly fields: TreatmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Treatment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreatmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Treatment model
   */
  interface TreatmentFieldRefs {
    readonly id: FieldRef<"Treatment", 'Int'>
    readonly source_id: FieldRef<"Treatment", 'String'>
    readonly name: FieldRef<"Treatment", 'String'>
    readonly code: FieldRef<"Treatment", 'String'>
    readonly codeOld: FieldRef<"Treatment", 'String'>
    readonly docCode: FieldRef<"Treatment", 'String'>
    readonly email: FieldRef<"Treatment", 'String'>
    readonly phone: FieldRef<"Treatment", 'String'>
    readonly phone2: FieldRef<"Treatment", 'String'>
    readonly birthday: FieldRef<"Treatment", 'DateTime'>
    readonly gender: FieldRef<"Treatment", 'String'>
    readonly address: FieldRef<"Treatment", 'String'>
    readonly commune: FieldRef<"Treatment", 'String'>
    readonly district: FieldRef<"Treatment", 'String'>
    readonly city: FieldRef<"Treatment", 'String'>
    readonly serviceId: FieldRef<"Treatment", 'Int'>
    readonly serviceTypeId: FieldRef<"Treatment", 'Int'>
    readonly serviceCode: FieldRef<"Treatment", 'String'>
    readonly tabId: FieldRef<"Treatment", 'Int'>
    readonly tabCode: FieldRef<"Treatment", 'String'>
    readonly comboId: FieldRef<"Treatment", 'Int'>
    readonly comboCode: FieldRef<"Treatment", 'String'>
    readonly serviceName: FieldRef<"Treatment", 'String'>
    readonly timeIndex: FieldRef<"Treatment", 'String'>
    readonly timeToTreatment: FieldRef<"Treatment", 'Int'>
    readonly teethChoosing: FieldRef<"Treatment", 'String'>
    readonly priceUnit: FieldRef<"Treatment", 'Float'>
    readonly quantity: FieldRef<"Treatment", 'Float'>
    readonly discount: FieldRef<"Treatment", 'Float'>
    readonly priceRoot: FieldRef<"Treatment", 'Float'>
    readonly priceDiscounted: FieldRef<"Treatment", 'Float'>
    readonly doctor: FieldRef<"Treatment", 'Int'>
    readonly doctor2: FieldRef<"Treatment", 'Int'>
    readonly doctor3: FieldRef<"Treatment", 'Int'>
    readonly doctor4: FieldRef<"Treatment", 'Int'>
    readonly assistant: FieldRef<"Treatment", 'Int'>
    readonly assistant2: FieldRef<"Treatment", 'Int'>
    readonly assistant3: FieldRef<"Treatment", 'Int'>
    readonly assistant4: FieldRef<"Treatment", 'Int'>
    readonly technician: FieldRef<"Treatment", 'Int'>
    readonly technician2: FieldRef<"Treatment", 'Int'>
    readonly timeTreatIndex: FieldRef<"Treatment", 'Int'>
    readonly percent: FieldRef<"Treatment", 'Float'>
    readonly percentNew: FieldRef<"Treatment", 'Float'>
    readonly percentStage: FieldRef<"Treatment", 'Float'>
    readonly percentNewStage: FieldRef<"Treatment", 'Float'>
    readonly note: FieldRef<"Treatment", 'String'>
    readonly content: FieldRef<"Treatment", 'String'>
    readonly contentNext: FieldRef<"Treatment", 'String'>
    readonly symptoms: FieldRef<"Treatment", 'String'>
    readonly treatDateNext: FieldRef<"Treatment", 'DateTime'>
    readonly branchId: FieldRef<"Treatment", 'Int'>
    readonly createdDate: FieldRef<"Treatment", 'DateTime'>
    readonly createdBy: FieldRef<"Treatment", 'String'>
    readonly modifiedDate: FieldRef<"Treatment", 'DateTime'>
    readonly modifiedBy: FieldRef<"Treatment", 'Int'>
    readonly state: FieldRef<"Treatment", 'Int'>
    readonly extractedAt: FieldRef<"Treatment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Treatment findUnique
   */
  export type TreatmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment findUniqueOrThrow
   */
  export type TreatmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment findFirst
   */
  export type TreatmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Treatments.
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Treatments.
     */
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Treatment findFirstOrThrow
   */
  export type TreatmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Treatments.
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Treatments.
     */
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Treatment findMany
   */
  export type TreatmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Filter, which Treatments to fetch.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Treatments.
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Treatment create
   */
  export type TreatmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * The data needed to create a Treatment.
     */
    data: XOR<TreatmentCreateInput, TreatmentUncheckedCreateInput>
  }

  /**
   * Treatment createMany
   */
  export type TreatmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Treatments.
     */
    data: TreatmentCreateManyInput | TreatmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Treatment createManyAndReturn
   */
  export type TreatmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * The data used to create many Treatments.
     */
    data: TreatmentCreateManyInput | TreatmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Treatment update
   */
  export type TreatmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * The data needed to update a Treatment.
     */
    data: XOR<TreatmentUpdateInput, TreatmentUncheckedUpdateInput>
    /**
     * Choose, which Treatment to update.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment updateMany
   */
  export type TreatmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Treatments.
     */
    data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyInput>
    /**
     * Filter which Treatments to update
     */
    where?: TreatmentWhereInput
    /**
     * Limit how many Treatments to update.
     */
    limit?: number
  }

  /**
   * Treatment updateManyAndReturn
   */
  export type TreatmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * The data used to update Treatments.
     */
    data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyInput>
    /**
     * Filter which Treatments to update
     */
    where?: TreatmentWhereInput
    /**
     * Limit how many Treatments to update.
     */
    limit?: number
  }

  /**
   * Treatment upsert
   */
  export type TreatmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * The filter to search for the Treatment to update in case it exists.
     */
    where: TreatmentWhereUniqueInput
    /**
     * In case the Treatment found by the `where` argument doesn't exist, create a new Treatment with this data.
     */
    create: XOR<TreatmentCreateInput, TreatmentUncheckedCreateInput>
    /**
     * In case the Treatment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreatmentUpdateInput, TreatmentUncheckedUpdateInput>
  }

  /**
   * Treatment delete
   */
  export type TreatmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Filter which Treatment to delete.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment deleteMany
   */
  export type TreatmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Treatments to delete
     */
    where?: TreatmentWhereInput
    /**
     * Limit how many Treatments to delete.
     */
    limit?: number
  }

  /**
   * Treatment without action
   */
  export type TreatmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    id: number | null
    statusId: number | null
    isCancel: number | null
    branchId: number | null
    consultId: number | null
    doctorId: number | null
    doctorId2: number | null
    assistantId: number | null
    roomId: number | null
    reasonCancelId: number | null
    typeId: number | null
    typeDetailId: number | null
    state: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    id: number | null
    statusId: number | null
    isCancel: number | null
    branchId: number | null
    consultId: number | null
    doctorId: number | null
    doctorId2: number | null
    assistantId: number | null
    roomId: number | null
    reasonCancelId: number | null
    typeId: number | null
    typeDetailId: number | null
    state: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: number | null
    source_id: string | null
    custId: string | null
    custCode: string | null
    custName: string | null
    dateFrom: Date | null
    statusId: number | null
    statusName: string | null
    statusTime: Date | null
    isCancel: number | null
    branchId: number | null
    branchName: string | null
    content: string | null
    note: string | null
    noteForBranch: string | null
    consultId: number | null
    doctorId: number | null
    doctorId2: number | null
    assistantId: number | null
    roomId: number | null
    room: string | null
    remindContent: string | null
    reasonCancelId: number | null
    typeId: number | null
    typeDetailId: number | null
    serviceCareId: string | null
    serviceCare: string | null
    state: number | null
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    modifiedBy: string | null
    extractedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: number | null
    source_id: string | null
    custId: string | null
    custCode: string | null
    custName: string | null
    dateFrom: Date | null
    statusId: number | null
    statusName: string | null
    statusTime: Date | null
    isCancel: number | null
    branchId: number | null
    branchName: string | null
    content: string | null
    note: string | null
    noteForBranch: string | null
    consultId: number | null
    doctorId: number | null
    doctorId2: number | null
    assistantId: number | null
    roomId: number | null
    room: string | null
    remindContent: string | null
    reasonCancelId: number | null
    typeId: number | null
    typeDetailId: number | null
    serviceCareId: string | null
    serviceCare: string | null
    state: number | null
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    modifiedBy: string | null
    extractedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    source_id: number
    custId: number
    custCode: number
    custName: number
    dateFrom: number
    statusId: number
    statusName: number
    statusTime: number
    isCancel: number
    branchId: number
    branchName: number
    content: number
    note: number
    noteForBranch: number
    consultId: number
    doctorId: number
    doctorId2: number
    assistantId: number
    roomId: number
    room: number
    remindContent: number
    reasonCancelId: number
    typeId: number
    typeDetailId: number
    serviceCareId: number
    serviceCare: number
    state: number
    createdDate: number
    createdBy: number
    modifiedDate: number
    modifiedBy: number
    extractedAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    id?: true
    statusId?: true
    isCancel?: true
    branchId?: true
    consultId?: true
    doctorId?: true
    doctorId2?: true
    assistantId?: true
    roomId?: true
    reasonCancelId?: true
    typeId?: true
    typeDetailId?: true
    state?: true
  }

  export type AppointmentSumAggregateInputType = {
    id?: true
    statusId?: true
    isCancel?: true
    branchId?: true
    consultId?: true
    doctorId?: true
    doctorId2?: true
    assistantId?: true
    roomId?: true
    reasonCancelId?: true
    typeId?: true
    typeDetailId?: true
    state?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    source_id?: true
    custId?: true
    custCode?: true
    custName?: true
    dateFrom?: true
    statusId?: true
    statusName?: true
    statusTime?: true
    isCancel?: true
    branchId?: true
    branchName?: true
    content?: true
    note?: true
    noteForBranch?: true
    consultId?: true
    doctorId?: true
    doctorId2?: true
    assistantId?: true
    roomId?: true
    room?: true
    remindContent?: true
    reasonCancelId?: true
    typeId?: true
    typeDetailId?: true
    serviceCareId?: true
    serviceCare?: true
    state?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    modifiedBy?: true
    extractedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    source_id?: true
    custId?: true
    custCode?: true
    custName?: true
    dateFrom?: true
    statusId?: true
    statusName?: true
    statusTime?: true
    isCancel?: true
    branchId?: true
    branchName?: true
    content?: true
    note?: true
    noteForBranch?: true
    consultId?: true
    doctorId?: true
    doctorId2?: true
    assistantId?: true
    roomId?: true
    room?: true
    remindContent?: true
    reasonCancelId?: true
    typeId?: true
    typeDetailId?: true
    serviceCareId?: true
    serviceCare?: true
    state?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    modifiedBy?: true
    extractedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    source_id?: true
    custId?: true
    custCode?: true
    custName?: true
    dateFrom?: true
    statusId?: true
    statusName?: true
    statusTime?: true
    isCancel?: true
    branchId?: true
    branchName?: true
    content?: true
    note?: true
    noteForBranch?: true
    consultId?: true
    doctorId?: true
    doctorId2?: true
    assistantId?: true
    roomId?: true
    room?: true
    remindContent?: true
    reasonCancelId?: true
    typeId?: true
    typeDetailId?: true
    serviceCareId?: true
    serviceCare?: true
    state?: true
    createdDate?: true
    createdBy?: true
    modifiedDate?: true
    modifiedBy?: true
    extractedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: number
    source_id: string
    custId: string | null
    custCode: string | null
    custName: string | null
    dateFrom: Date | null
    statusId: number
    statusName: string | null
    statusTime: Date | null
    isCancel: number
    branchId: number
    branchName: string | null
    content: string | null
    note: string | null
    noteForBranch: string | null
    consultId: number
    doctorId: number
    doctorId2: number
    assistantId: number
    roomId: number
    room: string | null
    remindContent: string | null
    reasonCancelId: number
    typeId: number
    typeDetailId: number
    serviceCareId: string | null
    serviceCare: string | null
    state: number
    createdDate: Date | null
    createdBy: string | null
    modifiedDate: Date | null
    modifiedBy: string | null
    extractedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    custId?: boolean
    custCode?: boolean
    custName?: boolean
    dateFrom?: boolean
    statusId?: boolean
    statusName?: boolean
    statusTime?: boolean
    isCancel?: boolean
    branchId?: boolean
    branchName?: boolean
    content?: boolean
    note?: boolean
    noteForBranch?: boolean
    consultId?: boolean
    doctorId?: boolean
    doctorId2?: boolean
    assistantId?: boolean
    roomId?: boolean
    room?: boolean
    remindContent?: boolean
    reasonCancelId?: boolean
    typeId?: boolean
    typeDetailId?: boolean
    serviceCareId?: boolean
    serviceCare?: boolean
    state?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    custId?: boolean
    custCode?: boolean
    custName?: boolean
    dateFrom?: boolean
    statusId?: boolean
    statusName?: boolean
    statusTime?: boolean
    isCancel?: boolean
    branchId?: boolean
    branchName?: boolean
    content?: boolean
    note?: boolean
    noteForBranch?: boolean
    consultId?: boolean
    doctorId?: boolean
    doctorId2?: boolean
    assistantId?: boolean
    roomId?: boolean
    room?: boolean
    remindContent?: boolean
    reasonCancelId?: boolean
    typeId?: boolean
    typeDetailId?: boolean
    serviceCareId?: boolean
    serviceCare?: boolean
    state?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source_id?: boolean
    custId?: boolean
    custCode?: boolean
    custName?: boolean
    dateFrom?: boolean
    statusId?: boolean
    statusName?: boolean
    statusTime?: boolean
    isCancel?: boolean
    branchId?: boolean
    branchName?: boolean
    content?: boolean
    note?: boolean
    noteForBranch?: boolean
    consultId?: boolean
    doctorId?: boolean
    doctorId2?: boolean
    assistantId?: boolean
    roomId?: boolean
    room?: boolean
    remindContent?: boolean
    reasonCancelId?: boolean
    typeId?: boolean
    typeDetailId?: boolean
    serviceCareId?: boolean
    serviceCare?: boolean
    state?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    extractedAt?: boolean
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    source_id?: boolean
    custId?: boolean
    custCode?: boolean
    custName?: boolean
    dateFrom?: boolean
    statusId?: boolean
    statusName?: boolean
    statusTime?: boolean
    isCancel?: boolean
    branchId?: boolean
    branchName?: boolean
    content?: boolean
    note?: boolean
    noteForBranch?: boolean
    consultId?: boolean
    doctorId?: boolean
    doctorId2?: boolean
    assistantId?: boolean
    roomId?: boolean
    room?: boolean
    remindContent?: boolean
    reasonCancelId?: boolean
    typeId?: boolean
    typeDetailId?: boolean
    serviceCareId?: boolean
    serviceCare?: boolean
    state?: boolean
    createdDate?: boolean
    createdBy?: boolean
    modifiedDate?: boolean
    modifiedBy?: boolean
    extractedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source_id" | "custId" | "custCode" | "custName" | "dateFrom" | "statusId" | "statusName" | "statusTime" | "isCancel" | "branchId" | "branchName" | "content" | "note" | "noteForBranch" | "consultId" | "doctorId" | "doctorId2" | "assistantId" | "roomId" | "room" | "remindContent" | "reasonCancelId" | "typeId" | "typeDetailId" | "serviceCareId" | "serviceCare" | "state" | "createdDate" | "createdBy" | "modifiedDate" | "modifiedBy" | "extractedAt", ExtArgs["result"]["appointment"]>

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      source_id: string
      custId: string | null
      custCode: string | null
      custName: string | null
      dateFrom: Date | null
      statusId: number
      statusName: string | null
      statusTime: Date | null
      isCancel: number
      branchId: number
      branchName: string | null
      content: string | null
      note: string | null
      noteForBranch: string | null
      consultId: number
      doctorId: number
      doctorId2: number
      assistantId: number
      roomId: number
      room: string | null
      remindContent: string | null
      reasonCancelId: number
      typeId: number
      typeDetailId: number
      serviceCareId: string | null
      serviceCare: string | null
      state: number
      createdDate: Date | null
      createdBy: string | null
      modifiedDate: Date | null
      modifiedBy: string | null
      extractedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
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
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
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
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'Int'>
    readonly source_id: FieldRef<"Appointment", 'String'>
    readonly custId: FieldRef<"Appointment", 'String'>
    readonly custCode: FieldRef<"Appointment", 'String'>
    readonly custName: FieldRef<"Appointment", 'String'>
    readonly dateFrom: FieldRef<"Appointment", 'DateTime'>
    readonly statusId: FieldRef<"Appointment", 'Int'>
    readonly statusName: FieldRef<"Appointment", 'String'>
    readonly statusTime: FieldRef<"Appointment", 'DateTime'>
    readonly isCancel: FieldRef<"Appointment", 'Int'>
    readonly branchId: FieldRef<"Appointment", 'Int'>
    readonly branchName: FieldRef<"Appointment", 'String'>
    readonly content: FieldRef<"Appointment", 'String'>
    readonly note: FieldRef<"Appointment", 'String'>
    readonly noteForBranch: FieldRef<"Appointment", 'String'>
    readonly consultId: FieldRef<"Appointment", 'Int'>
    readonly doctorId: FieldRef<"Appointment", 'Int'>
    readonly doctorId2: FieldRef<"Appointment", 'Int'>
    readonly assistantId: FieldRef<"Appointment", 'Int'>
    readonly roomId: FieldRef<"Appointment", 'Int'>
    readonly room: FieldRef<"Appointment", 'String'>
    readonly remindContent: FieldRef<"Appointment", 'String'>
    readonly reasonCancelId: FieldRef<"Appointment", 'Int'>
    readonly typeId: FieldRef<"Appointment", 'Int'>
    readonly typeDetailId: FieldRef<"Appointment", 'Int'>
    readonly serviceCareId: FieldRef<"Appointment", 'String'>
    readonly serviceCare: FieldRef<"Appointment", 'String'>
    readonly state: FieldRef<"Appointment", 'Int'>
    readonly createdDate: FieldRef<"Appointment", 'DateTime'>
    readonly createdBy: FieldRef<"Appointment", 'String'>
    readonly modifiedDate: FieldRef<"Appointment", 'DateTime'>
    readonly modifiedBy: FieldRef<"Appointment", 'String'>
    readonly extractedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
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


  export const RevenueScalarFieldEnum: {
    id: 'id',
    source_id: 'source_id',
    code: 'code',
    branchId: 'branchId',
    custCode: 'custCode',
    custName: 'custName',
    custPhone: 'custPhone',
    custAddress: 'custAddress',
    custBirthday: 'custBirthday',
    depositId: 'depositId',
    paidAmount: 'paidAmount',
    discountAmount: 'discountAmount',
    depositAmountUsing: 'depositAmountUsing',
    totalPaid: 'totalPaid',
    debtAmount: 'debtAmount',
    methodName: 'methodName',
    content: 'content',
    serviceId: 'serviceId',
    isProduct: 'isProduct',
    quantity: 'quantity',
    priceRoot: 'priceRoot',
    priceUnit: 'priceUnit',
    price: 'price',
    amount: 'amount',
    timeToTreatment: 'timeToTreatment',
    percentOfService: 'percentOfService',
    treatIndex: 'treatIndex',
    type: 'type',
    typeName: 'typeName',
    consultId1: 'consultId1',
    consultId2: 'consultId2',
    consultId3: 'consultId3',
    consultId4: 'consultId4',
    techId: 'techId',
    tele1: 'tele1',
    tele2: 'tele2',
    createdDate: 'createdDate',
    createdBy: 'createdBy',
    modifiedDate: 'modifiedDate',
    state: 'state',
    extractedAt: 'extractedAt'
  };

  export type RevenueScalarFieldEnum = (typeof RevenueScalarFieldEnum)[keyof typeof RevenueScalarFieldEnum]


  export const TreatmentScalarFieldEnum: {
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
    serviceId: 'serviceId',
    serviceTypeId: 'serviceTypeId',
    serviceCode: 'serviceCode',
    tabId: 'tabId',
    tabCode: 'tabCode',
    comboId: 'comboId',
    comboCode: 'comboCode',
    serviceName: 'serviceName',
    timeIndex: 'timeIndex',
    timeToTreatment: 'timeToTreatment',
    teethChoosing: 'teethChoosing',
    priceUnit: 'priceUnit',
    quantity: 'quantity',
    discount: 'discount',
    priceRoot: 'priceRoot',
    priceDiscounted: 'priceDiscounted',
    doctor: 'doctor',
    doctor2: 'doctor2',
    doctor3: 'doctor3',
    doctor4: 'doctor4',
    assistant: 'assistant',
    assistant2: 'assistant2',
    assistant3: 'assistant3',
    assistant4: 'assistant4',
    technician: 'technician',
    technician2: 'technician2',
    timeTreatIndex: 'timeTreatIndex',
    percent: 'percent',
    percentNew: 'percentNew',
    percentStage: 'percentStage',
    percentNewStage: 'percentNewStage',
    note: 'note',
    content: 'content',
    contentNext: 'contentNext',
    symptoms: 'symptoms',
    treatDateNext: 'treatDateNext',
    branchId: 'branchId',
    createdDate: 'createdDate',
    createdBy: 'createdBy',
    modifiedDate: 'modifiedDate',
    modifiedBy: 'modifiedBy',
    state: 'state',
    extractedAt: 'extractedAt'
  };

  export type TreatmentScalarFieldEnum = (typeof TreatmentScalarFieldEnum)[keyof typeof TreatmentScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    source_id: 'source_id',
    custId: 'custId',
    custCode: 'custCode',
    custName: 'custName',
    dateFrom: 'dateFrom',
    statusId: 'statusId',
    statusName: 'statusName',
    statusTime: 'statusTime',
    isCancel: 'isCancel',
    branchId: 'branchId',
    branchName: 'branchName',
    content: 'content',
    note: 'note',
    noteForBranch: 'noteForBranch',
    consultId: 'consultId',
    doctorId: 'doctorId',
    doctorId2: 'doctorId2',
    assistantId: 'assistantId',
    roomId: 'roomId',
    room: 'room',
    remindContent: 'remindContent',
    reasonCancelId: 'reasonCancelId',
    typeId: 'typeId',
    typeDetailId: 'typeDetailId',
    serviceCareId: 'serviceCareId',
    serviceCare: 'serviceCare',
    state: 'state',
    createdDate: 'createdDate',
    createdBy: 'createdBy',
    modifiedDate: 'modifiedDate',
    modifiedBy: 'modifiedBy',
    extractedAt: 'extractedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


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

  export type RevenueWhereInput = {
    AND?: RevenueWhereInput | RevenueWhereInput[]
    OR?: RevenueWhereInput[]
    NOT?: RevenueWhereInput | RevenueWhereInput[]
    id?: IntFilter<"Revenue"> | number
    source_id?: StringFilter<"Revenue"> | string
    code?: StringNullableFilter<"Revenue"> | string | null
    branchId?: IntNullableFilter<"Revenue"> | number | null
    custCode?: StringNullableFilter<"Revenue"> | string | null
    custName?: StringNullableFilter<"Revenue"> | string | null
    custPhone?: StringNullableFilter<"Revenue"> | string | null
    custAddress?: StringNullableFilter<"Revenue"> | string | null
    custBirthday?: DateTimeNullableFilter<"Revenue"> | Date | string | null
    depositId?: IntNullableFilter<"Revenue"> | number | null
    paidAmount?: FloatNullableFilter<"Revenue"> | number | null
    discountAmount?: FloatFilter<"Revenue"> | number
    depositAmountUsing?: FloatFilter<"Revenue"> | number
    totalPaid?: FloatFilter<"Revenue"> | number
    debtAmount?: FloatFilter<"Revenue"> | number
    methodName?: StringNullableFilter<"Revenue"> | string | null
    content?: StringNullableFilter<"Revenue"> | string | null
    serviceId?: IntFilter<"Revenue"> | number
    isProduct?: IntFilter<"Revenue"> | number
    quantity?: FloatFilter<"Revenue"> | number
    priceRoot?: FloatFilter<"Revenue"> | number
    priceUnit?: FloatFilter<"Revenue"> | number
    price?: FloatFilter<"Revenue"> | number
    amount?: FloatFilter<"Revenue"> | number
    timeToTreatment?: IntFilter<"Revenue"> | number
    percentOfService?: FloatFilter<"Revenue"> | number
    treatIndex?: IntFilter<"Revenue"> | number
    type?: StringNullableFilter<"Revenue"> | string | null
    typeName?: StringNullableFilter<"Revenue"> | string | null
    consultId1?: IntFilter<"Revenue"> | number
    consultId2?: IntFilter<"Revenue"> | number
    consultId3?: IntFilter<"Revenue"> | number
    consultId4?: IntFilter<"Revenue"> | number
    techId?: IntFilter<"Revenue"> | number
    tele1?: IntFilter<"Revenue"> | number
    tele2?: IntFilter<"Revenue"> | number
    createdDate?: DateTimeNullableFilter<"Revenue"> | Date | string | null
    createdBy?: StringNullableFilter<"Revenue"> | string | null
    modifiedDate?: DateTimeNullableFilter<"Revenue"> | Date | string | null
    state?: IntNullableFilter<"Revenue"> | number | null
    extractedAt?: DateTimeFilter<"Revenue"> | Date | string
  }

  export type RevenueOrderByWithRelationInput = {
    id?: SortOrder
    source_id?: SortOrder
    code?: SortOrderInput | SortOrder
    branchId?: SortOrderInput | SortOrder
    custCode?: SortOrderInput | SortOrder
    custName?: SortOrderInput | SortOrder
    custPhone?: SortOrderInput | SortOrder
    custAddress?: SortOrderInput | SortOrder
    custBirthday?: SortOrderInput | SortOrder
    depositId?: SortOrderInput | SortOrder
    paidAmount?: SortOrderInput | SortOrder
    discountAmount?: SortOrder
    depositAmountUsing?: SortOrder
    totalPaid?: SortOrder
    debtAmount?: SortOrder
    methodName?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    serviceId?: SortOrder
    isProduct?: SortOrder
    quantity?: SortOrder
    priceRoot?: SortOrder
    priceUnit?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    timeToTreatment?: SortOrder
    percentOfService?: SortOrder
    treatIndex?: SortOrder
    type?: SortOrderInput | SortOrder
    typeName?: SortOrderInput | SortOrder
    consultId1?: SortOrder
    consultId2?: SortOrder
    consultId3?: SortOrder
    consultId4?: SortOrder
    techId?: SortOrder
    tele1?: SortOrder
    tele2?: SortOrder
    createdDate?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    modifiedDate?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    extractedAt?: SortOrder
  }

  export type RevenueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    source_id?: string
    AND?: RevenueWhereInput | RevenueWhereInput[]
    OR?: RevenueWhereInput[]
    NOT?: RevenueWhereInput | RevenueWhereInput[]
    code?: StringNullableFilter<"Revenue"> | string | null
    branchId?: IntNullableFilter<"Revenue"> | number | null
    custCode?: StringNullableFilter<"Revenue"> | string | null
    custName?: StringNullableFilter<"Revenue"> | string | null
    custPhone?: StringNullableFilter<"Revenue"> | string | null
    custAddress?: StringNullableFilter<"Revenue"> | string | null
    custBirthday?: DateTimeNullableFilter<"Revenue"> | Date | string | null
    depositId?: IntNullableFilter<"Revenue"> | number | null
    paidAmount?: FloatNullableFilter<"Revenue"> | number | null
    discountAmount?: FloatFilter<"Revenue"> | number
    depositAmountUsing?: FloatFilter<"Revenue"> | number
    totalPaid?: FloatFilter<"Revenue"> | number
    debtAmount?: FloatFilter<"Revenue"> | number
    methodName?: StringNullableFilter<"Revenue"> | string | null
    content?: StringNullableFilter<"Revenue"> | string | null
    serviceId?: IntFilter<"Revenue"> | number
    isProduct?: IntFilter<"Revenue"> | number
    quantity?: FloatFilter<"Revenue"> | number
    priceRoot?: FloatFilter<"Revenue"> | number
    priceUnit?: FloatFilter<"Revenue"> | number
    price?: FloatFilter<"Revenue"> | number
    amount?: FloatFilter<"Revenue"> | number
    timeToTreatment?: IntFilter<"Revenue"> | number
    percentOfService?: FloatFilter<"Revenue"> | number
    treatIndex?: IntFilter<"Revenue"> | number
    type?: StringNullableFilter<"Revenue"> | string | null
    typeName?: StringNullableFilter<"Revenue"> | string | null
    consultId1?: IntFilter<"Revenue"> | number
    consultId2?: IntFilter<"Revenue"> | number
    consultId3?: IntFilter<"Revenue"> | number
    consultId4?: IntFilter<"Revenue"> | number
    techId?: IntFilter<"Revenue"> | number
    tele1?: IntFilter<"Revenue"> | number
    tele2?: IntFilter<"Revenue"> | number
    createdDate?: DateTimeNullableFilter<"Revenue"> | Date | string | null
    createdBy?: StringNullableFilter<"Revenue"> | string | null
    modifiedDate?: DateTimeNullableFilter<"Revenue"> | Date | string | null
    state?: IntNullableFilter<"Revenue"> | number | null
    extractedAt?: DateTimeFilter<"Revenue"> | Date | string
  }, "id" | "source_id">

  export type RevenueOrderByWithAggregationInput = {
    id?: SortOrder
    source_id?: SortOrder
    code?: SortOrderInput | SortOrder
    branchId?: SortOrderInput | SortOrder
    custCode?: SortOrderInput | SortOrder
    custName?: SortOrderInput | SortOrder
    custPhone?: SortOrderInput | SortOrder
    custAddress?: SortOrderInput | SortOrder
    custBirthday?: SortOrderInput | SortOrder
    depositId?: SortOrderInput | SortOrder
    paidAmount?: SortOrderInput | SortOrder
    discountAmount?: SortOrder
    depositAmountUsing?: SortOrder
    totalPaid?: SortOrder
    debtAmount?: SortOrder
    methodName?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    serviceId?: SortOrder
    isProduct?: SortOrder
    quantity?: SortOrder
    priceRoot?: SortOrder
    priceUnit?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    timeToTreatment?: SortOrder
    percentOfService?: SortOrder
    treatIndex?: SortOrder
    type?: SortOrderInput | SortOrder
    typeName?: SortOrderInput | SortOrder
    consultId1?: SortOrder
    consultId2?: SortOrder
    consultId3?: SortOrder
    consultId4?: SortOrder
    techId?: SortOrder
    tele1?: SortOrder
    tele2?: SortOrder
    createdDate?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    modifiedDate?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    extractedAt?: SortOrder
    _count?: RevenueCountOrderByAggregateInput
    _avg?: RevenueAvgOrderByAggregateInput
    _max?: RevenueMaxOrderByAggregateInput
    _min?: RevenueMinOrderByAggregateInput
    _sum?: RevenueSumOrderByAggregateInput
  }

  export type RevenueScalarWhereWithAggregatesInput = {
    AND?: RevenueScalarWhereWithAggregatesInput | RevenueScalarWhereWithAggregatesInput[]
    OR?: RevenueScalarWhereWithAggregatesInput[]
    NOT?: RevenueScalarWhereWithAggregatesInput | RevenueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Revenue"> | number
    source_id?: StringWithAggregatesFilter<"Revenue"> | string
    code?: StringNullableWithAggregatesFilter<"Revenue"> | string | null
    branchId?: IntNullableWithAggregatesFilter<"Revenue"> | number | null
    custCode?: StringNullableWithAggregatesFilter<"Revenue"> | string | null
    custName?: StringNullableWithAggregatesFilter<"Revenue"> | string | null
    custPhone?: StringNullableWithAggregatesFilter<"Revenue"> | string | null
    custAddress?: StringNullableWithAggregatesFilter<"Revenue"> | string | null
    custBirthday?: DateTimeNullableWithAggregatesFilter<"Revenue"> | Date | string | null
    depositId?: IntNullableWithAggregatesFilter<"Revenue"> | number | null
    paidAmount?: FloatNullableWithAggregatesFilter<"Revenue"> | number | null
    discountAmount?: FloatWithAggregatesFilter<"Revenue"> | number
    depositAmountUsing?: FloatWithAggregatesFilter<"Revenue"> | number
    totalPaid?: FloatWithAggregatesFilter<"Revenue"> | number
    debtAmount?: FloatWithAggregatesFilter<"Revenue"> | number
    methodName?: StringNullableWithAggregatesFilter<"Revenue"> | string | null
    content?: StringNullableWithAggregatesFilter<"Revenue"> | string | null
    serviceId?: IntWithAggregatesFilter<"Revenue"> | number
    isProduct?: IntWithAggregatesFilter<"Revenue"> | number
    quantity?: FloatWithAggregatesFilter<"Revenue"> | number
    priceRoot?: FloatWithAggregatesFilter<"Revenue"> | number
    priceUnit?: FloatWithAggregatesFilter<"Revenue"> | number
    price?: FloatWithAggregatesFilter<"Revenue"> | number
    amount?: FloatWithAggregatesFilter<"Revenue"> | number
    timeToTreatment?: IntWithAggregatesFilter<"Revenue"> | number
    percentOfService?: FloatWithAggregatesFilter<"Revenue"> | number
    treatIndex?: IntWithAggregatesFilter<"Revenue"> | number
    type?: StringNullableWithAggregatesFilter<"Revenue"> | string | null
    typeName?: StringNullableWithAggregatesFilter<"Revenue"> | string | null
    consultId1?: IntWithAggregatesFilter<"Revenue"> | number
    consultId2?: IntWithAggregatesFilter<"Revenue"> | number
    consultId3?: IntWithAggregatesFilter<"Revenue"> | number
    consultId4?: IntWithAggregatesFilter<"Revenue"> | number
    techId?: IntWithAggregatesFilter<"Revenue"> | number
    tele1?: IntWithAggregatesFilter<"Revenue"> | number
    tele2?: IntWithAggregatesFilter<"Revenue"> | number
    createdDate?: DateTimeNullableWithAggregatesFilter<"Revenue"> | Date | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Revenue"> | string | null
    modifiedDate?: DateTimeNullableWithAggregatesFilter<"Revenue"> | Date | string | null
    state?: IntNullableWithAggregatesFilter<"Revenue"> | number | null
    extractedAt?: DateTimeWithAggregatesFilter<"Revenue"> | Date | string
  }

  export type TreatmentWhereInput = {
    AND?: TreatmentWhereInput | TreatmentWhereInput[]
    OR?: TreatmentWhereInput[]
    NOT?: TreatmentWhereInput | TreatmentWhereInput[]
    id?: IntFilter<"Treatment"> | number
    source_id?: StringFilter<"Treatment"> | string
    name?: StringNullableFilter<"Treatment"> | string | null
    code?: StringNullableFilter<"Treatment"> | string | null
    codeOld?: StringNullableFilter<"Treatment"> | string | null
    docCode?: StringNullableFilter<"Treatment"> | string | null
    email?: StringNullableFilter<"Treatment"> | string | null
    phone?: StringNullableFilter<"Treatment"> | string | null
    phone2?: StringNullableFilter<"Treatment"> | string | null
    birthday?: DateTimeNullableFilter<"Treatment"> | Date | string | null
    gender?: StringNullableFilter<"Treatment"> | string | null
    address?: StringNullableFilter<"Treatment"> | string | null
    commune?: StringNullableFilter<"Treatment"> | string | null
    district?: StringNullableFilter<"Treatment"> | string | null
    city?: StringNullableFilter<"Treatment"> | string | null
    serviceId?: IntFilter<"Treatment"> | number
    serviceTypeId?: IntFilter<"Treatment"> | number
    serviceCode?: StringNullableFilter<"Treatment"> | string | null
    tabId?: IntFilter<"Treatment"> | number
    tabCode?: StringNullableFilter<"Treatment"> | string | null
    comboId?: IntFilter<"Treatment"> | number
    comboCode?: StringNullableFilter<"Treatment"> | string | null
    serviceName?: StringNullableFilter<"Treatment"> | string | null
    timeIndex?: StringNullableFilter<"Treatment"> | string | null
    timeToTreatment?: IntFilter<"Treatment"> | number
    teethChoosing?: StringNullableFilter<"Treatment"> | string | null
    priceUnit?: FloatFilter<"Treatment"> | number
    quantity?: FloatFilter<"Treatment"> | number
    discount?: FloatFilter<"Treatment"> | number
    priceRoot?: FloatFilter<"Treatment"> | number
    priceDiscounted?: FloatFilter<"Treatment"> | number
    doctor?: IntFilter<"Treatment"> | number
    doctor2?: IntFilter<"Treatment"> | number
    doctor3?: IntFilter<"Treatment"> | number
    doctor4?: IntFilter<"Treatment"> | number
    assistant?: IntFilter<"Treatment"> | number
    assistant2?: IntFilter<"Treatment"> | number
    assistant3?: IntFilter<"Treatment"> | number
    assistant4?: IntFilter<"Treatment"> | number
    technician?: IntFilter<"Treatment"> | number
    technician2?: IntFilter<"Treatment"> | number
    timeTreatIndex?: IntFilter<"Treatment"> | number
    percent?: FloatFilter<"Treatment"> | number
    percentNew?: FloatFilter<"Treatment"> | number
    percentStage?: FloatFilter<"Treatment"> | number
    percentNewStage?: FloatFilter<"Treatment"> | number
    note?: StringNullableFilter<"Treatment"> | string | null
    content?: StringNullableFilter<"Treatment"> | string | null
    contentNext?: StringNullableFilter<"Treatment"> | string | null
    symptoms?: StringNullableFilter<"Treatment"> | string | null
    treatDateNext?: DateTimeNullableFilter<"Treatment"> | Date | string | null
    branchId?: IntFilter<"Treatment"> | number
    createdDate?: DateTimeNullableFilter<"Treatment"> | Date | string | null
    createdBy?: StringNullableFilter<"Treatment"> | string | null
    modifiedDate?: DateTimeNullableFilter<"Treatment"> | Date | string | null
    modifiedBy?: IntNullableFilter<"Treatment"> | number | null
    state?: IntFilter<"Treatment"> | number
    extractedAt?: DateTimeFilter<"Treatment"> | Date | string
  }

  export type TreatmentOrderByWithRelationInput = {
    id?: SortOrder
    source_id?: SortOrder
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
    serviceId?: SortOrder
    serviceTypeId?: SortOrder
    serviceCode?: SortOrderInput | SortOrder
    tabId?: SortOrder
    tabCode?: SortOrderInput | SortOrder
    comboId?: SortOrder
    comboCode?: SortOrderInput | SortOrder
    serviceName?: SortOrderInput | SortOrder
    timeIndex?: SortOrderInput | SortOrder
    timeToTreatment?: SortOrder
    teethChoosing?: SortOrderInput | SortOrder
    priceUnit?: SortOrder
    quantity?: SortOrder
    discount?: SortOrder
    priceRoot?: SortOrder
    priceDiscounted?: SortOrder
    doctor?: SortOrder
    doctor2?: SortOrder
    doctor3?: SortOrder
    doctor4?: SortOrder
    assistant?: SortOrder
    assistant2?: SortOrder
    assistant3?: SortOrder
    assistant4?: SortOrder
    technician?: SortOrder
    technician2?: SortOrder
    timeTreatIndex?: SortOrder
    percent?: SortOrder
    percentNew?: SortOrder
    percentStage?: SortOrder
    percentNewStage?: SortOrder
    note?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    contentNext?: SortOrderInput | SortOrder
    symptoms?: SortOrderInput | SortOrder
    treatDateNext?: SortOrderInput | SortOrder
    branchId?: SortOrder
    createdDate?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    modifiedDate?: SortOrderInput | SortOrder
    modifiedBy?: SortOrderInput | SortOrder
    state?: SortOrder
    extractedAt?: SortOrder
  }

  export type TreatmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    source_id?: string
    code_serviceCode_createdDate?: TreatmentCodeServiceCodeCreatedDateCompoundUniqueInput
    AND?: TreatmentWhereInput | TreatmentWhereInput[]
    OR?: TreatmentWhereInput[]
    NOT?: TreatmentWhereInput | TreatmentWhereInput[]
    name?: StringNullableFilter<"Treatment"> | string | null
    code?: StringNullableFilter<"Treatment"> | string | null
    codeOld?: StringNullableFilter<"Treatment"> | string | null
    docCode?: StringNullableFilter<"Treatment"> | string | null
    email?: StringNullableFilter<"Treatment"> | string | null
    phone?: StringNullableFilter<"Treatment"> | string | null
    phone2?: StringNullableFilter<"Treatment"> | string | null
    birthday?: DateTimeNullableFilter<"Treatment"> | Date | string | null
    gender?: StringNullableFilter<"Treatment"> | string | null
    address?: StringNullableFilter<"Treatment"> | string | null
    commune?: StringNullableFilter<"Treatment"> | string | null
    district?: StringNullableFilter<"Treatment"> | string | null
    city?: StringNullableFilter<"Treatment"> | string | null
    serviceId?: IntFilter<"Treatment"> | number
    serviceTypeId?: IntFilter<"Treatment"> | number
    serviceCode?: StringNullableFilter<"Treatment"> | string | null
    tabId?: IntFilter<"Treatment"> | number
    tabCode?: StringNullableFilter<"Treatment"> | string | null
    comboId?: IntFilter<"Treatment"> | number
    comboCode?: StringNullableFilter<"Treatment"> | string | null
    serviceName?: StringNullableFilter<"Treatment"> | string | null
    timeIndex?: StringNullableFilter<"Treatment"> | string | null
    timeToTreatment?: IntFilter<"Treatment"> | number
    teethChoosing?: StringNullableFilter<"Treatment"> | string | null
    priceUnit?: FloatFilter<"Treatment"> | number
    quantity?: FloatFilter<"Treatment"> | number
    discount?: FloatFilter<"Treatment"> | number
    priceRoot?: FloatFilter<"Treatment"> | number
    priceDiscounted?: FloatFilter<"Treatment"> | number
    doctor?: IntFilter<"Treatment"> | number
    doctor2?: IntFilter<"Treatment"> | number
    doctor3?: IntFilter<"Treatment"> | number
    doctor4?: IntFilter<"Treatment"> | number
    assistant?: IntFilter<"Treatment"> | number
    assistant2?: IntFilter<"Treatment"> | number
    assistant3?: IntFilter<"Treatment"> | number
    assistant4?: IntFilter<"Treatment"> | number
    technician?: IntFilter<"Treatment"> | number
    technician2?: IntFilter<"Treatment"> | number
    timeTreatIndex?: IntFilter<"Treatment"> | number
    percent?: FloatFilter<"Treatment"> | number
    percentNew?: FloatFilter<"Treatment"> | number
    percentStage?: FloatFilter<"Treatment"> | number
    percentNewStage?: FloatFilter<"Treatment"> | number
    note?: StringNullableFilter<"Treatment"> | string | null
    content?: StringNullableFilter<"Treatment"> | string | null
    contentNext?: StringNullableFilter<"Treatment"> | string | null
    symptoms?: StringNullableFilter<"Treatment"> | string | null
    treatDateNext?: DateTimeNullableFilter<"Treatment"> | Date | string | null
    branchId?: IntFilter<"Treatment"> | number
    createdDate?: DateTimeNullableFilter<"Treatment"> | Date | string | null
    createdBy?: StringNullableFilter<"Treatment"> | string | null
    modifiedDate?: DateTimeNullableFilter<"Treatment"> | Date | string | null
    modifiedBy?: IntNullableFilter<"Treatment"> | number | null
    state?: IntFilter<"Treatment"> | number
    extractedAt?: DateTimeFilter<"Treatment"> | Date | string
  }, "id" | "source_id" | "code_serviceCode_createdDate">

  export type TreatmentOrderByWithAggregationInput = {
    id?: SortOrder
    source_id?: SortOrder
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
    serviceId?: SortOrder
    serviceTypeId?: SortOrder
    serviceCode?: SortOrderInput | SortOrder
    tabId?: SortOrder
    tabCode?: SortOrderInput | SortOrder
    comboId?: SortOrder
    comboCode?: SortOrderInput | SortOrder
    serviceName?: SortOrderInput | SortOrder
    timeIndex?: SortOrderInput | SortOrder
    timeToTreatment?: SortOrder
    teethChoosing?: SortOrderInput | SortOrder
    priceUnit?: SortOrder
    quantity?: SortOrder
    discount?: SortOrder
    priceRoot?: SortOrder
    priceDiscounted?: SortOrder
    doctor?: SortOrder
    doctor2?: SortOrder
    doctor3?: SortOrder
    doctor4?: SortOrder
    assistant?: SortOrder
    assistant2?: SortOrder
    assistant3?: SortOrder
    assistant4?: SortOrder
    technician?: SortOrder
    technician2?: SortOrder
    timeTreatIndex?: SortOrder
    percent?: SortOrder
    percentNew?: SortOrder
    percentStage?: SortOrder
    percentNewStage?: SortOrder
    note?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    contentNext?: SortOrderInput | SortOrder
    symptoms?: SortOrderInput | SortOrder
    treatDateNext?: SortOrderInput | SortOrder
    branchId?: SortOrder
    createdDate?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    modifiedDate?: SortOrderInput | SortOrder
    modifiedBy?: SortOrderInput | SortOrder
    state?: SortOrder
    extractedAt?: SortOrder
    _count?: TreatmentCountOrderByAggregateInput
    _avg?: TreatmentAvgOrderByAggregateInput
    _max?: TreatmentMaxOrderByAggregateInput
    _min?: TreatmentMinOrderByAggregateInput
    _sum?: TreatmentSumOrderByAggregateInput
  }

  export type TreatmentScalarWhereWithAggregatesInput = {
    AND?: TreatmentScalarWhereWithAggregatesInput | TreatmentScalarWhereWithAggregatesInput[]
    OR?: TreatmentScalarWhereWithAggregatesInput[]
    NOT?: TreatmentScalarWhereWithAggregatesInput | TreatmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Treatment"> | number
    source_id?: StringWithAggregatesFilter<"Treatment"> | string
    name?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    code?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    codeOld?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    docCode?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    email?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    phone2?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    birthday?: DateTimeNullableWithAggregatesFilter<"Treatment"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    address?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    commune?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    district?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    city?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    serviceId?: IntWithAggregatesFilter<"Treatment"> | number
    serviceTypeId?: IntWithAggregatesFilter<"Treatment"> | number
    serviceCode?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    tabId?: IntWithAggregatesFilter<"Treatment"> | number
    tabCode?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    comboId?: IntWithAggregatesFilter<"Treatment"> | number
    comboCode?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    serviceName?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    timeIndex?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    timeToTreatment?: IntWithAggregatesFilter<"Treatment"> | number
    teethChoosing?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    priceUnit?: FloatWithAggregatesFilter<"Treatment"> | number
    quantity?: FloatWithAggregatesFilter<"Treatment"> | number
    discount?: FloatWithAggregatesFilter<"Treatment"> | number
    priceRoot?: FloatWithAggregatesFilter<"Treatment"> | number
    priceDiscounted?: FloatWithAggregatesFilter<"Treatment"> | number
    doctor?: IntWithAggregatesFilter<"Treatment"> | number
    doctor2?: IntWithAggregatesFilter<"Treatment"> | number
    doctor3?: IntWithAggregatesFilter<"Treatment"> | number
    doctor4?: IntWithAggregatesFilter<"Treatment"> | number
    assistant?: IntWithAggregatesFilter<"Treatment"> | number
    assistant2?: IntWithAggregatesFilter<"Treatment"> | number
    assistant3?: IntWithAggregatesFilter<"Treatment"> | number
    assistant4?: IntWithAggregatesFilter<"Treatment"> | number
    technician?: IntWithAggregatesFilter<"Treatment"> | number
    technician2?: IntWithAggregatesFilter<"Treatment"> | number
    timeTreatIndex?: IntWithAggregatesFilter<"Treatment"> | number
    percent?: FloatWithAggregatesFilter<"Treatment"> | number
    percentNew?: FloatWithAggregatesFilter<"Treatment"> | number
    percentStage?: FloatWithAggregatesFilter<"Treatment"> | number
    percentNewStage?: FloatWithAggregatesFilter<"Treatment"> | number
    note?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    content?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    contentNext?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    symptoms?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    treatDateNext?: DateTimeNullableWithAggregatesFilter<"Treatment"> | Date | string | null
    branchId?: IntWithAggregatesFilter<"Treatment"> | number
    createdDate?: DateTimeNullableWithAggregatesFilter<"Treatment"> | Date | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    modifiedDate?: DateTimeNullableWithAggregatesFilter<"Treatment"> | Date | string | null
    modifiedBy?: IntNullableWithAggregatesFilter<"Treatment"> | number | null
    state?: IntWithAggregatesFilter<"Treatment"> | number
    extractedAt?: DateTimeWithAggregatesFilter<"Treatment"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: IntFilter<"Appointment"> | number
    source_id?: StringFilter<"Appointment"> | string
    custId?: StringNullableFilter<"Appointment"> | string | null
    custCode?: StringNullableFilter<"Appointment"> | string | null
    custName?: StringNullableFilter<"Appointment"> | string | null
    dateFrom?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    statusId?: IntFilter<"Appointment"> | number
    statusName?: StringNullableFilter<"Appointment"> | string | null
    statusTime?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    isCancel?: IntFilter<"Appointment"> | number
    branchId?: IntFilter<"Appointment"> | number
    branchName?: StringNullableFilter<"Appointment"> | string | null
    content?: StringNullableFilter<"Appointment"> | string | null
    note?: StringNullableFilter<"Appointment"> | string | null
    noteForBranch?: StringNullableFilter<"Appointment"> | string | null
    consultId?: IntFilter<"Appointment"> | number
    doctorId?: IntFilter<"Appointment"> | number
    doctorId2?: IntFilter<"Appointment"> | number
    assistantId?: IntFilter<"Appointment"> | number
    roomId?: IntFilter<"Appointment"> | number
    room?: StringNullableFilter<"Appointment"> | string | null
    remindContent?: StringNullableFilter<"Appointment"> | string | null
    reasonCancelId?: IntFilter<"Appointment"> | number
    typeId?: IntFilter<"Appointment"> | number
    typeDetailId?: IntFilter<"Appointment"> | number
    serviceCareId?: StringNullableFilter<"Appointment"> | string | null
    serviceCare?: StringNullableFilter<"Appointment"> | string | null
    state?: IntFilter<"Appointment"> | number
    createdDate?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    createdBy?: StringNullableFilter<"Appointment"> | string | null
    modifiedDate?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    modifiedBy?: StringNullableFilter<"Appointment"> | string | null
    extractedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    source_id?: SortOrder
    custId?: SortOrderInput | SortOrder
    custCode?: SortOrderInput | SortOrder
    custName?: SortOrderInput | SortOrder
    dateFrom?: SortOrderInput | SortOrder
    statusId?: SortOrder
    statusName?: SortOrderInput | SortOrder
    statusTime?: SortOrderInput | SortOrder
    isCancel?: SortOrder
    branchId?: SortOrder
    branchName?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    noteForBranch?: SortOrderInput | SortOrder
    consultId?: SortOrder
    doctorId?: SortOrder
    doctorId2?: SortOrder
    assistantId?: SortOrder
    roomId?: SortOrder
    room?: SortOrderInput | SortOrder
    remindContent?: SortOrderInput | SortOrder
    reasonCancelId?: SortOrder
    typeId?: SortOrder
    typeDetailId?: SortOrder
    serviceCareId?: SortOrderInput | SortOrder
    serviceCare?: SortOrderInput | SortOrder
    state?: SortOrder
    createdDate?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    modifiedDate?: SortOrderInput | SortOrder
    modifiedBy?: SortOrderInput | SortOrder
    extractedAt?: SortOrder
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    source_id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    custId?: StringNullableFilter<"Appointment"> | string | null
    custCode?: StringNullableFilter<"Appointment"> | string | null
    custName?: StringNullableFilter<"Appointment"> | string | null
    dateFrom?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    statusId?: IntFilter<"Appointment"> | number
    statusName?: StringNullableFilter<"Appointment"> | string | null
    statusTime?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    isCancel?: IntFilter<"Appointment"> | number
    branchId?: IntFilter<"Appointment"> | number
    branchName?: StringNullableFilter<"Appointment"> | string | null
    content?: StringNullableFilter<"Appointment"> | string | null
    note?: StringNullableFilter<"Appointment"> | string | null
    noteForBranch?: StringNullableFilter<"Appointment"> | string | null
    consultId?: IntFilter<"Appointment"> | number
    doctorId?: IntFilter<"Appointment"> | number
    doctorId2?: IntFilter<"Appointment"> | number
    assistantId?: IntFilter<"Appointment"> | number
    roomId?: IntFilter<"Appointment"> | number
    room?: StringNullableFilter<"Appointment"> | string | null
    remindContent?: StringNullableFilter<"Appointment"> | string | null
    reasonCancelId?: IntFilter<"Appointment"> | number
    typeId?: IntFilter<"Appointment"> | number
    typeDetailId?: IntFilter<"Appointment"> | number
    serviceCareId?: StringNullableFilter<"Appointment"> | string | null
    serviceCare?: StringNullableFilter<"Appointment"> | string | null
    state?: IntFilter<"Appointment"> | number
    createdDate?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    createdBy?: StringNullableFilter<"Appointment"> | string | null
    modifiedDate?: DateTimeNullableFilter<"Appointment"> | Date | string | null
    modifiedBy?: StringNullableFilter<"Appointment"> | string | null
    extractedAt?: DateTimeFilter<"Appointment"> | Date | string
  }, "id" | "source_id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    source_id?: SortOrder
    custId?: SortOrderInput | SortOrder
    custCode?: SortOrderInput | SortOrder
    custName?: SortOrderInput | SortOrder
    dateFrom?: SortOrderInput | SortOrder
    statusId?: SortOrder
    statusName?: SortOrderInput | SortOrder
    statusTime?: SortOrderInput | SortOrder
    isCancel?: SortOrder
    branchId?: SortOrder
    branchName?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    noteForBranch?: SortOrderInput | SortOrder
    consultId?: SortOrder
    doctorId?: SortOrder
    doctorId2?: SortOrder
    assistantId?: SortOrder
    roomId?: SortOrder
    room?: SortOrderInput | SortOrder
    remindContent?: SortOrderInput | SortOrder
    reasonCancelId?: SortOrder
    typeId?: SortOrder
    typeDetailId?: SortOrder
    serviceCareId?: SortOrderInput | SortOrder
    serviceCare?: SortOrderInput | SortOrder
    state?: SortOrder
    createdDate?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    modifiedDate?: SortOrderInput | SortOrder
    modifiedBy?: SortOrderInput | SortOrder
    extractedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Appointment"> | number
    source_id?: StringWithAggregatesFilter<"Appointment"> | string
    custId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    custCode?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    custName?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    dateFrom?: DateTimeNullableWithAggregatesFilter<"Appointment"> | Date | string | null
    statusId?: IntWithAggregatesFilter<"Appointment"> | number
    statusName?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    statusTime?: DateTimeNullableWithAggregatesFilter<"Appointment"> | Date | string | null
    isCancel?: IntWithAggregatesFilter<"Appointment"> | number
    branchId?: IntWithAggregatesFilter<"Appointment"> | number
    branchName?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    content?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    note?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    noteForBranch?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    consultId?: IntWithAggregatesFilter<"Appointment"> | number
    doctorId?: IntWithAggregatesFilter<"Appointment"> | number
    doctorId2?: IntWithAggregatesFilter<"Appointment"> | number
    assistantId?: IntWithAggregatesFilter<"Appointment"> | number
    roomId?: IntWithAggregatesFilter<"Appointment"> | number
    room?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    remindContent?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    reasonCancelId?: IntWithAggregatesFilter<"Appointment"> | number
    typeId?: IntWithAggregatesFilter<"Appointment"> | number
    typeDetailId?: IntWithAggregatesFilter<"Appointment"> | number
    serviceCareId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    serviceCare?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    state?: IntWithAggregatesFilter<"Appointment"> | number
    createdDate?: DateTimeNullableWithAggregatesFilter<"Appointment"> | Date | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    modifiedDate?: DateTimeNullableWithAggregatesFilter<"Appointment"> | Date | string | null
    modifiedBy?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    extractedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
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

  export type RevenueCreateInput = {
    source_id: string
    code?: string | null
    branchId?: number | null
    custCode?: string | null
    custName?: string | null
    custPhone?: string | null
    custAddress?: string | null
    custBirthday?: Date | string | null
    depositId?: number | null
    paidAmount?: number | null
    discountAmount?: number
    depositAmountUsing?: number
    totalPaid?: number
    debtAmount?: number
    methodName?: string | null
    content?: string | null
    serviceId?: number
    isProduct?: number
    quantity?: number
    priceRoot?: number
    priceUnit?: number
    price?: number
    amount?: number
    timeToTreatment?: number
    percentOfService?: number
    treatIndex?: number
    type?: string | null
    typeName?: string | null
    consultId1?: number
    consultId2?: number
    consultId3?: number
    consultId4?: number
    techId?: number
    tele1?: number
    tele2?: number
    createdDate?: Date | string | null
    createdBy?: string | null
    modifiedDate?: Date | string | null
    state?: number | null
    extractedAt?: Date | string
  }

  export type RevenueUncheckedCreateInput = {
    id?: number
    source_id: string
    code?: string | null
    branchId?: number | null
    custCode?: string | null
    custName?: string | null
    custPhone?: string | null
    custAddress?: string | null
    custBirthday?: Date | string | null
    depositId?: number | null
    paidAmount?: number | null
    discountAmount?: number
    depositAmountUsing?: number
    totalPaid?: number
    debtAmount?: number
    methodName?: string | null
    content?: string | null
    serviceId?: number
    isProduct?: number
    quantity?: number
    priceRoot?: number
    priceUnit?: number
    price?: number
    amount?: number
    timeToTreatment?: number
    percentOfService?: number
    treatIndex?: number
    type?: string | null
    typeName?: string | null
    consultId1?: number
    consultId2?: number
    consultId3?: number
    consultId4?: number
    techId?: number
    tele1?: number
    tele2?: number
    createdDate?: Date | string | null
    createdBy?: string | null
    modifiedDate?: Date | string | null
    state?: number | null
    extractedAt?: Date | string
  }

  export type RevenueUpdateInput = {
    source_id?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    custCode?: NullableStringFieldUpdateOperationsInput | string | null
    custName?: NullableStringFieldUpdateOperationsInput | string | null
    custPhone?: NullableStringFieldUpdateOperationsInput | string | null
    custAddress?: NullableStringFieldUpdateOperationsInput | string | null
    custBirthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    depositId?: NullableIntFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: FloatFieldUpdateOperationsInput | number
    depositAmountUsing?: FloatFieldUpdateOperationsInput | number
    totalPaid?: FloatFieldUpdateOperationsInput | number
    debtAmount?: FloatFieldUpdateOperationsInput | number
    methodName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: IntFieldUpdateOperationsInput | number
    isProduct?: IntFieldUpdateOperationsInput | number
    quantity?: FloatFieldUpdateOperationsInput | number
    priceRoot?: FloatFieldUpdateOperationsInput | number
    priceUnit?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    timeToTreatment?: IntFieldUpdateOperationsInput | number
    percentOfService?: FloatFieldUpdateOperationsInput | number
    treatIndex?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    typeName?: NullableStringFieldUpdateOperationsInput | string | null
    consultId1?: IntFieldUpdateOperationsInput | number
    consultId2?: IntFieldUpdateOperationsInput | number
    consultId3?: IntFieldUpdateOperationsInput | number
    consultId4?: IntFieldUpdateOperationsInput | number
    techId?: IntFieldUpdateOperationsInput | number
    tele1?: IntFieldUpdateOperationsInput | number
    tele2?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: NullableIntFieldUpdateOperationsInput | number | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RevenueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_id?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    custCode?: NullableStringFieldUpdateOperationsInput | string | null
    custName?: NullableStringFieldUpdateOperationsInput | string | null
    custPhone?: NullableStringFieldUpdateOperationsInput | string | null
    custAddress?: NullableStringFieldUpdateOperationsInput | string | null
    custBirthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    depositId?: NullableIntFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: FloatFieldUpdateOperationsInput | number
    depositAmountUsing?: FloatFieldUpdateOperationsInput | number
    totalPaid?: FloatFieldUpdateOperationsInput | number
    debtAmount?: FloatFieldUpdateOperationsInput | number
    methodName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: IntFieldUpdateOperationsInput | number
    isProduct?: IntFieldUpdateOperationsInput | number
    quantity?: FloatFieldUpdateOperationsInput | number
    priceRoot?: FloatFieldUpdateOperationsInput | number
    priceUnit?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    timeToTreatment?: IntFieldUpdateOperationsInput | number
    percentOfService?: FloatFieldUpdateOperationsInput | number
    treatIndex?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    typeName?: NullableStringFieldUpdateOperationsInput | string | null
    consultId1?: IntFieldUpdateOperationsInput | number
    consultId2?: IntFieldUpdateOperationsInput | number
    consultId3?: IntFieldUpdateOperationsInput | number
    consultId4?: IntFieldUpdateOperationsInput | number
    techId?: IntFieldUpdateOperationsInput | number
    tele1?: IntFieldUpdateOperationsInput | number
    tele2?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: NullableIntFieldUpdateOperationsInput | number | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RevenueCreateManyInput = {
    id?: number
    source_id: string
    code?: string | null
    branchId?: number | null
    custCode?: string | null
    custName?: string | null
    custPhone?: string | null
    custAddress?: string | null
    custBirthday?: Date | string | null
    depositId?: number | null
    paidAmount?: number | null
    discountAmount?: number
    depositAmountUsing?: number
    totalPaid?: number
    debtAmount?: number
    methodName?: string | null
    content?: string | null
    serviceId?: number
    isProduct?: number
    quantity?: number
    priceRoot?: number
    priceUnit?: number
    price?: number
    amount?: number
    timeToTreatment?: number
    percentOfService?: number
    treatIndex?: number
    type?: string | null
    typeName?: string | null
    consultId1?: number
    consultId2?: number
    consultId3?: number
    consultId4?: number
    techId?: number
    tele1?: number
    tele2?: number
    createdDate?: Date | string | null
    createdBy?: string | null
    modifiedDate?: Date | string | null
    state?: number | null
    extractedAt?: Date | string
  }

  export type RevenueUpdateManyMutationInput = {
    source_id?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    custCode?: NullableStringFieldUpdateOperationsInput | string | null
    custName?: NullableStringFieldUpdateOperationsInput | string | null
    custPhone?: NullableStringFieldUpdateOperationsInput | string | null
    custAddress?: NullableStringFieldUpdateOperationsInput | string | null
    custBirthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    depositId?: NullableIntFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: FloatFieldUpdateOperationsInput | number
    depositAmountUsing?: FloatFieldUpdateOperationsInput | number
    totalPaid?: FloatFieldUpdateOperationsInput | number
    debtAmount?: FloatFieldUpdateOperationsInput | number
    methodName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: IntFieldUpdateOperationsInput | number
    isProduct?: IntFieldUpdateOperationsInput | number
    quantity?: FloatFieldUpdateOperationsInput | number
    priceRoot?: FloatFieldUpdateOperationsInput | number
    priceUnit?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    timeToTreatment?: IntFieldUpdateOperationsInput | number
    percentOfService?: FloatFieldUpdateOperationsInput | number
    treatIndex?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    typeName?: NullableStringFieldUpdateOperationsInput | string | null
    consultId1?: IntFieldUpdateOperationsInput | number
    consultId2?: IntFieldUpdateOperationsInput | number
    consultId3?: IntFieldUpdateOperationsInput | number
    consultId4?: IntFieldUpdateOperationsInput | number
    techId?: IntFieldUpdateOperationsInput | number
    tele1?: IntFieldUpdateOperationsInput | number
    tele2?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: NullableIntFieldUpdateOperationsInput | number | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RevenueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_id?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    branchId?: NullableIntFieldUpdateOperationsInput | number | null
    custCode?: NullableStringFieldUpdateOperationsInput | string | null
    custName?: NullableStringFieldUpdateOperationsInput | string | null
    custPhone?: NullableStringFieldUpdateOperationsInput | string | null
    custAddress?: NullableStringFieldUpdateOperationsInput | string | null
    custBirthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    depositId?: NullableIntFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: FloatFieldUpdateOperationsInput | number
    depositAmountUsing?: FloatFieldUpdateOperationsInput | number
    totalPaid?: FloatFieldUpdateOperationsInput | number
    debtAmount?: FloatFieldUpdateOperationsInput | number
    methodName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    serviceId?: IntFieldUpdateOperationsInput | number
    isProduct?: IntFieldUpdateOperationsInput | number
    quantity?: FloatFieldUpdateOperationsInput | number
    priceRoot?: FloatFieldUpdateOperationsInput | number
    priceUnit?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    timeToTreatment?: IntFieldUpdateOperationsInput | number
    percentOfService?: FloatFieldUpdateOperationsInput | number
    treatIndex?: IntFieldUpdateOperationsInput | number
    type?: NullableStringFieldUpdateOperationsInput | string | null
    typeName?: NullableStringFieldUpdateOperationsInput | string | null
    consultId1?: IntFieldUpdateOperationsInput | number
    consultId2?: IntFieldUpdateOperationsInput | number
    consultId3?: IntFieldUpdateOperationsInput | number
    consultId4?: IntFieldUpdateOperationsInput | number
    techId?: IntFieldUpdateOperationsInput | number
    tele1?: IntFieldUpdateOperationsInput | number
    tele2?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    state?: NullableIntFieldUpdateOperationsInput | number | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreatmentCreateInput = {
    source_id: string
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
    serviceId?: number
    serviceTypeId?: number
    serviceCode?: string | null
    tabId?: number
    tabCode?: string | null
    comboId?: number
    comboCode?: string | null
    serviceName?: string | null
    timeIndex?: string | null
    timeToTreatment?: number
    teethChoosing?: string | null
    priceUnit?: number
    quantity?: number
    discount?: number
    priceRoot?: number
    priceDiscounted?: number
    doctor?: number
    doctor2?: number
    doctor3?: number
    doctor4?: number
    assistant?: number
    assistant2?: number
    assistant3?: number
    assistant4?: number
    technician?: number
    technician2?: number
    timeTreatIndex?: number
    percent?: number
    percentNew?: number
    percentStage?: number
    percentNewStage?: number
    note?: string | null
    content?: string | null
    contentNext?: string | null
    symptoms?: string | null
    treatDateNext?: Date | string | null
    branchId?: number
    createdDate?: Date | string | null
    createdBy?: string | null
    modifiedDate?: Date | string | null
    modifiedBy?: number | null
    state?: number
    extractedAt?: Date | string
  }

  export type TreatmentUncheckedCreateInput = {
    id?: number
    source_id: string
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
    serviceId?: number
    serviceTypeId?: number
    serviceCode?: string | null
    tabId?: number
    tabCode?: string | null
    comboId?: number
    comboCode?: string | null
    serviceName?: string | null
    timeIndex?: string | null
    timeToTreatment?: number
    teethChoosing?: string | null
    priceUnit?: number
    quantity?: number
    discount?: number
    priceRoot?: number
    priceDiscounted?: number
    doctor?: number
    doctor2?: number
    doctor3?: number
    doctor4?: number
    assistant?: number
    assistant2?: number
    assistant3?: number
    assistant4?: number
    technician?: number
    technician2?: number
    timeTreatIndex?: number
    percent?: number
    percentNew?: number
    percentStage?: number
    percentNewStage?: number
    note?: string | null
    content?: string | null
    contentNext?: string | null
    symptoms?: string | null
    treatDateNext?: Date | string | null
    branchId?: number
    createdDate?: Date | string | null
    createdBy?: string | null
    modifiedDate?: Date | string | null
    modifiedBy?: number | null
    state?: number
    extractedAt?: Date | string
  }

  export type TreatmentUpdateInput = {
    source_id?: StringFieldUpdateOperationsInput | string
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
    serviceId?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: IntFieldUpdateOperationsInput | number
    serviceCode?: NullableStringFieldUpdateOperationsInput | string | null
    tabId?: IntFieldUpdateOperationsInput | number
    tabCode?: NullableStringFieldUpdateOperationsInput | string | null
    comboId?: IntFieldUpdateOperationsInput | number
    comboCode?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    timeIndex?: NullableStringFieldUpdateOperationsInput | string | null
    timeToTreatment?: IntFieldUpdateOperationsInput | number
    teethChoosing?: NullableStringFieldUpdateOperationsInput | string | null
    priceUnit?: FloatFieldUpdateOperationsInput | number
    quantity?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    priceRoot?: FloatFieldUpdateOperationsInput | number
    priceDiscounted?: FloatFieldUpdateOperationsInput | number
    doctor?: IntFieldUpdateOperationsInput | number
    doctor2?: IntFieldUpdateOperationsInput | number
    doctor3?: IntFieldUpdateOperationsInput | number
    doctor4?: IntFieldUpdateOperationsInput | number
    assistant?: IntFieldUpdateOperationsInput | number
    assistant2?: IntFieldUpdateOperationsInput | number
    assistant3?: IntFieldUpdateOperationsInput | number
    assistant4?: IntFieldUpdateOperationsInput | number
    technician?: IntFieldUpdateOperationsInput | number
    technician2?: IntFieldUpdateOperationsInput | number
    timeTreatIndex?: IntFieldUpdateOperationsInput | number
    percent?: FloatFieldUpdateOperationsInput | number
    percentNew?: FloatFieldUpdateOperationsInput | number
    percentStage?: FloatFieldUpdateOperationsInput | number
    percentNewStage?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    contentNext?: NullableStringFieldUpdateOperationsInput | string | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    treatDateNext?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branchId?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modifiedBy?: NullableIntFieldUpdateOperationsInput | number | null
    state?: IntFieldUpdateOperationsInput | number
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreatmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_id?: StringFieldUpdateOperationsInput | string
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
    serviceId?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: IntFieldUpdateOperationsInput | number
    serviceCode?: NullableStringFieldUpdateOperationsInput | string | null
    tabId?: IntFieldUpdateOperationsInput | number
    tabCode?: NullableStringFieldUpdateOperationsInput | string | null
    comboId?: IntFieldUpdateOperationsInput | number
    comboCode?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    timeIndex?: NullableStringFieldUpdateOperationsInput | string | null
    timeToTreatment?: IntFieldUpdateOperationsInput | number
    teethChoosing?: NullableStringFieldUpdateOperationsInput | string | null
    priceUnit?: FloatFieldUpdateOperationsInput | number
    quantity?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    priceRoot?: FloatFieldUpdateOperationsInput | number
    priceDiscounted?: FloatFieldUpdateOperationsInput | number
    doctor?: IntFieldUpdateOperationsInput | number
    doctor2?: IntFieldUpdateOperationsInput | number
    doctor3?: IntFieldUpdateOperationsInput | number
    doctor4?: IntFieldUpdateOperationsInput | number
    assistant?: IntFieldUpdateOperationsInput | number
    assistant2?: IntFieldUpdateOperationsInput | number
    assistant3?: IntFieldUpdateOperationsInput | number
    assistant4?: IntFieldUpdateOperationsInput | number
    technician?: IntFieldUpdateOperationsInput | number
    technician2?: IntFieldUpdateOperationsInput | number
    timeTreatIndex?: IntFieldUpdateOperationsInput | number
    percent?: FloatFieldUpdateOperationsInput | number
    percentNew?: FloatFieldUpdateOperationsInput | number
    percentStage?: FloatFieldUpdateOperationsInput | number
    percentNewStage?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    contentNext?: NullableStringFieldUpdateOperationsInput | string | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    treatDateNext?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branchId?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modifiedBy?: NullableIntFieldUpdateOperationsInput | number | null
    state?: IntFieldUpdateOperationsInput | number
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreatmentCreateManyInput = {
    id?: number
    source_id: string
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
    serviceId?: number
    serviceTypeId?: number
    serviceCode?: string | null
    tabId?: number
    tabCode?: string | null
    comboId?: number
    comboCode?: string | null
    serviceName?: string | null
    timeIndex?: string | null
    timeToTreatment?: number
    teethChoosing?: string | null
    priceUnit?: number
    quantity?: number
    discount?: number
    priceRoot?: number
    priceDiscounted?: number
    doctor?: number
    doctor2?: number
    doctor3?: number
    doctor4?: number
    assistant?: number
    assistant2?: number
    assistant3?: number
    assistant4?: number
    technician?: number
    technician2?: number
    timeTreatIndex?: number
    percent?: number
    percentNew?: number
    percentStage?: number
    percentNewStage?: number
    note?: string | null
    content?: string | null
    contentNext?: string | null
    symptoms?: string | null
    treatDateNext?: Date | string | null
    branchId?: number
    createdDate?: Date | string | null
    createdBy?: string | null
    modifiedDate?: Date | string | null
    modifiedBy?: number | null
    state?: number
    extractedAt?: Date | string
  }

  export type TreatmentUpdateManyMutationInput = {
    source_id?: StringFieldUpdateOperationsInput | string
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
    serviceId?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: IntFieldUpdateOperationsInput | number
    serviceCode?: NullableStringFieldUpdateOperationsInput | string | null
    tabId?: IntFieldUpdateOperationsInput | number
    tabCode?: NullableStringFieldUpdateOperationsInput | string | null
    comboId?: IntFieldUpdateOperationsInput | number
    comboCode?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    timeIndex?: NullableStringFieldUpdateOperationsInput | string | null
    timeToTreatment?: IntFieldUpdateOperationsInput | number
    teethChoosing?: NullableStringFieldUpdateOperationsInput | string | null
    priceUnit?: FloatFieldUpdateOperationsInput | number
    quantity?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    priceRoot?: FloatFieldUpdateOperationsInput | number
    priceDiscounted?: FloatFieldUpdateOperationsInput | number
    doctor?: IntFieldUpdateOperationsInput | number
    doctor2?: IntFieldUpdateOperationsInput | number
    doctor3?: IntFieldUpdateOperationsInput | number
    doctor4?: IntFieldUpdateOperationsInput | number
    assistant?: IntFieldUpdateOperationsInput | number
    assistant2?: IntFieldUpdateOperationsInput | number
    assistant3?: IntFieldUpdateOperationsInput | number
    assistant4?: IntFieldUpdateOperationsInput | number
    technician?: IntFieldUpdateOperationsInput | number
    technician2?: IntFieldUpdateOperationsInput | number
    timeTreatIndex?: IntFieldUpdateOperationsInput | number
    percent?: FloatFieldUpdateOperationsInput | number
    percentNew?: FloatFieldUpdateOperationsInput | number
    percentStage?: FloatFieldUpdateOperationsInput | number
    percentNewStage?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    contentNext?: NullableStringFieldUpdateOperationsInput | string | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    treatDateNext?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branchId?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modifiedBy?: NullableIntFieldUpdateOperationsInput | number | null
    state?: IntFieldUpdateOperationsInput | number
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreatmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_id?: StringFieldUpdateOperationsInput | string
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
    serviceId?: IntFieldUpdateOperationsInput | number
    serviceTypeId?: IntFieldUpdateOperationsInput | number
    serviceCode?: NullableStringFieldUpdateOperationsInput | string | null
    tabId?: IntFieldUpdateOperationsInput | number
    tabCode?: NullableStringFieldUpdateOperationsInput | string | null
    comboId?: IntFieldUpdateOperationsInput | number
    comboCode?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    timeIndex?: NullableStringFieldUpdateOperationsInput | string | null
    timeToTreatment?: IntFieldUpdateOperationsInput | number
    teethChoosing?: NullableStringFieldUpdateOperationsInput | string | null
    priceUnit?: FloatFieldUpdateOperationsInput | number
    quantity?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    priceRoot?: FloatFieldUpdateOperationsInput | number
    priceDiscounted?: FloatFieldUpdateOperationsInput | number
    doctor?: IntFieldUpdateOperationsInput | number
    doctor2?: IntFieldUpdateOperationsInput | number
    doctor3?: IntFieldUpdateOperationsInput | number
    doctor4?: IntFieldUpdateOperationsInput | number
    assistant?: IntFieldUpdateOperationsInput | number
    assistant2?: IntFieldUpdateOperationsInput | number
    assistant3?: IntFieldUpdateOperationsInput | number
    assistant4?: IntFieldUpdateOperationsInput | number
    technician?: IntFieldUpdateOperationsInput | number
    technician2?: IntFieldUpdateOperationsInput | number
    timeTreatIndex?: IntFieldUpdateOperationsInput | number
    percent?: FloatFieldUpdateOperationsInput | number
    percentNew?: FloatFieldUpdateOperationsInput | number
    percentStage?: FloatFieldUpdateOperationsInput | number
    percentNewStage?: FloatFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    contentNext?: NullableStringFieldUpdateOperationsInput | string | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    treatDateNext?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branchId?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modifiedBy?: NullableIntFieldUpdateOperationsInput | number | null
    state?: IntFieldUpdateOperationsInput | number
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    source_id: string
    custId?: string | null
    custCode?: string | null
    custName?: string | null
    dateFrom?: Date | string | null
    statusId?: number
    statusName?: string | null
    statusTime?: Date | string | null
    isCancel?: number
    branchId?: number
    branchName?: string | null
    content?: string | null
    note?: string | null
    noteForBranch?: string | null
    consultId?: number
    doctorId?: number
    doctorId2?: number
    assistantId?: number
    roomId?: number
    room?: string | null
    remindContent?: string | null
    reasonCancelId?: number
    typeId?: number
    typeDetailId?: number
    serviceCareId?: string | null
    serviceCare?: string | null
    state?: number
    createdDate?: Date | string | null
    createdBy?: string | null
    modifiedDate?: Date | string | null
    modifiedBy?: string | null
    extractedAt?: Date | string
  }

  export type AppointmentUncheckedCreateInput = {
    id?: number
    source_id: string
    custId?: string | null
    custCode?: string | null
    custName?: string | null
    dateFrom?: Date | string | null
    statusId?: number
    statusName?: string | null
    statusTime?: Date | string | null
    isCancel?: number
    branchId?: number
    branchName?: string | null
    content?: string | null
    note?: string | null
    noteForBranch?: string | null
    consultId?: number
    doctorId?: number
    doctorId2?: number
    assistantId?: number
    roomId?: number
    room?: string | null
    remindContent?: string | null
    reasonCancelId?: number
    typeId?: number
    typeDetailId?: number
    serviceCareId?: string | null
    serviceCare?: string | null
    state?: number
    createdDate?: Date | string | null
    createdBy?: string | null
    modifiedDate?: Date | string | null
    modifiedBy?: string | null
    extractedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    source_id?: StringFieldUpdateOperationsInput | string
    custId?: NullableStringFieldUpdateOperationsInput | string | null
    custCode?: NullableStringFieldUpdateOperationsInput | string | null
    custName?: NullableStringFieldUpdateOperationsInput | string | null
    dateFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusId?: IntFieldUpdateOperationsInput | number
    statusName?: NullableStringFieldUpdateOperationsInput | string | null
    statusTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCancel?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    noteForBranch?: NullableStringFieldUpdateOperationsInput | string | null
    consultId?: IntFieldUpdateOperationsInput | number
    doctorId?: IntFieldUpdateOperationsInput | number
    doctorId2?: IntFieldUpdateOperationsInput | number
    assistantId?: IntFieldUpdateOperationsInput | number
    roomId?: IntFieldUpdateOperationsInput | number
    room?: NullableStringFieldUpdateOperationsInput | string | null
    remindContent?: NullableStringFieldUpdateOperationsInput | string | null
    reasonCancelId?: IntFieldUpdateOperationsInput | number
    typeId?: IntFieldUpdateOperationsInput | number
    typeDetailId?: IntFieldUpdateOperationsInput | number
    serviceCareId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceCare?: NullableStringFieldUpdateOperationsInput | string | null
    state?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_id?: StringFieldUpdateOperationsInput | string
    custId?: NullableStringFieldUpdateOperationsInput | string | null
    custCode?: NullableStringFieldUpdateOperationsInput | string | null
    custName?: NullableStringFieldUpdateOperationsInput | string | null
    dateFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusId?: IntFieldUpdateOperationsInput | number
    statusName?: NullableStringFieldUpdateOperationsInput | string | null
    statusTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCancel?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    noteForBranch?: NullableStringFieldUpdateOperationsInput | string | null
    consultId?: IntFieldUpdateOperationsInput | number
    doctorId?: IntFieldUpdateOperationsInput | number
    doctorId2?: IntFieldUpdateOperationsInput | number
    assistantId?: IntFieldUpdateOperationsInput | number
    roomId?: IntFieldUpdateOperationsInput | number
    room?: NullableStringFieldUpdateOperationsInput | string | null
    remindContent?: NullableStringFieldUpdateOperationsInput | string | null
    reasonCancelId?: IntFieldUpdateOperationsInput | number
    typeId?: IntFieldUpdateOperationsInput | number
    typeDetailId?: IntFieldUpdateOperationsInput | number
    serviceCareId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceCare?: NullableStringFieldUpdateOperationsInput | string | null
    state?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: number
    source_id: string
    custId?: string | null
    custCode?: string | null
    custName?: string | null
    dateFrom?: Date | string | null
    statusId?: number
    statusName?: string | null
    statusTime?: Date | string | null
    isCancel?: number
    branchId?: number
    branchName?: string | null
    content?: string | null
    note?: string | null
    noteForBranch?: string | null
    consultId?: number
    doctorId?: number
    doctorId2?: number
    assistantId?: number
    roomId?: number
    room?: string | null
    remindContent?: string | null
    reasonCancelId?: number
    typeId?: number
    typeDetailId?: number
    serviceCareId?: string | null
    serviceCare?: string | null
    state?: number
    createdDate?: Date | string | null
    createdBy?: string | null
    modifiedDate?: Date | string | null
    modifiedBy?: string | null
    extractedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    source_id?: StringFieldUpdateOperationsInput | string
    custId?: NullableStringFieldUpdateOperationsInput | string | null
    custCode?: NullableStringFieldUpdateOperationsInput | string | null
    custName?: NullableStringFieldUpdateOperationsInput | string | null
    dateFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusId?: IntFieldUpdateOperationsInput | number
    statusName?: NullableStringFieldUpdateOperationsInput | string | null
    statusTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCancel?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    noteForBranch?: NullableStringFieldUpdateOperationsInput | string | null
    consultId?: IntFieldUpdateOperationsInput | number
    doctorId?: IntFieldUpdateOperationsInput | number
    doctorId2?: IntFieldUpdateOperationsInput | number
    assistantId?: IntFieldUpdateOperationsInput | number
    roomId?: IntFieldUpdateOperationsInput | number
    room?: NullableStringFieldUpdateOperationsInput | string | null
    remindContent?: NullableStringFieldUpdateOperationsInput | string | null
    reasonCancelId?: IntFieldUpdateOperationsInput | number
    typeId?: IntFieldUpdateOperationsInput | number
    typeDetailId?: IntFieldUpdateOperationsInput | number
    serviceCareId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceCare?: NullableStringFieldUpdateOperationsInput | string | null
    state?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    modifiedBy?: NullableStringFieldUpdateOperationsInput | string | null
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_id?: StringFieldUpdateOperationsInput | string
    custId?: NullableStringFieldUpdateOperationsInput | string | null
    custCode?: NullableStringFieldUpdateOperationsInput | string | null
    custName?: NullableStringFieldUpdateOperationsInput | string | null
    dateFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusId?: IntFieldUpdateOperationsInput | number
    statusName?: NullableStringFieldUpdateOperationsInput | string | null
    statusTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isCancel?: IntFieldUpdateOperationsInput | number
    branchId?: IntFieldUpdateOperationsInput | number
    branchName?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    noteForBranch?: NullableStringFieldUpdateOperationsInput | string | null
    consultId?: IntFieldUpdateOperationsInput | number
    doctorId?: IntFieldUpdateOperationsInput | number
    doctorId2?: IntFieldUpdateOperationsInput | number
    assistantId?: IntFieldUpdateOperationsInput | number
    roomId?: IntFieldUpdateOperationsInput | number
    room?: NullableStringFieldUpdateOperationsInput | string | null
    remindContent?: NullableStringFieldUpdateOperationsInput | string | null
    reasonCancelId?: IntFieldUpdateOperationsInput | number
    typeId?: IntFieldUpdateOperationsInput | number
    typeDetailId?: IntFieldUpdateOperationsInput | number
    serviceCareId?: NullableStringFieldUpdateOperationsInput | string | null
    serviceCare?: NullableStringFieldUpdateOperationsInput | string | null
    state?: IntFieldUpdateOperationsInput | number
    createdDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    modifiedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type RevenueCountOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    code?: SortOrder
    branchId?: SortOrder
    custCode?: SortOrder
    custName?: SortOrder
    custPhone?: SortOrder
    custAddress?: SortOrder
    custBirthday?: SortOrder
    depositId?: SortOrder
    paidAmount?: SortOrder
    discountAmount?: SortOrder
    depositAmountUsing?: SortOrder
    totalPaid?: SortOrder
    debtAmount?: SortOrder
    methodName?: SortOrder
    content?: SortOrder
    serviceId?: SortOrder
    isProduct?: SortOrder
    quantity?: SortOrder
    priceRoot?: SortOrder
    priceUnit?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    timeToTreatment?: SortOrder
    percentOfService?: SortOrder
    treatIndex?: SortOrder
    type?: SortOrder
    typeName?: SortOrder
    consultId1?: SortOrder
    consultId2?: SortOrder
    consultId3?: SortOrder
    consultId4?: SortOrder
    techId?: SortOrder
    tele1?: SortOrder
    tele2?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    state?: SortOrder
    extractedAt?: SortOrder
  }

  export type RevenueAvgOrderByAggregateInput = {
    id?: SortOrder
    branchId?: SortOrder
    depositId?: SortOrder
    paidAmount?: SortOrder
    discountAmount?: SortOrder
    depositAmountUsing?: SortOrder
    totalPaid?: SortOrder
    debtAmount?: SortOrder
    serviceId?: SortOrder
    isProduct?: SortOrder
    quantity?: SortOrder
    priceRoot?: SortOrder
    priceUnit?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    timeToTreatment?: SortOrder
    percentOfService?: SortOrder
    treatIndex?: SortOrder
    consultId1?: SortOrder
    consultId2?: SortOrder
    consultId3?: SortOrder
    consultId4?: SortOrder
    techId?: SortOrder
    tele1?: SortOrder
    tele2?: SortOrder
    state?: SortOrder
  }

  export type RevenueMaxOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    code?: SortOrder
    branchId?: SortOrder
    custCode?: SortOrder
    custName?: SortOrder
    custPhone?: SortOrder
    custAddress?: SortOrder
    custBirthday?: SortOrder
    depositId?: SortOrder
    paidAmount?: SortOrder
    discountAmount?: SortOrder
    depositAmountUsing?: SortOrder
    totalPaid?: SortOrder
    debtAmount?: SortOrder
    methodName?: SortOrder
    content?: SortOrder
    serviceId?: SortOrder
    isProduct?: SortOrder
    quantity?: SortOrder
    priceRoot?: SortOrder
    priceUnit?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    timeToTreatment?: SortOrder
    percentOfService?: SortOrder
    treatIndex?: SortOrder
    type?: SortOrder
    typeName?: SortOrder
    consultId1?: SortOrder
    consultId2?: SortOrder
    consultId3?: SortOrder
    consultId4?: SortOrder
    techId?: SortOrder
    tele1?: SortOrder
    tele2?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    state?: SortOrder
    extractedAt?: SortOrder
  }

  export type RevenueMinOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    code?: SortOrder
    branchId?: SortOrder
    custCode?: SortOrder
    custName?: SortOrder
    custPhone?: SortOrder
    custAddress?: SortOrder
    custBirthday?: SortOrder
    depositId?: SortOrder
    paidAmount?: SortOrder
    discountAmount?: SortOrder
    depositAmountUsing?: SortOrder
    totalPaid?: SortOrder
    debtAmount?: SortOrder
    methodName?: SortOrder
    content?: SortOrder
    serviceId?: SortOrder
    isProduct?: SortOrder
    quantity?: SortOrder
    priceRoot?: SortOrder
    priceUnit?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    timeToTreatment?: SortOrder
    percentOfService?: SortOrder
    treatIndex?: SortOrder
    type?: SortOrder
    typeName?: SortOrder
    consultId1?: SortOrder
    consultId2?: SortOrder
    consultId3?: SortOrder
    consultId4?: SortOrder
    techId?: SortOrder
    tele1?: SortOrder
    tele2?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    state?: SortOrder
    extractedAt?: SortOrder
  }

  export type RevenueSumOrderByAggregateInput = {
    id?: SortOrder
    branchId?: SortOrder
    depositId?: SortOrder
    paidAmount?: SortOrder
    discountAmount?: SortOrder
    depositAmountUsing?: SortOrder
    totalPaid?: SortOrder
    debtAmount?: SortOrder
    serviceId?: SortOrder
    isProduct?: SortOrder
    quantity?: SortOrder
    priceRoot?: SortOrder
    priceUnit?: SortOrder
    price?: SortOrder
    amount?: SortOrder
    timeToTreatment?: SortOrder
    percentOfService?: SortOrder
    treatIndex?: SortOrder
    consultId1?: SortOrder
    consultId2?: SortOrder
    consultId3?: SortOrder
    consultId4?: SortOrder
    techId?: SortOrder
    tele1?: SortOrder
    tele2?: SortOrder
    state?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type TreatmentCodeServiceCodeCreatedDateCompoundUniqueInput = {
    code: string
    serviceCode: string
    createdDate: Date | string
  }

  export type TreatmentCountOrderByAggregateInput = {
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
    serviceId?: SortOrder
    serviceTypeId?: SortOrder
    serviceCode?: SortOrder
    tabId?: SortOrder
    tabCode?: SortOrder
    comboId?: SortOrder
    comboCode?: SortOrder
    serviceName?: SortOrder
    timeIndex?: SortOrder
    timeToTreatment?: SortOrder
    teethChoosing?: SortOrder
    priceUnit?: SortOrder
    quantity?: SortOrder
    discount?: SortOrder
    priceRoot?: SortOrder
    priceDiscounted?: SortOrder
    doctor?: SortOrder
    doctor2?: SortOrder
    doctor3?: SortOrder
    doctor4?: SortOrder
    assistant?: SortOrder
    assistant2?: SortOrder
    assistant3?: SortOrder
    assistant4?: SortOrder
    technician?: SortOrder
    technician2?: SortOrder
    timeTreatIndex?: SortOrder
    percent?: SortOrder
    percentNew?: SortOrder
    percentStage?: SortOrder
    percentNewStage?: SortOrder
    note?: SortOrder
    content?: SortOrder
    contentNext?: SortOrder
    symptoms?: SortOrder
    treatDateNext?: SortOrder
    branchId?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrder
    state?: SortOrder
    extractedAt?: SortOrder
  }

  export type TreatmentAvgOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    serviceTypeId?: SortOrder
    tabId?: SortOrder
    comboId?: SortOrder
    timeToTreatment?: SortOrder
    priceUnit?: SortOrder
    quantity?: SortOrder
    discount?: SortOrder
    priceRoot?: SortOrder
    priceDiscounted?: SortOrder
    doctor?: SortOrder
    doctor2?: SortOrder
    doctor3?: SortOrder
    doctor4?: SortOrder
    assistant?: SortOrder
    assistant2?: SortOrder
    assistant3?: SortOrder
    assistant4?: SortOrder
    technician?: SortOrder
    technician2?: SortOrder
    timeTreatIndex?: SortOrder
    percent?: SortOrder
    percentNew?: SortOrder
    percentStage?: SortOrder
    percentNewStage?: SortOrder
    branchId?: SortOrder
    modifiedBy?: SortOrder
    state?: SortOrder
  }

  export type TreatmentMaxOrderByAggregateInput = {
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
    serviceId?: SortOrder
    serviceTypeId?: SortOrder
    serviceCode?: SortOrder
    tabId?: SortOrder
    tabCode?: SortOrder
    comboId?: SortOrder
    comboCode?: SortOrder
    serviceName?: SortOrder
    timeIndex?: SortOrder
    timeToTreatment?: SortOrder
    teethChoosing?: SortOrder
    priceUnit?: SortOrder
    quantity?: SortOrder
    discount?: SortOrder
    priceRoot?: SortOrder
    priceDiscounted?: SortOrder
    doctor?: SortOrder
    doctor2?: SortOrder
    doctor3?: SortOrder
    doctor4?: SortOrder
    assistant?: SortOrder
    assistant2?: SortOrder
    assistant3?: SortOrder
    assistant4?: SortOrder
    technician?: SortOrder
    technician2?: SortOrder
    timeTreatIndex?: SortOrder
    percent?: SortOrder
    percentNew?: SortOrder
    percentStage?: SortOrder
    percentNewStage?: SortOrder
    note?: SortOrder
    content?: SortOrder
    contentNext?: SortOrder
    symptoms?: SortOrder
    treatDateNext?: SortOrder
    branchId?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrder
    state?: SortOrder
    extractedAt?: SortOrder
  }

  export type TreatmentMinOrderByAggregateInput = {
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
    serviceId?: SortOrder
    serviceTypeId?: SortOrder
    serviceCode?: SortOrder
    tabId?: SortOrder
    tabCode?: SortOrder
    comboId?: SortOrder
    comboCode?: SortOrder
    serviceName?: SortOrder
    timeIndex?: SortOrder
    timeToTreatment?: SortOrder
    teethChoosing?: SortOrder
    priceUnit?: SortOrder
    quantity?: SortOrder
    discount?: SortOrder
    priceRoot?: SortOrder
    priceDiscounted?: SortOrder
    doctor?: SortOrder
    doctor2?: SortOrder
    doctor3?: SortOrder
    doctor4?: SortOrder
    assistant?: SortOrder
    assistant2?: SortOrder
    assistant3?: SortOrder
    assistant4?: SortOrder
    technician?: SortOrder
    technician2?: SortOrder
    timeTreatIndex?: SortOrder
    percent?: SortOrder
    percentNew?: SortOrder
    percentStage?: SortOrder
    percentNewStage?: SortOrder
    note?: SortOrder
    content?: SortOrder
    contentNext?: SortOrder
    symptoms?: SortOrder
    treatDateNext?: SortOrder
    branchId?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrder
    state?: SortOrder
    extractedAt?: SortOrder
  }

  export type TreatmentSumOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    serviceTypeId?: SortOrder
    tabId?: SortOrder
    comboId?: SortOrder
    timeToTreatment?: SortOrder
    priceUnit?: SortOrder
    quantity?: SortOrder
    discount?: SortOrder
    priceRoot?: SortOrder
    priceDiscounted?: SortOrder
    doctor?: SortOrder
    doctor2?: SortOrder
    doctor3?: SortOrder
    doctor4?: SortOrder
    assistant?: SortOrder
    assistant2?: SortOrder
    assistant3?: SortOrder
    assistant4?: SortOrder
    technician?: SortOrder
    technician2?: SortOrder
    timeTreatIndex?: SortOrder
    percent?: SortOrder
    percentNew?: SortOrder
    percentStage?: SortOrder
    percentNewStage?: SortOrder
    branchId?: SortOrder
    modifiedBy?: SortOrder
    state?: SortOrder
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    custId?: SortOrder
    custCode?: SortOrder
    custName?: SortOrder
    dateFrom?: SortOrder
    statusId?: SortOrder
    statusName?: SortOrder
    statusTime?: SortOrder
    isCancel?: SortOrder
    branchId?: SortOrder
    branchName?: SortOrder
    content?: SortOrder
    note?: SortOrder
    noteForBranch?: SortOrder
    consultId?: SortOrder
    doctorId?: SortOrder
    doctorId2?: SortOrder
    assistantId?: SortOrder
    roomId?: SortOrder
    room?: SortOrder
    remindContent?: SortOrder
    reasonCancelId?: SortOrder
    typeId?: SortOrder
    typeDetailId?: SortOrder
    serviceCareId?: SortOrder
    serviceCare?: SortOrder
    state?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrder
    extractedAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    id?: SortOrder
    statusId?: SortOrder
    isCancel?: SortOrder
    branchId?: SortOrder
    consultId?: SortOrder
    doctorId?: SortOrder
    doctorId2?: SortOrder
    assistantId?: SortOrder
    roomId?: SortOrder
    reasonCancelId?: SortOrder
    typeId?: SortOrder
    typeDetailId?: SortOrder
    state?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    custId?: SortOrder
    custCode?: SortOrder
    custName?: SortOrder
    dateFrom?: SortOrder
    statusId?: SortOrder
    statusName?: SortOrder
    statusTime?: SortOrder
    isCancel?: SortOrder
    branchId?: SortOrder
    branchName?: SortOrder
    content?: SortOrder
    note?: SortOrder
    noteForBranch?: SortOrder
    consultId?: SortOrder
    doctorId?: SortOrder
    doctorId2?: SortOrder
    assistantId?: SortOrder
    roomId?: SortOrder
    room?: SortOrder
    remindContent?: SortOrder
    reasonCancelId?: SortOrder
    typeId?: SortOrder
    typeDetailId?: SortOrder
    serviceCareId?: SortOrder
    serviceCare?: SortOrder
    state?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrder
    extractedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    source_id?: SortOrder
    custId?: SortOrder
    custCode?: SortOrder
    custName?: SortOrder
    dateFrom?: SortOrder
    statusId?: SortOrder
    statusName?: SortOrder
    statusTime?: SortOrder
    isCancel?: SortOrder
    branchId?: SortOrder
    branchName?: SortOrder
    content?: SortOrder
    note?: SortOrder
    noteForBranch?: SortOrder
    consultId?: SortOrder
    doctorId?: SortOrder
    doctorId2?: SortOrder
    assistantId?: SortOrder
    roomId?: SortOrder
    room?: SortOrder
    remindContent?: SortOrder
    reasonCancelId?: SortOrder
    typeId?: SortOrder
    typeDetailId?: SortOrder
    serviceCareId?: SortOrder
    serviceCare?: SortOrder
    state?: SortOrder
    createdDate?: SortOrder
    createdBy?: SortOrder
    modifiedDate?: SortOrder
    modifiedBy?: SortOrder
    extractedAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    id?: SortOrder
    statusId?: SortOrder
    isCancel?: SortOrder
    branchId?: SortOrder
    consultId?: SortOrder
    doctorId?: SortOrder
    doctorId2?: SortOrder
    assistantId?: SortOrder
    roomId?: SortOrder
    reasonCancelId?: SortOrder
    typeId?: SortOrder
    typeDetailId?: SortOrder
    state?: SortOrder
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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