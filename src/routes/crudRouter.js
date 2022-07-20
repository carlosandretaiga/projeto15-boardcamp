import { Router } from 'express';

import { getAllCategories } from '../controllers/crudController.js';

const crudRouter = Router();

//CRUD Categories
crudRouter.get('/categories', getAllCategories); 

//CRUD Games 

//CRUD Customers 

//CRUD Rents

export default crudRouter;