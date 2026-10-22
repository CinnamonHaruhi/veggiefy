import express from 'express';
import pool from '../../config/db.js';
import { getOrderTotalAmount } from '../../utils/calc.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("ORDERS PAGE");
});

router.post('/confirm', async (req, res) => {
    const { user_id, order_items } = req.body;

    const orderData = await pool.query("INSERT INTO orders (order_no, total_amount, user_id) VALUES ($1, $2, $3) RETURNING order_id", 
        ["ORD03", 0, user_id]);
    const orderId = orderData.rows[0].order_id;

    const orderItemsWithOrderId = order_items.map(v => ({...v, order_id: orderId}));
    pool.query(`INSERT INTO order_items (order_id, product_id, quantity) 
        SELECT order_id, product_id, quantity FROM jsonb_to_recordset($1::jsonb)
        AS t (order_id int, product_id int, quantity int)`, 
        [JSON.stringify(orderItemsWithOrderId)]);

    const totalAmount = await getOrderTotalAmount(orderId);

    pool.query("UPDATE orders SET total_amount = $1 WHERE order_id = $2",
        [totalAmount, orderId]);

    res.status(200).json({ message: 'Order placed successfully'});
});

export default router;