import express from 'express';
import pool from '../../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await pool.query("SELECT * FROM products");
    return res.status(200).json(products.rows);
});

export default router