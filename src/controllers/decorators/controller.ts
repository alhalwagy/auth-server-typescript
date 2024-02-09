import 'reflect-metadata';
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

import { App } from '../../App';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
  
    if (!req.body) {
      return res.status(422).send('Invalid Request');
    }
    for (let key of keys) {
      if (!req.body[key]) {
        return res.status(422).send('Invalid Request');
      }
    }
    next();
  };
}

export function controller(prefixRoute: string) {
  return function (target: Function) {
    const router = App.getInstance();
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${prefixRoute}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    });
  };
}
