import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV || 'production',
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
};

const generateToken = (user_id) => {
    return jwt.sign({user_id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

router.post('/register', async (req, res) => {
    const { username, email, phoneNo, password } = req.body;

    if (!username || !email || !phoneNo || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    const usernameExists = await pool.query("SELECT * FROM users WHERE username ILIKE $1",
        [username]);
    if (usernameExists.rows.length > 0) {
        return res.status(400).json({ subject: 'username', message: 'Username already exists' });
    }

    const emailInUse = await pool.query("SELECT * FROM users WHERE email ILIKE $1", 
        [email]);
    if (emailInUse.rows.length > 0  ) {
        return res.status(400).json({ subject: 'email', message: 'Email already in use' });
    }

    const phoneNoInUse = await pool.query("SELECT phone_no FROM users WHERE phone_no = $1",
        [phoneNo]);
    if (phoneNoInUse.rows.length > 0) {
        return res.status(400).json({ subject: 'phoneNo', message: 'Phone number already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query("INSERT INTO users (username, full_name, email, phone_no, password) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, username, email",
        [username, "", email, phoneNo, hashedPassword]);

    const token = generateToken(newUser.rows[0].user_id);
    res.cookie('token', token, cookieOptions);
    
    return res.status(200).json(newUser.rows[0]);
});

router.post('/login', async (req, res) => {
    const { emailOrUsername, password } = req.body;   
    if (!emailOrUsername) {
        return res.status(400).json({ subject: 'emailOrUsername', message: 'Please enter your email or username' });
    }

    if (!password) {
        return res.status(400).json({ subject: 'password', message: 'Please enter your password' });
    }

    const userExists = await pool.query("SELECT * FROM users WHERE email ILIKE $1 OR username ILIKE $2", 
        [emailOrUsername, emailOrUsername]);
    if (userExists.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userData = userExists.rows[0];
    const passwordCorrect = await bcrypt.compare(password, userData.password);

    if (!passwordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(userData.user_id);
    res.cookie('token', token, cookieOptions);

    res.json({
        user_id: userData.user_id,
        username: userData.username,
        email: userData.email,
        role_id: userData.role_id
    });
});

router.get('/me', protect, async (req, res) => {
    res.json(req.user);
});

router.post('/logout', (req, res) => {
    res.cookie('token', '', {...cookieOptions, maxAge: 1});
    res.json({ message: 'Logged out successfully' });
});

export default router;