import express, { type Application } from 'express';
import cors from 'cors';
import { router } from './routes/todoRoutes';
import { env } from './config/env';

const app: Application = express();
const STATUS_OK = 200 as const;

console.log(`[env] NODE_ENV = ${env.NODE_ENV}`);

app.use(
  cors({
    origin: env.FRONTEND_URL,
    optionsSuccessStatus: STATUS_OK,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

try {
  app.listen(env.PORT, () => {
    console.log(`server running at://localhost:${env.PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
