import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import appRouter from './routes/appRouter.js';
import errorHandler from './middlewares/errorHandleMiddleware.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(appRouter);
app.use(errorHandler);

const port = + process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));