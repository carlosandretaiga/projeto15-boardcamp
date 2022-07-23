import joi from 'joi';
import db from '../database/db.js';

export async function validateCategory(req, res, next) {
  const newCategory = req.body;

  const categorySchema = joi.object({
    name: joi.string().required()
  })

  const { error } = categorySchema.validate(newCategory);

  if(error) {
    return res.sendStatus(400);
  }

  const result = await db.query(`SELECT * FROM categories WHERE name =$1`, [req.body.name]);
  const existsCategory = result.rows[0];
  console.log(existsCategory);

  if(existsCategory) {
    return res.sendStatus(409);
  }

  next(); 
}