require('dotenv').config();
import mongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import PassportGoogleStrategy from './config/googleStrategy';
import { AppError } from './helpers/errors/app_error';
import { errorHandler } from './helpers/errors/error_handler';
import authRoute from './routes/auth.route';
import userRoute from './routes/user.routes';

const main = async () => {
  const app = express();

  // Check DB connection
  const mongooseClient = mongoose
    .connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then((m) => {
      console.log('DB: MongoDB connected');
      return m.connection.getClient();
    });

  app.use(
    cors({
      origin: ['*', `http://localhost:${process.env.APP_PORT}`],
      credentials: true,
    })
  );

  // parse application/json
  app.use(express.json());
  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser([process.env['COOKIE_KEY'] as string]));

  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      cookie: {
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
      },
      secret: [process.env['COOKIE_KEY'] as string],
      store: mongoStore.create({
        clientPromise: mongooseClient,
        stringify: false,
        autoRemove: 'interval',
        autoRemoveInterval: 1,
      }),
    })
  );

  PassportGoogleStrategy();

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (_, res) => {
    res.json({
      message: 'Hi',
    });
  });

  // * Routes *
  // Reroute to login url
  app.get('/login', function (_, res) {
    res.redirect(`http://localhost:${process.env.APP_PORT}/login`);
  });

  app.use('/auth', authRoute);
  app.use('/user', userRoute);

  // Catch All Unhandled routes
  app.all('*', (req, _, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use(errorHandler);

  app.listen(process.env.API_PORT, () => {
    console.log(
      `TABRN Server started at http://localhost:${process.env.API_PORT}`
    );
  });
};

main();
