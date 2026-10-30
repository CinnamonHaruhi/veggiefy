import express from 'express';
import pool from '../../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const orders = await pool.query(`
        SELECT order_id, order_no, order_date, total_amount, status_name, username
        FROM orders INNER JOIN statuses ON orders.status_id = statuses.status_id
        INNER JOIN users ON orders.user_id = users.user_id;`);
    return res.status(200).json(orders.rows);
});

router.get('/items', async (req, res) => {
    const items = await pool.query(`
        SELECT order_item_id, order_id, product_name, order_items.quantity
        FROM order_items INNER JOIN products ON order_items.product_id = products.product_id;`);
    return res.status(200).json(items.rows);  
});

router.get('/:id/items', async (req, res) => {
    const orderId = req.params.id;
    const items = await pool.query(`
        SELECT order_item_id, order_id, product_name, order_items.quantity
        FROM order_items INNER JOIN products ON order_items.product_id = products.product_id
        WHERE order_id = $1;
    `, [orderId]);
    return res.status(200).json(items.rows);  
})

router.put('/:id/prepare', (req, res) => {
    const orderId = req.params.id;
    const preparingStatusId = 2;

    pool.query("UPDATE orders SET status_id = $1 WHERE order_id = $2", 
        [preparingStatusId, orderId]);
    return res.status(200).json({ message: "Status set to preparing" });
});

export default router;