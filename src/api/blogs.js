import axios from 'axios';
import apiConfig from './apiConfig';

// Get all blogs
export const getBlogs = async () => {
  try {
    const response = await axios.get(apiConfig.blogs);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch blogs';
  }
};

// Create new blog (admin only)
export const createBlog = async (blogData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(apiConfig.blogs, blogData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create blog';
  }
};

// Get single blog by ID
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${apiConfig.blogs}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Blog not found';
  }
};

// Delete blog (admin only)
export const deleteBlog = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${apiConfig.blogs}/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete blog';
  }
};