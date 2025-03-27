import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import cors from 'cors';
import createInterviewRouter from './routes/interview';
import createGoogleDriveRouter from './routes/googledrive';
import { createClient } from '@supabase/supabase-js';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
// Middleware
app.use(cors());
app.use(express.json());

// app routes
app.use('/api/interview', createInterviewRouter(supabase));
app.use('/api/googledrive', createGoogleDriveRouter(supabase));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
