// Production configuration
const BASE_URL = process.env.REACT_APP_API_URL || 'https://mysafespacebackend-eudpc9a9c4c9h0ap.canadacentral-01.azurewebsites.net/';

const apiConfig = {
  auth: `${BASE_URL}/api/auth`,
  blogs: `${BASE_URL}/api/blogs`,
  papers: `${BASE_URL}/api/papers`,
  comments: `${BASE_URL}/api/comments`
};

export default apiConfig;