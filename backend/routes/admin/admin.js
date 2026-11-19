import express from 'express';
import productRouter from './product.js';
import testRouter from './test.js';
import orderRouter from './order.js';
import dashboardRouter from './dashboard.js';

const router = express.Router();
router.use('/products', productRouter);
router.use('/test', testRouter);
router.use('/orders', orderRouter);
router.use('/dashboard', dashboardRouter);

router.get('/', async (req, res) => {
    res.send("ADMIN DASHBOARD HERE");
});


export default router;