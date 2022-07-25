import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

import categoriesRouter from './routes/categoriesRouter.js';
import gamesRouter from './routes/gamesRouter.js';
import customersRouter from './routes/customersRouter.js';
import rentalsRouter from './routes/rentalsRouter.js';

const app = express();
app.use(cors(), express.json());
dotenv.config();

//Categories routes 
app.use(categoriesRouter);

//Games routes 
app.use(gamesRouter);

//Customers routes 
app.use(customersRouter);

//Rentals routes 
app.use(rentalsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(chalk.bold.green(`Server running on port ${PORT}`))
});


