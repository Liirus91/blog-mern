import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';

mongoose
  .connect(
    'mongodb+srv://admin:password@cluster0.5dkt98k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.json({
    success: true,
  });
});

app.listen(4444, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log('Server is running on http://localhost:4444');
});
