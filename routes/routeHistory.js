const express = require('express');
const router = express.Router();
const historyService = require('../services/history');

router.get('/', async (req, res) => {
  try {
    const urls = await historyService.getFiles();
    res.status(200).json({ status: 'success', message: 'Files retrieved successfully', data: urls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to retrieve files', error: error.message });
  }
});

module.exports = router;
