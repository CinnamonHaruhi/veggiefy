import express from 'express';
import pool from '../../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const status = req.query["status[]"];

    //This basically checks if there is more than one status
    if (Array.isArray(status)) {
        const orders = await pool.query(`
            SELECT order_id, order_no, order_date, total_amount, status_name, username
            FROM orders INNER JOIN statuses ON orders.status_id = statuses.status_id
            INNER JOIN users ON orders.user_id = users.user_id
            WHERE LOWER(status_name) = ANY($1);`,
        [status]);
        return res.status(200).json(orders.rows);
    }

    if (!status) {
        const orders = await pool.query(`
            SELECT order_id, order_no, order_date, total_amount, status_name, username
            FROM orders INNER JOIN statuses ON orders.status_id = statuses.status_id
            INNER JOIN users ON orders.user_id = users.user_id;`);
        return res.status(200).json(orders.rows);
    }
    
    const orders = await pool.query(`
            SELECT order_id, order_no, order_date, total_amount, status_name, username
            FROM orders INNER JOIN statuses ON orders.status_id = statuses.status_id
            INNER JOIN users ON orders.user_id = users.user_id
            WHERE status_name ILIKE $1;`,
        [status]);
    return res.status(200).json(orders.rows);
});

router.get('/items', async (req, res) => {    
    const status = req.query["status[]"];

    if (Array.isArray(status)) {
        const items = await pool.query(`
            SELECT order_item_id, order_items.order_id, product_name, order_items.quantity, status_name
            FROM order_items INNER JOIN products ON order_items.product_id = products.product_id
            INNER JOIN orders ON order_items.order_id = orders.order_id
            INNER JOIN statuses ON orders.status_id = statuses.status_id
            WHERE LOWER(status_name) = ANY ($1);`, 
        [status]);
        return res.status(200).json(items.rows);  
    }

    if (!status) {
        const items = await pool.query(`
            SELECT order_item_id, order_items.order_id, product_name, order_items.quantity, status_name
            FROM order_items INNER JOIN products ON order_items.product_id = products.product_id
            INNER JOIN orders ON order_items.order_id = orders.order_id
            INNER JOIN statuses ON orders.status_id = statuses.status_id`);
        return res.status(200).json(items.rows);  
    }

    const items = await pool.query(`
        SELECT order_item_id, order_items.order_id, product_name, order_items.quantity, status_name
        FROM order_items INNER JOIN products ON order_items.product_id = products.product_id
        INNER JOIN orders ON order_items.order_id = orders.order_id
        INNER JOIN statuses ON orders.status_id = statuses.status_id
        WHERE status_name ILIKE $1`, 
        [status]);
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