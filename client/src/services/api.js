import axios from 'axios';

const API_URL = 'http://localhost:5000/api/customers';

export const getCustomers = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const addCustomer = async (customerData) => {
  try {
    const { data } = await axios.post(API_URL, customerData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, customerData);
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};