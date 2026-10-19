import express from 'express';
import productRouter from './product.js';
import testRouter from './test.js';

const router = express.Router();
router.use('/product', productRouter);
router.use('/test', testRouter);

router.get('/', async (req, res) => {
    res.send("ADMIN DASHBOARD HERE");
});


export default router;