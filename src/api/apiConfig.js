// Production configuration
const BASE_URL = process.env.REACT_APP_API_URL || 'https://your-production-domain.com';

const apiConfig = {
  auth: `${BASE_URL}/api/auth`,
  blogs: `${BASE_URL}/api/blogs`,
  papers: `${BASE_URL}/api/papers`,
  comments: `${BASE_URL}/api/comments`
};

export default apiConfig;