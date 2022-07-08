import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);

const port = + process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});