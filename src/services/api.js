import axios from 'axios';

const BASE_URL = 'https://www.gocomet.com/api/assignment';

/**
 * Fetch hotel names.
 * @returns {Promise} Hotel names as JSON
 */
export const fetchHotelNames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/hotels-name`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch hotel names');
  }
};

/**
 * Fetch the list of hotels with pagination.
 * @param {number} page - The current page number.
 * @param {number} size - The number of hotels per page.
 * @returns {Promise} Paginated hotel list as JSON
 */
export const fetchHotelsList = async (page, size) => {
  try {
    const response = await axios.get(`${BASE_URL}/hotels`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels list:', error.response || error.message);
    throw new Error('Failed to fetch hotels list');
  }
};

/**
 * Fetch all hotels.
 * NOTE: Use this for fetching all hotels without pagination.
 * @returns {Promise} All hotels as JSON
 */
export const getHotelsList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/hotels`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch all hotels');
  }
};

export const fetchHotelsByName = fetchHotelNames; // Reuse the same function for hotel names