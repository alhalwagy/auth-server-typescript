import { NextFunction, Request, Response } from 'express';
import { get, controller, bodyValidator, post, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    res.status(403).send('Not Permitted.');
  }
}

@controller('')
export class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.status(201).send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
    } else {
      res.status(401).send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Login</a>
      </div>
    `);
    }
  }
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.status(201).send('Welcome to protected route, logged in user');
  }
}

