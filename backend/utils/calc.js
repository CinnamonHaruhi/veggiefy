import pool from "../config/db.js";

export const getOrderTotalAmount = async (orderId) => {
    try {
        const totalAmount = await pool.query(`SELECT SUM(price * order_items.quantity) FROM orders
                INNER JOIN order_items ON orders.order_id = order_items.order_id
                INNER JOIN products ON order_items.product_id = products.product_id
                WHERE orders.order_id = $1`, 
            [orderId]);

        return totalAmount.rows[0].sum;
    } catch (err) {
       console.log(err);
    }
}

export const updateQuantities = async (orderId) => {
    try {
        const quantitiesLeft = await getQuantities(orderId);
        pool.query(
            `UPDATE products
            SET quantity = data.quantity_left
            FROM (
                SELECT product_id, quantity_left
                FROM jsonb_to_recordset($1::jsonb)
                AS t (product_id int, quantity_left int)
            ) AS data(product_id, quantity_left)
            WHERE products.product_id = data.product_id;`,
            [quantitiesLeft]
        );
    } catch (err) {
        console.log(err);
    }
}

export const getQuantities = async (orderId) => {
    const quantitiesLeft = await pool.query(
        `SELECT products.product_id, (products.quantity - order_items.quantity) AS quantity_left
        FROM products INNER JOIN order_items ON products.product_id = order_items.product_id
        WHERE order_id = $1`,
    [orderId]);

    return JSON.stringify(quantitiesLeft.rows);
}