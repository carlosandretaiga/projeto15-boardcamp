import db from '../database/db.js';

export async function getAllGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games");
    //console.log("Categorieas do banco", category.rows);
    res.send(games.rows);

    
    //res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error getting the categories!")
  }

}

export async function addGame(req, res) {
  const newGame = req.body;

  console.log(newGame)
  try {
    const result = await db.query(`
      INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
      VALUES ($1, $2, $3, $4, $5)
    `,[req.body.name, req.body.image, req.body.stockTotal, req.body.categoryId, req.body.pricePerDay]);
    res.sendStatus(201); 

  } catch (error) {
    res.status(500).send("There was an error registering a category!");
  }
}