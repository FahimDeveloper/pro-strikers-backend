import mongoose from 'mongoose';
import { app } from './app';
import config from './app/config';
import { Server } from 'http';

const port = process.env.PORT || config.port;

let server: Server;

async function dbConnection() {
  const url = config.database_url;
  try {
    await mongoose.connect(url as string);
    server = app.listen(port, () => {
      console.log(`app server listening on ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
dbConnection();

process.on('uncaughtException', () => {
  console.log('uncaughtException detected, server closed');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('unhandledRejection', () => {
  console.log('unhandledRejection detected, server closed');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
