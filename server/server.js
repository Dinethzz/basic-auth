import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});