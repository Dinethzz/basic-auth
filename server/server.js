import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
app.use(cors({credentials: true, origin: 'http://localhost:4000'}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hellooo from the server!');
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});