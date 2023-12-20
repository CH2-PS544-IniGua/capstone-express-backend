const express = require('express');
const router = express.Router();
const historyService = require('../services/history');

// Get user history
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const historyItems = await historyService.getUserHistory(username);
    res.status(200).json({ status: 'success', message: 'History retrieved successfully', data: historyItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to retrieve history', error: error.message });
  }
});

// Add to user history
router.post('/:username', async (req, res) => {
  const { username } = req.params;
  const item = req.body;

  try {
    const itemId = await historyService.addHistoryItem(username, item);
    res.status(201).json({ status: 'success', message: 'History item added successfully', itemId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to add history item', error: error.message });
  }
});

module.exports = router;
