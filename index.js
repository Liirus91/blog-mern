import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

mongoose
  .connect(
    `mongodb+srv://admin:password@cluster0.5dkt98k.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

const app = express();

app.use(express.json());

app.post('/auth/login', UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log('Server is running on http://localhost:4444');
});
