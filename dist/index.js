import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes.js';
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use((req, res, next) => {
    if (req.path === '/') {
        res.redirect('/auth');
    }
    else {
        next();
    }
});
app.use('/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
