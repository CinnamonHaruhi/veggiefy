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

export default router;