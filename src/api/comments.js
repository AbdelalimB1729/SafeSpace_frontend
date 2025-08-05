import axios from 'axios';
import apiConfig from './apiConfig';

// Create new comment
export const createComment = async (commentData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(apiConfig.comments, commentData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to post comment';
  }
};

// Get comments for a target
export const getComments = async (targetType, targetId) => {
  try {
    const response = await axios.get(`${apiConfig.comments}/${targetType}/${targetId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch comments';
  }
};

// Delete comment (admin only)
export const deleteComment = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.delete(`${apiConfig.comments}/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to delete comment';
  }
};