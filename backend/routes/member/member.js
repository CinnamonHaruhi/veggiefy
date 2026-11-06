import express from 'express';
import orderRoute from './order.js';
import productRoute from './product.js';

const router = express.Router();

router.use('/orders', orderRoute);
router.use('/products', productRoute);

export default router;