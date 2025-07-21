import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import { sendFeedbackEmail } from './app/utils/email';
import sendResponse from './app/utils/sendResponse';
import httpStatus from 'http-status';
import { limiter } from './app/utils/limiter';
import { StripePaymentRoutes } from './app/modules/StripePayment/stripePayment.route';
import { StripePaymentControllers } from './app/modules/StripePayment/stripePayment.controllers';

export const app: Application = express();

// app.use(
//   cors({
//     origin: ['https://prostrikers.com', 'https://admin.prostrikers.com'],
//     credentials: true,
//     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   }),
// );
// app.options('*', cors());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);
app.post(
  '/api/v1/stripe-payment/webhook',
  express.raw({ type: 'application/json' }),
  StripePaymentControllers.stripeWebhook,
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router);
app.post('/feedback', limiter, async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    await sendFeedbackEmail(payload);
    sendResponse(res, httpStatus.OK, 'Feedback email sent');
  } catch (err: any) {
    console.log(err?.message);
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to send feedback email',
    );
  }
});
app.get('/', (req: Request, res: Response) => {
  try {
    res.send('server is running');
  } catch (err) {
    console.log(err);
  }
});
app.use(globalErrorHandler);
app.use(notFound);
