// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();

// Port
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
