const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
//
//
const priceRoutes = require('./src/routes/bitcoinPrice');
const playerRoutes = require('./src/routes/player');
const { configDB, connectDB } = require('./src/config/db');
const app = express();

dotenv.config();

// config AWS sdk for dynamodb
// configDB();

app.use(cors());

app.use(express.json());

// db config
connectDB();

app.get('/', (req, res, next) => {
  res.send('Server is running...');
});

app.use('/api/bitcoinPrice', priceRoutes);
app.use('/api/player', playerRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, console.log(`Server is running on port ${PORT}`));
