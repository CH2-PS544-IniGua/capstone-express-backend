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

router.get('/:username/:historyId', async (req, res) => {
  const { username, historyId } = req.params;

  try {
    const historyItem = await historyService.getHistoryItemById(username, historyId);
    res.status(200).json({ status: 'success', message: 'History item retrieved successfully', data: historyItem });
  } catch (error) {
    if (error.message === 'History item not found') {
      res.status(404).json({ status: 'error', message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve history item', error: error.message });
    }
  }
});

module.exports = router;
