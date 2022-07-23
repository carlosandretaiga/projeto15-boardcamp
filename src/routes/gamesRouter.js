import { Router } from 'express';

import { addGame, getAllGames} from '../controllers/gamesController.js';
import { validateGame } from '../middlewares/gamesValidator.js';

const gamesRouter = Router();

//CRUD Games 
gamesRouter.get('/games', getAllGames); 
gamesRouter.post('/games', validateGame, addGame); 

//CRUD Games 

//CRUD Customers 

//CRUD Rents

export default gamesRouter;