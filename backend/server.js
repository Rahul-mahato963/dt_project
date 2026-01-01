import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json.js';
import tasksRouter from './routes/Tasks.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin:"https://dt-project-production.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI )
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));


app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/tasks', tasksRouter);


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
