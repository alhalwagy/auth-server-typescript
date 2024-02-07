import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import cookieSession from 'cookie-session';


const app = express();


app.use(express.json());
app.use(cookieSession({keys:['dsggs']}))
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.listen(8080, () => {
  console.log('App running on port 8080');
});
