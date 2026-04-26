import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { vinyl } from "./data/data.js";

async function CreateTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });
  try {
    // Fix 1: Ensure the products table exists before inserting data
    // This prevents errors if the table hasn't been created yet
    await db.exec(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      artist TEXT,
      price REAL,
      image TEXT,
      year INTEGER,
      genre TEXT,
      stock INTEGER
    )`);

    await db.exec("BEGIN TRANSACTION");
    for (const { title, artist, price, image, year, genre, stock } of vinyl) {
      await db.run(
        `INSERT INTO products (title,artist,price,image,year,genre,stock)
        VALUES(?,?,?,?,?,?,?)`,
        [title, artist, price, image, year, genre, stock],
      );
    }
    await db.exec("COMMIT");
    console.log("Done inserting data");
  } catch (error) {
    // Fix 2: Await the rollback to ensure it completes before handling the error
    await db.exec("ROLLBACK");
    console.error("Error inserting data:", error);
  } finally {
    await db.close();
  }
}

CreateTable();
/*
for(const {location,data}of databseobject){
await db.run(
"INSERT INTO NAMEofDATAsQL(location,data)
VALUES(?,?)placeHolders
[location,data]
"
)
}


GETTING DATA

    const query = 'SELECT * FROM TableName WHERE filter = ?'
    const params = [filterValue]

    const abductions = await db.all(query, params)

*/
