import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import cors from 'cors';
import jobsRouter from './routes/interview';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// app routes
app.use('/api/interview', jobsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 