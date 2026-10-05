import type { Context } from '@deepseek-ai/cordis'

export interface RemoteMethodOptions {
  readonly mode: 'stream'
}

export type RemoteMethodDecorator = <This extends object, Args extends unknown[], Result>(
  method: (this: This, ...args: Args) => Result,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Result>,
) => void

export declare abstract class TypertRemoteService<T = never> {
  protected ctx: Context
  readonly typertRemote: object
  protected constructor(ctx: Context, serviceKey: string, options?: object)
}

export declare function Remote<This extends object, Args extends unknown[], Result>(
  method: (this: This, ...args: Args) => Result,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Result>,
): void
export declare function Remote(option: string | RemoteMethodOptions): RemoteMethodDecorator
