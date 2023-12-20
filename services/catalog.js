const admin = require('./db'); // Make sure this points to the file where Firebase Admin is initialized
const db = admin.firestore();

async function getAllCatalogItems(search, page, limit) {
    try {
      let query = db.collection('catalog');
  
      // Check if page and limit are numbers. If not, default to fetching all items
      const isPageNumber = !isNaN(page);
      const isLimitNumber = !isNaN(limit);
  
      if (isPageNumber) {
        const limitNum = isLimitNumber ? Number(limit) : 8;
        // Implement pagination if page and limit are numbers
        const startIndex = (page - 1) * limitNum;
        query = query.offset(startIndex).limit(limitNum);
      } // If either page or limit isn't a number, we don't paginate and fetch all items
  
      const snapshot = await query.get();
  
      let catalogItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // filter by search
      if (search) {
        const searchLower = search.toLowerCase();
        catalogItems = catalogItems.filter(item => {
          const titleLower = item.title.toLowerCase();
          return titleLower.includes(searchLower);
        });
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
