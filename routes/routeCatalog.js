const express = require('express');
const router = express.Router();
const catalogService = require('../services/catalog');

router.get('', async (req, res) => {
  const { search, page, limit } = req.query;

  try {
    const catalogItems = await catalogService.getAllCatalogItems(search, page, limit);
    res.status(200).json({ status: 'success', message: 'Catalog items retrieved successfully', data: catalogItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to retrieve catalog items', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const catalogItem = await catalogService.getCatalogItemById(id);
    res.status(200).json({ status: 'success', message: 'Catalog item retrieved successfully', data: catalogItem });
  } catch (error) {
    if (error.message === 'Catalog item not found') {
      res.status(404).json({ status: 'error', message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve catalog item', error: error.message });
    }
  }
});

module.exports = router;
