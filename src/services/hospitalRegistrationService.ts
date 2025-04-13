import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface HospitalRegistrationData {
  firstname: string;
  email: string;
  phonenumber: string;
  status: string;
  role: string;
  password: string;
  address: string;
}

export const registerHospitalService = async (data: HospitalRegistrationData) => {
  try {
    const response = await api.post('/users/create', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Hospital registration failed'
      );
    }
    throw new Error('Network error');
  }
};
