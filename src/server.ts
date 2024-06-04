import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import config from './app/config';

const port = config.port;

let server: Server;

async function dbConnection() {
  const url =
    config.node_env === 'production'
      ? config.database_url
      : config.database_local_url;
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(port, () => {
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
  }
});

process.on('unhandledRejection', () => {
  console.log('unhandledRejection detected, server closed');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
