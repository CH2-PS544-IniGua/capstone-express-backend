const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');

dotenv.config();

// Initializes the Google Cloud client library
const storage = new Storage({
  credentials: JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT, 'base64').toString()),
});

const bucketName = 'application-inigua';

async function getFiles() {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    return files.map(file => {
      return `https://storage.googleapis.com/${bucketName}/${file.name}`;
    });
  } catch (error) {
    console.error('Error in getFiles:', error);
    throw error;
  }
}

module.exports = {
  getFiles,
};
