import express, { Request, Response } from 'express';

import cookieSession from 'cookie-session';

import { App } from './App';
import './controllers/LoginController';
import './controllers/RootController';
const app = express();

app.use(express.json());
app.use(cookieSession({ keys: ['dsggs'] }));
app.use(express.urlencoded({ extended: true }));
app.use(App.getInstance());

app.listen(8080, () => {
  console.log('App running on port 8080');
});
