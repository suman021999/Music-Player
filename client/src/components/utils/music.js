import axios from 'axios';

const API_URL = import.meta.env.VITE_AUTH_URL;

export const getAllMusic = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.data; // Assuming your backend returns data in this structure
  } catch (error) {
    console.error('Error fetching music:', error);
    throw error;
  }
};

export const uploadMusic = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading music:', error);
    throw error;
  }
};