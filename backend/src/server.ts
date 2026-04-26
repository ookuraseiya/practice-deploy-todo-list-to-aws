import express, { type Application } from 'express';
import cors from 'cors';
import { router } from './routes/todoRoutes';

const app: Application = express();
const PORT = 3001 as const;

console.log(
  `[env] NODE_ENV = ${process.env.NODE_ENV ?? 'undefined'}`,
  `[env] FRONTEND_URL = ${process.env.FRONTEND_URL ?? 'undefined'}`,
);

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL || 'http://localhost:3000'}`,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', router);

try {
  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
