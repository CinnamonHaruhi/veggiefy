import express from 'express';
import orderRoute from './order.js';

const router = express.Router();

router.use('/orders', orderRoute);

export default router;