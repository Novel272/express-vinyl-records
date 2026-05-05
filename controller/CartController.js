import { OPEN_READWRITE } from "sqlite3";
import { getDBConnection } from "../db/db";

export async function AddToCart(req, res) {
  let { ProductId } = parseInt(req.body.productId, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const db = await getDBConnection();
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "Please log in first" });
    }

    const existingCartItem = await db.get(
      `SELECT * FROM cart_items WHERE user_id=? AND product_id=?`,
      [userId, ProductId],
    );

    if (existingCartItem) {
      await db.run(`UPDATE cart_items SET quantity=quantity+1 WHERE id=?`, [
        existingCartItem.id,
      ]);
    } else {
      await db.run(
        `INSERT INTO cart_items (user_id,product_id,quantity) VALUES (?,?,1)`,
        [userId, ProductId],
      );
    }
    await db.close();
    return res.status(200).json({ message: "Added to cart" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function GetCartCount(req, res) {
  const userId = req.session.userId;
  try {
    const db = await getDBConnection();
    if (!userId) {
      return res.status(401).json({ error: "Please log in first" });
    }
    const CartCount = await db.get(
      `SELECT SUM(quantity) as count FROM cart_items WHERE user_id=?`,
      [userId],
    );
    await db.close();
    return res.status(200).json({ count: CartCount.count || 0 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
  /*
Challenge:

1. Write code to ensure that when a logged-in user clicks 'Add to Cart', 
their current cart count is shown in the header with a cart icon.
 The frontend has been done for you. All the backend need do is provide the following JSON on the /api/cart/cart-count endpoint: 
{ <THE TOTAL NUMBER OF THE USER'S ITEMS> || 0 }

Ignore frontend console errors for now!
 
For testing, log in with:
Username: test
Password: test

Loads of help in hint.md
*/
}
