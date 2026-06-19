import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import githubRoutes from './routes/github.routes';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173'
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json());

// Root route (Vercel ke error ko fix karne ke liye)
app.get('/', (req, res) => {
  res.send('DevBoard Backend is running successfully!');
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// Mount github routes
app.use('/api/github', githubRoutes);

// Listen on port (Sirf local development ke liye run hoga)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;