import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

export const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:4001', 'https://admin.prostrikers.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);

app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  try {
    res.send('server is running');
  } catch (err) {
    console.log(err);
  }
});
app.use(globalErrorHandler);
app.use(notFound);
