import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

export default app;
