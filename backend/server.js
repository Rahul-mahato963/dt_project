import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json.js';
import tasksRouter from './routes/tasks.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI )
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Swagger Docs
app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/tasks', tasksRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'DT Node.js Challenge API ✅', 
    docs: '/api-docs',
    endpoints: '/api/tasks' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 DT API running on http://localhost:${PORT}/api-docs`);
});
