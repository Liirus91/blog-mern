import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/auth/login', (req, res) => {
  const { email, fullName } = req.body;

  const token = jwt.sign(
    {
      email,
      fullName,
    },
    'secret123'
  );

  res.json({ success: true, token });
});

app.listen(4444, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log('Server is running on http://localhost:4444');
});
