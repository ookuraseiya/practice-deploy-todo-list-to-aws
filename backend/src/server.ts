import express, { type Application } from 'express';
import cors from 'cors';
import { router } from './routes/todoRoutes';

const app: Application = express();
const PORT = 3001 as const;

app.use(
  cors({
    origin: `${process.env.PRD_FRONTEND || process.env.DEV_FRONTEND}`,
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
