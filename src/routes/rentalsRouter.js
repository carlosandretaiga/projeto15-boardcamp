import { Router } from 'express';

import { getAllRentals, addRental, finishedRental, deleteRental} from '../controllers/rentalsController.js';
import { validateRental } from '../middlewares/rentalsValidator.js';
const rentalsRouter = Router();

//CRUD Rentals
rentalsRouter.get('/rentals', getAllRentals); //listar clientes//buscar um cliente por id
rentalsRouter.post('/rentals', validateRental, addRental); 

rentalsRouter.post('/rentals/:rentalId/return', finishedRental); 
rentalsRouter.delete('/rentals/:rentalId', deleteRental); 

export default rentalsRouter;