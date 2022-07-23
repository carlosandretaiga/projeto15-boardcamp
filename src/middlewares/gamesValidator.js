import joi from 'joi';
import db from '../database/db.js';

export async function validateGame(req, res, next) {
  const newGame = req.body;

  const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().pattern(/(https?:\/\/.*\.(?:png|jpg))/i).trim().required(),
    stockTotal: joi.number().positive().integer().min(1).required(),
    categoryId: joi.number().positive().integer().required(),
    pricePerDay: joi.number().positive().min(0.1).required()
  })

  const { error } = gameSchema.validate(newGame);

  if(error) {
    console.log(error);
    return res.sendStatus(400);
  }

  const resultCategory = await db.query(`SELECT * FROM categories WHERE id = $1`, [req.body.categoryId]);
  const existsCategory = resultCategory.rows[0];
  console.log(existsCategory);

  if(!existsCategory) {
    return res.sendStatus(409);
  }

  const resultGame = await db.query(`SELECT * FROM games WHERE name = $1`, [req.body.name]);
  const existsGame = resultGame.rows[0];
  console.log(existsGame);

  if(existsGame) {
    return res.sendStatus(409);
  }





  next(); 
}