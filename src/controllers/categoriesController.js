import db from '../database/db.js';

export async function getAllCategories(req, res) {
  try {
    const categories = await db.query("SELECT * FROM categories");
    //console.log("Categorieas do banco", category.rows);
    res.send(categories.rows);
    //res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error getting the categories!")
  }

}

export async function addCategory(req, res) {
  const newCategory = req.body;
  console.log(newCategory)
  try {
    const result = await db.query(`
      INSERT INTO categories (name)
      VALUES ('${req.body.name}')
    `);
    res.sendStatus(201); 

  } catch (error) {
    res.status(500).send("There was an error registering a category!");
  }
}