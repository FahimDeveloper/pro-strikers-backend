import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parser
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://prostrikers-admin.netlify.app'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
