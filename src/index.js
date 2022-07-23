import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

import categoriesRouter from './routes/categoriesRouter.js';
import gamesRouter from './routes/gamesRouter.js';

const app = express();
app.use(cors(), express.json());
dotenv.config();

//Categories routes 
app.use(categoriesRouter);

//Games routes 
app.use(gamesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(chalk.bold.green(`Server running on port ${PORT}`))
});


