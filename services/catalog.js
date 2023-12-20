const admin = require('./db'); // Make sure this points to the file where Firebase Admin is initialized
const db = admin.firestore();

async function getAllCatalogItems(search, page, limit) {
    try {
      let query = db.collection('catalog');
  
      // Check if page and limit are numbers. If not, default to fetching all items
      const isPageNumber = !isNaN(page);
      const isLimitNumber = !isNaN(limit);
  
      const snapshot = await query.get();
  
      let catalogItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // filter search to title, overview, and short_desc
      if (search) {
        const searchLower = search.toLowerCase();
        catalogItems = catalogItems.filter(item => {
          const titleLower = item.title.toLowerCase();
          const overviewLower = item.overview.toLowerCase();
          const short_descLower = item.short_desc.toLowerCase();
          return titleLower.includes(searchLower) || overviewLower.includes(searchLower) || short_descLower.includes(searchLower);
        });
      }

      // if isPageNumber, add pagination and limit
      if (isPageNumber) {
        const limitNum = isLimitNumber ? Number(limit) : 8;
        // Implement pagination if page and limit are numbers
        const startIndex = (page - 1) * limitNum;
        catalogItems = catalogItems.slice(startIndex, startIndex + limitNum);
      }

      return catalogItems;
    } catch (error) {
      console.error('Error in getAllCatalogItems:', error);
      throw error;
    }
  }

  async function getCatalogItemById(catalogItemId) {
    try {
      const catalogItemRef = db.collection('catalog').doc(catalogItemId);
      const doc = await catalogItemRef.get();
  
      if (!doc.exists) {
        throw new Error('Catalog item not found');
      }
  
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error in getCatalogItemById:', error);
      throw error;
    }
  }
  
  module.exports = {
    getAllCatalogItems,
    getCatalogItemById, // Export the new function
  };
