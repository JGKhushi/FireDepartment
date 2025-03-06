import axios from 'axios';

const API_URL = 'http://localhost:5000/api/noc';

export const applyNOC = async (formData) => {
  try {
    
    const response = await axios.post(`${API_URL}/apply`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getNOCs = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateNOCStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
