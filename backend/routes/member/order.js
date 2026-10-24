import express from 'express';
import pool from '../../config/db.js';
import { getOrderTotalAmount, updateQuantities } from '../../utils/calc.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const userId = req.user.user_id;
    const orders = await pool.query("SELECT * FROM orders WHERE user_id = $1", 
        [userId]);

    return res.status(200).json(orders.rows);
})

router.get('/:id', async (req, res) => {
    const parsedId = parseInt(req.params.id);

    const order = await pool.query("SELECT * FROM orders WHERE order_id = $1",
        [parsedId]);

    return res.status(200).json(order.rows[0]);
});

router.get('/:id/items', async (req, res) => {
    const parsedId = parseInt(req.params.id);

    const orderItems = await pool.query("SELECT * FROM order_items WHERE order_id = $1",
        [parsedId]);

    return res.status(200).json(orderItems.rows);
});

router.put('/:id', async (req, res) => {
    const parsedId = parseInt(req.params.id);
    const pendingCancellationId = 5;

    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'Bad request. Invalid ID' });;
    }

    pool.query("UPDATE orders SET status_id = $1 WHERE order_id = $2", 
        [pendingCancellationId, parsedId]);
    
    return res.status(200).json({ message: "Cancellation request sent" });
});

router.post('/confirm', async (req, res) => {
    const { order_items } = req.body;
    const user_id = req.user.user_id;

    const orderData = await pool.query("INSERT INTO orders (order_no, total_amount, user_id) VALUES ($1, $2, $3) RETURNING order_id", 
        ["TEMP_ORD_NO", 0, user_id]);
    const orderId = orderData.rows[0].order_id;

    const orderItemsWithOrderId = order_items.map(v => ({...v, order_id: orderId}));
    pool.query(`INSERT INTO order_items (order_id, product_id, quantity) 
        SELECT order_id, product_id, quantity FROM jsonb_to_recordset($1::jsonb)
        AS t (order_id int, product_id int, quantity int)`, 
        [JSON.stringify(orderItemsWithOrderId)]);
        
    const totalAmount = await getOrderTotalAmount(orderId);
    pool.query("UPDATE orders SET total_amount = $1 WHERE order_id = $2",
        [totalAmount, orderId]);

    updateQuantities(orderId);    
    res.status(200).json({ message: 'Order placed successfully'});
});

export default router;