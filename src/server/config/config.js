const dotenv = require('dotenv');
dotenv.config({path: '../../../'});

const config = {
  OLLAMA_API_URL: 'http://localhost:11434',
  MONGODB_URI: 'mongodb://localhost:27017/ChatLLama',
  PORT: 5000,
  HOST: process.env.HOST
};

module.exports = config; 