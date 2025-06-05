import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/auth/login', (req, res) => {
  res.json({ success: true });
});

app.listen(4444, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log('Server is running on http://localhost:4444');
});
