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
  origin: ['https://prostrikers-admin.netlify.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
};
app.options('', cors(corsConfig));
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

export default app;
