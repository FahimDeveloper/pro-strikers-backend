import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
const corsConfig = {
  origin: 'https://prostrikers-admin.netlify.app',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
};
app.use(express.json());
app.use(cookieParser());
app.options('', cors(corsConfig));
app.use(cors(corsConfig));
// app.use(
//   cors({
//     origin: ['http://localhost:5173', 'https://prostrikers-admin.netlify.app'],
//     credentials: true,
//   }),
// );

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  try {
    res.send('server is running');
  } catch (err) {
    console.log('error getting server');
  }
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
