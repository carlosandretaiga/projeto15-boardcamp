import joi from 'joi';
import db from '../database/db.js';

export async function validateRental(req, res, next) {
  const newRental = req.body;

  const rentalsSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysREnted: joi.number().min(1).required()
  })

  const { error } = rentalsSchema.validate(newRental);

  if(error) {
    return res.sendStatus(400);
  }

  next(); 
}