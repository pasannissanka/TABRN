import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: ['*', 'http://localhost:3000'],
    })
  );
  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));
  // parse application/json
  app.use(express.json());

  // Check DB connection
  try {
    await connect('mongodb://localhost:27017/tabrn', {
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
};

main();
