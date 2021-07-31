require('dotenv').config();
import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';
import { connect } from 'mongoose';
import passport from 'passport';
import PassportGoogleStrategy from './config/googleStrategy';
import { AppError } from './helpers/errors/app_error';
import { errorHandler } from './helpers/errors/error_handler';
import authRoute from './routes/auth.route';
import userRoute from './routes/user.routes';

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: ['*', `http://localhost:${process.env.APP_PORT}`],
    })
  );
  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));
  // parse application/json
  app.use(express.json());

  app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [process.env['COOKIE_KEY'] as string],
    })
  );

  PassportGoogleStrategy();

  app.use(passport.initialize());
  app.use(passport.session());

  // Check DB connection
  try {
    await connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log('DB: MongoDB connected');
  } catch (error) {
    console.error(
      'DB:MongoDb : ERROR: Unable to connect to the database:',
      error
    );
  }

  app.get('/', (_, res) => {
    res.send('Hi');
  });

  app.get('/login', function (_, res) {
    res.redirect('/auth/google');
  });

  // * Routes *
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
