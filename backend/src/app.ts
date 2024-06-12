import express from 'express';
import cors from 'cors';
import feedbackRoutes from './routes/feedback';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 5000;

const limiter = rateLimit({
  windowMs: 10 * 1000, 
  max: 5, 
});

app.use(cors());
app.use(express.json());
app.use('/feedback', limiter, feedbackRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
