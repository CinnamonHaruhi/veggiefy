import express from 'express';
import pool from '../../config/db.js';
import { isAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', isAdmin, async (req, res) => {
    const products = await pool.query("SELECT * FROM products");
    return res.status(200).json(products.rows);
});

router.post('/add', async (req, res) => {
    const { product_name, unit, price, quantity } = req.body;
    
    if (!product_name || !unit || !price || !quantity) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const productExists = await pool.query('SELECT * FROM products WHERE product_name = $1',
        [product_name]);

    if (productExists.rows.length > 0) {
        return res.status(400).json({ message: 'Product already exists' });
    }

    pool.query('INSERT INTO products (product_name, unit, price, quantity) VALUES ($1, $2, $3, $4)',
        [product_name, unit, price, quantity]);

    return res.status(200).json({ message: 'Product added successfully' });
});

const getProduct = async (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'Bad request. Invalid ID.' });
    }

    const productExists = await pool.query("SELECT * FROM products WHERE product_id = $1",
        [parsedId]);
    if (productExists.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const productData = productExists.rows[0];
    return res.status(200).json(productData);
}

const editProduct = async (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'Bad request. Invalid ID.' });
    }

    const productExists = await pool.query("SELECT * FROM products WHERE product_id = $1",
        [parsedId]);
    if (productExists.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const { product_name, unit, price, quantity } = req.body;
    pool.query("UPDATE products SET product_name = $1, unit = $2, price = $3, quantity = $4 WHERE product_id = $5", 
        [product_name, unit, price, quantity, parsedId]);

    return res.status(200).json({ message: 'Product updated succesfully' });
};

const deleteProduct = async(req, res) => {
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'Bad request. Invalid ID.' });
    }

    const productExists = await pool.query("SELECT * FROM products WHERE product_id = $1",
        [parsedId]);
    if (productExists.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }

    pool.query("DELETE FROM products WHERE product_id = $1", 
        [parsedId]);

    return res.status(200).json({ message: "Product deleted successfully" });
};

router.route("/:id").get(getProduct).put(editProduct).delete(deleteProduct);

export default router;