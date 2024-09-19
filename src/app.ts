import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

export const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
const corsConfig = {
  origin: [
    'https://test.admin.prostrikers.com',
    'https://test.prostrikers.com',
    'https://prostrikers-web.netlify.app',
    'https://prostrikers-admin.netlify.app',
    'http://localhost:4000',
    'http://localhost:4001',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
};
app.options('*', cors(corsConfig));
app.use(cors(corsConfig));
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
