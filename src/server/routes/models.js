const express = require('express');
const axios = require('axios');
const router = express.Router();
const OLLAMA_API_URL = process.env.OLLAMA_API_URL; 

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_API_URL}/api/tags`);
    const models = response.data.models;
    res.json({ success: true, models });
  } catch (err) {
    console.error('Error fetching models:', err);
    res.json({ success: false, message: 'Failed to fetch models from Ollama API' });
  }
});

module.exports = router;