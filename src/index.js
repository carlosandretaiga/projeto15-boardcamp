import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

import crudRouter from './routes/crudRouter.js';

const app = express();
app.use(cors(), express.json());
dotenv.config();

//routes 
app.use(crudRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(chalk.bold.green(`Server running on port ${PORT}`))
});


