import joi from 'joi';
//import Joi from '@joi/date';
import db from '../database/db.js';
// This is where the problem is happening// extend Joi with Joi Date


export async function validateUpdateCustomer(req, res, next) {
  const updatecustomer = req.body;

  const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).trim().required(),
    cpf: joi.string().pattern(new RegExp('^[0-9]{11}$')).required(),
    birthday: joi.string().isoDate().required()
  })

  const { error } = customerSchema.validate(updatecustomer);

  if(error) {
    console.log(error);
    return res.sendStatus(400);
  }

  const resultCustomer = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [req.body.cpf]);
  const existsCustomerCpf = resultCustomer.rows[0];
  console.log(existsCustomerCpf);

  if(existsCustomerCpf) {
    return res.sendStatus(409);
  }

  next(); 
}