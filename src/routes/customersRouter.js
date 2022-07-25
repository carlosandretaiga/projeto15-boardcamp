import { Router } from 'express';

import { getAllCustomers, getCustomer, addCustomer, updateCustomer} from '../controllers/customersController.js';
import { validateUpdateCustomer } from '../middlewares/customerUpdateValidator.js';
const customersRouter = Router();

//CRUD Customers 
customersRouter.get('/customers', getAllCustomers); //listar clientes
customersRouter.get('/customers/:customerId', getCustomer); //buscar um cliente por id
customersRouter.post('/customers', validateUpdateCustomer, addCustomer); 

customersRouter.put('/customers/:customerId', updateCustomer); 

export default customersRouter;