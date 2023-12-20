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

  async function getRecommendationClothes(color) {
    try {
      // TODO: Implement color recommendation with table of clothes color recommendations from ML, GET 3 highest color recommendations

      const colors = ['Black','Brown','Gray', 'Green','Orange','Pink','Purple','Red','White','Yellow','Cream']
      // THIS IS DUMMY FUNCTION to get 3  colors
      const randomColors = []
      while (randomColors.length < 3) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        if (!randomColors.includes(randomColor)) {
          randomColors.push(randomColor)
        }
      }

      // get catalog with type clothes and color in randomColors
      const catalogRef = db.collection('catalog')
      const snapshot = await catalogRef.where('type', '==', 'clothes').where('color', 'in', randomColors).get()
      const catalogItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // sort by randomColor order
      const catalogItemsSorted = []
      randomColors.forEach(color => {
        catalogItemsSorted.push(...catalogItems.filter(item => item.color === color))
      })

      return catalogItemsSorted
    } catch (error) {
      console.error('Error in getRecommendationClothes:', error);
      throw error;
    }
  }

  async function getRecommendationPants(color) {
    try {
      // TODO: Implement color recommendation with table of pants color recommendations from ML, GET 3 highest color recommendations

      const colors = ['Black','Brown','Gray', 'Green','Orange','Pink','Purple','Red','White','Yellow','Cream']
      // THIS IS DUMMY FUNCTION to get 3  colors
      const randomColors = []
      while (randomColors.length < 3) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        if (!randomColors.includes(randomColor)) {
          randomColors.push(randomColor)
        }
      }

      // get catalog with type pants and color in randomColors
      const catalogRef = db.collection('catalog')
      const snapshot = await catalogRef.where('type', '==', 'pants').where('color', 'in', randomColors).get()
      const catalogItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // sort by randomColor order
      const catalogItemsSorted = []
      randomColors.forEach(color => {
        catalogItemsSorted.push(...catalogItems.filter(item => item.color === color))
      })

      return catalogItemsSorted
    }
    catch (error) {
      console.error('Error in getRecommendationPants:', error);
      throw error;
    }
  }

  
  module.exports = {
    getAllCatalogItems,
    getCatalogItemById,
    getRecommendationClothes,
    getRecommendationPants,
  };
