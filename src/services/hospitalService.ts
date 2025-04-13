import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
});

export const getHospitalList = async (limit: number, offset: number) => {
  try {
    const response = await api.get('/users/find-by-type/hospital', {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch hospital list.'
      );
    }
    throw new Error('Network error. Please check your connection.');
  }
};

