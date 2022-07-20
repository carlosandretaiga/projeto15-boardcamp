import db from '../database/db.js';

export async function getAllCategories(req, res) {
  try {
    const category = await db.query("SELECT * FROM categories");
    res.send(category.rows);
    
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error getting the categories!")
  }

}