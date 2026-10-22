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
       next(err);
    }
}