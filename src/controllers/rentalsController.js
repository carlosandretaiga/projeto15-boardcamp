import db from '../database/db.js';
import dayjs from 'dayjs';
import getToday from '../utils/getToday.js';



//customers
export async function getAllRentals(req, res) {

  const {customerId, gameId} = req.query; 

  let searchRentalId = '';
  const paramsRental = [];
  const conditionsRental = [];

  if(customerId) {
    paramsRental.push(customerId);
    conditionsRental.push(`rentals."customerId" = $${paramsRental.length}`);

  }

  if(gameId) {
    paramsRental.push(gameId);
    conditionsRental.push(`rentals."gameId" = $${paramsRental.length}`);
    
  }

  if(paramsRental.length > 0) {
    searchRentalId += `WHERE ${conditionsRental.join(" AND ")}`;
  }
 

  try {

    const result = await db.query({
  text:`
    SELECT 
      rentals.*,
      customers.name AS customer,
      games.name, 
      categories.*
    FROM rentals 
      JOIN customers ON customers.id = rentals."customerId"
      JOIN games ON games.id = rentals."gameId"
      JOIN categories ON categories.id = games."categoryId"
      ${searchRentalId}`, rowMode: "array"}, paramsRental);

  function returnArrayRental(row) {
    const [
      id, customerId, gameId, rentDate,
      daysRented, returnDate, originalPrice,
      delayFee, customerName, gameName, categoryId, categoryName
    ] = row; 

    return {
      id,
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
      delayFee,
      customer: {
        id: customerId,
        name: customerName
      },
      game: {
        id: gameId,
        name: gameName,
        categoryId,
        categoryName
      }
    }
  }

  res.send(result.rows.map(returnArrayRental));

  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error getting the customers!")
  }

}



//rentals/
export async function addRental(req, res) {

  const { customerId, gameId, daysRented } = req.body;
  let rentDateDay = getToday(); 

  try {

    const customersResult = await db.query(`
    SELECT id FROM customers WHERE id = $1`, [customerId]);
    if(customersResult.rowCount === 0) {
      return res.sendStatus(400);

    }

    const gameResult = await db.query(`
    SELECT * FROM games WHERE id = $1`, [gameId]);
    if(gameResult.rowCount === 0) { 
      return res.sendStatus(400); 
    }

    const game = gameResult.rows[0];

    const result = await db.query(`
      SELECT id 
      FROM rentals
      WHERE "gameId" = $1 AND "returnDate" IS null
    `, [gameId]);

    if(result.rowCount > 0) {
      if(game.stockTotal === result.rowCount) {
        return res.sendStatus(400);
      }
    }

    const originalPrice = daysRented * game.pricePerDay;

    await db.query(`
      INSERT INTO 
      rentals (
        "customerId", "gameId", "rentDate",
        "daysRented", "returnDate", "originalPrice", "delayFee"
      )
      VALUES ($1, $2, NOW(), $3, null, $4, null);
    `,[customerId, gameId, daysRented, originalPrice])
     

    res.sendStatus(201);


  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error registering a rental!");
  }
}

//FINISHED rental
export async function finishedRental(req, res) {
  const {rentalId} = req.params; 

  //console.log(rentalId)
  try {
    const result = await db.query(`
      SELECT * FROM rentals WHERE id = $1`, [rentalId]);

    if(result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const rental = result.rows[0];

    if(rental.returnDate) {
      return res.sendStatus(400);
    } else {
      const rentalDiff = new Date().getTime() - new Date(rental.rentDate).getTime();
      const rentalDiffDays = Math.floor(rentalDiff / (24 * 3600 * 1000));

      let delayFee = 0;

      if(rentalDiffDays > rental.daysRented) {
        const addDay = rentalDiffDays - rental.daysRented;
        delayFee = addDay * rental.originalPrice;
      }
    }

    await db.query(`
    UPDATE rentals 
    SET "returnDate" = NOW(), "delayFee" = $1
    WHERE id = $2
    `, [delayFee, rentalId]);

    res.sendStatus(200); 

  } catch (error) {
    res.status(500).send("There was an error updating a customer!");
  }
}

//DELETE rental
export async function deleteRental(req, res) {
  const {rentalId} = req.params; 

  //console.log(rentalId)
  try {
    const result = await db.query(`
      DELETE FROM rentals WHERE id = $1`, [rentalId]);

    if(result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(200); 

  } catch (error) {
    res.status(500).send("There was an error delete a rental!");
  }
}