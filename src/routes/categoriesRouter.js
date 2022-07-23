import { Router } from 'express';

import { getAllCategories, addCategory } from '../controllers/categoriesController.js';
import { validateCategory } from '../middlewares/categoriesValidator.js';

const categoriesRouter = Router();

//CRUD Categories
categoriesRouter.get('/categories', getAllCategories); 
categoriesRouter.post('/categories', validateCategory, addCategory); 

//CRUD Games 

//CRUD Customers 

//CRUD Rents

export default categoriesRouter;