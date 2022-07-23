import pg from "pg"; 
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg; 
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
 /*  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'xxxx',
  database: 'boardcamp' */
});

export default db;