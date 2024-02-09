import 'reflect-metadata';
import { RequestHandler } from 'express';

import { MetadataKeys } from './MetadataKeys';

export function use(middlware: RequestHandler) {
  return function (target: any, key: string) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middlware],
      target,
      key
    );
  };
}
