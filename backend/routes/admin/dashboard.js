import express from 'express';
import pool from '../../config/db.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
    const totalOrders = await pool.query("SELECT COUNT(*) FROM orders");

    const pendingStatusId = 1;
    const pendingOrders = await pool.query("SELECT COUNT(*) FROM orders WHERE status_id = $1", 
      [pendingStatusId]);

    const completedStatusId = 4;
    const completedOrders = await pool.query("SELECT COUNT(*) FROM orders WHERE status_id = $1", 
        [completedStatusId]);

    const memberRoleId = 2;
    const customers = await pool.query("SELECT COUNT(*) FROM users WHERE role_id = $1", 
        [memberRoleId]);

    return res.status(200).json({
        total_orders: totalOrders.rows[0].count,
        pending_orders: pendingOrders.rows[0].count,
        ready_for_pickup: completedOrders.rows[0].count,
        total_customers: customers.rows[0].count
    });
});

router.get("/recent-orders", async (req, res) => {
    const recentOrders = await pool.query(`
        SELECT order_no, order_date, total_amount, username, status_name
        FROM orders INNER JOIN users ON orders.user_id = users.user_id
        INNER JOIN statuses ON orders.status_id = statuses.status_id
        ORDER BY order_date DESC LIMIT 5;`);
    return res.status(200).json(recentOrders.rows);
});

export default router