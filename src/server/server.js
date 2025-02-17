const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');

const updateEnvFile = require('./config/env');
updateEnvFile();
require('dotenv').config({ path: path.join(__dirname, '../../', '.env') });

const connectDatabase = require('./config/database');
const authRoutes = require('./routes/auth');
const modelsRoutes = require('./routes/models');
const getLocalIPv4 = require('./utils/getLocalIPv4');

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        'http://localhost:3001',
        'http://127.0.0.1:3001',
        `http://${getLocalIPv4()}:3001`
      ];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
  })
);

app.use(express.json());

connectDatabase();

app.use('/api', authRoutes);
app.use('/api/models', modelsRoutes);

const initializeSocket = require('./socket/chatSocket');
initializeSocket(server);

const BACKEND_PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || getLocalIPv4();
server.listen(BACKEND_PORT, () => {
  console.log(`ChatLLama Server running on port http://${HOST}:${BACKEND_PORT}`);
});