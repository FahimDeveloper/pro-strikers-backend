import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

export default app;
