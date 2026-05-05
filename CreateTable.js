import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";

async function createTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS cart_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          product_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (product_id) REFERENCES products(id)
    );
`);

  await db.close();
  console.log("table created");
}

createTable();
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

/*const db = await open({
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
  }*/
