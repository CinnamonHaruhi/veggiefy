import express from 'express';
import pool from '../../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("ORDERS PAGE");
});

export default router;