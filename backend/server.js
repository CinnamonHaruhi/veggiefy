import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRoute from './routes/admin/admin.js';
import memberRoute from './routes/member/member.js';
import authRoute from './routes/auth.js';
import { verifyToken } from './middleware/auth.js';
import { isAdmin } from './middleware/auth.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));

app.use('/', authRoute);
app.use('/', verifyToken, memberRoute);
app.use('/admin', verifyToken, isAdmin, adminRoute);

app.get('/', (req, res) => {
    res.send("VEGGIEFYYYYYYYYYYYYYYYYYYYYYYYYOYOOYYO");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
