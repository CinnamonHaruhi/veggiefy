import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
         
        if (!token) {
            return res.status(401).json({ message: "Not authorized. No token." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await pool.query("SELECT user_id, username, full_name, email, phone_no, role_id FROM users WHERE user_id = $1",
            [decoded.user_id]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Not authorized. User not found." });
        }

        req.user = user.rows[0];
        next();

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Not authorized. Token failed." });
    }
};

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authorized. No token." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await pool.query("SELECT user_id, username, full_name, email, phone_no, role_id FROM users WHERE user_id = $1",
            [decoded.user_id]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Not authorized. User not found." });
        }

        req.user = user.rows[0];
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Not authorized. Token failed." });
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const roleId = req.user.role_id;

        if (parseInt(roleId) !== 1) {
            return res.status(400).json({ message: "Not authorized. Not an admin."});
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Not authorized. Token failed." });
    }
};