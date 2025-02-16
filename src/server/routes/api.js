const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/models', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.OLLAMA_API_URL}/api/tags`);
        const models = response.data.models || [];
        res.json({ success: true, models });
    } catch (error) {
        console.error('Error fetching models:', error);
        res.json({ success: false, error: 'Failed to fetch models' });
    }
});

module.exports = router;