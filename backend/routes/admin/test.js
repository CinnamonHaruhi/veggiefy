import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    res.send("ADMIN TEST PAGE HERE");
});

export default router;