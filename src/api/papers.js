import axios from 'axios';
import apiConfig from './apiConfig';

// Get all papers
export const getPapers = async () => {
  try {
    const response = await axios.get(apiConfig.papers);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch papers';
  }
};

// Upload paper (admin only)
export const uploadPaper = async (formData, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(apiConfig.papers, formData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to upload paper';
  }
};

// Download paper
export const downloadPaper = async (id) => {
  try {
    const response = await axios.get(`${apiConfig.papers}/${id}/download`, {
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to download paper';
  }
};

// Get PDF viewing URL
export const getPaperViewUrl = (id) => {
  return `${apiConfig.papers}/${id}/view`;
};

// Delete paper (admin only)
export const deletePaper = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${apiConfig.papers}/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete paper';
  }
};