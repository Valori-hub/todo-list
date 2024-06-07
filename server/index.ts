import express, { RequestHandler } from 'express';
import * as UserRoutes from './routes/user';
import session from 'express-session';
import crypto from 'crypto';
import MongoStore from 'connect-mongo';
import cors from 'cors';

var BodyParser = require('body-parser');
const app = express();
const port = 3000;
const secret = crypto.randomBytes(64).toString('hex');
app.use(BodyParser.json());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/Todo',
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 180 * 60 * 1000,
      httpOnly: true,
      secure: false,
    },
  })
);
app.use('/users', UserRoutes.router as RequestHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
