import db from '../database/db.js';

//customers
export async function getAllCustomers(req, res) {

  const filterCustomer = req.query; 
  let searchCustomerCpf = '';


  if(filterCustomer.cpf === undefined) {
    searchCustomerCpf  = '%';
  } else {
    searchCustomerCpf  = filterCustomer.cpf + '%'
    
  }


  try {
    const customers = await db.query(`
    SELECT * FROM customers
    WHERE customers.cpf LIKE '${searchCustomerCpf}'
    `);
    res.send(customers.rows);

  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error getting the customers!")
  }

}

//customers/:id
export async function getCustomer(req, res) {
  try {
    const {customerId} = req.params; 
    console.log(customerId);

    const result = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);
    const customer = result.rows[0];
    //se o cliente com id não existir, deve responder com status 404
    if(!customer) {
      return res.sendStatus(404);
    }

    //console.log(customer);
    res.send(customer);
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error getting the customer with id!")
  }

}

//customers/
export async function addCustomer(req, res) {

  const newCustomer = req.body;
  console.log(newCustomer)
  try {
    const result = await db.query(`
      INSERT INTO customers (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4);
    `, [req.body.name, req.body.phone, req.body.cpf, req.body.birthday]);
    console.log(result);
    res.sendStatus(201); 

  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error registering a customer!");
  }
}

//UPDATE customer
export async function updateCustomer(req, res) {
  const {customerId} = req.params; 

  if(isNaN(parseInt(customerId))) {
    return res.sendStatus(400);
  }

  console.log(customerId)
  try {
    const result = await db.query(`
      UPDATE customers 
      SET 
        name = $1,
        phone = $2,
        cpf= $3,
        birthday = $4
      WHERE id = $5`, [req.body.name, req.body.phone, req.body.cpf, req.body.birthday, customerId]);
    res.sendStatus(200); 

  } catch (error) {
    res.status(500).send("There was an error updating a customer!");
  }
}