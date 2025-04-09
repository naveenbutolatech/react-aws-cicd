import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface LoginResponse {
  access_token: string;
}

export const loginUser = async (
  loginId: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post('/auth/login', {
      "emailOrPhone":loginId,
      password
    });
    console.log('API response data:', response.data);
    return { access_token: response.data.access_token };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    }
    throw new Error('Network error. Please check your connection.');
  }
};

