import dotenv from 'dotenv';
dotenv.config();

import express , {Application , Request , Response } from 'express';
import authRoutes from './routes/authRoutes.js';

const app : Application = express();
const PORT : string | undefined = process.env.PORT 

app.use(express.json());


app.use('/auth', authRoutes);

app.listen(PORT , ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});