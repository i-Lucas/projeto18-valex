import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import errorHandler from './middlewares/errors.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const port = + process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));