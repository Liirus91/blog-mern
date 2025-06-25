import express from 'express';
import bcript from 'bcrypt';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';
import jwt from 'jsonwebtoken';
import checkAuth from './utils/checkAuth.js';

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

app.post('/auth/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcript.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password or login' });
    }

    const token = jwt.sign({ _id: user._id }, 'secret123', {
      expiresIn: '30d',
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const password = req.body.password;
    const salt = await bcript.genSalt(10);
    const hash = await bcript.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, 'secret123', {
      expiresIn: '30d',
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/auth/me', checkAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(4444, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log('Server is running on http://localhost:4444');
});
