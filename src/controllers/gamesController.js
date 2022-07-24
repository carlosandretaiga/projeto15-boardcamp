import db from '../database/db.js';

export async function getAllGames(req, res) {

  const filterGame = req.query; 
  let searchGame = '';
  let searchGameInitials = [];
  let searchGameToUse = '';

  if(filterGame.name === undefined) {
    searchGameToUse = '%';
  } else {
    searchGame = filterGame.name.toUpperCase().split("");
    for(let i=0; i < searchGame.length; i++) {
      searchGameInitials.push(searchGame[i] + '%');

    }
    searchGameToUse = searchGameInitials.join(" ");
    
  }

  try {
    const games = await db.query(
      `SELECT games.*, categories.name AS "categoryName" 
       FROM games
       JOIN categories 
       ON games."categoryId" = categories.id
       WHERE games.name LIKE '${searchGameToUse}'
      `
    );
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