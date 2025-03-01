import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// app routes


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 