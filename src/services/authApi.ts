import axios from 'axios';
import { jwtDecode } from "jwt-decode"; // Import as default

const api = axios.create({
  baseURL: 'http://3.148.103.209:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

interface DecodedToken {
  role: string;
}

export interface LoginResponse {
  access_token: string;
  role: string;
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
    const { access_token } = response.data;
    const decoded: DecodedToken = jwtDecode(access_token);  // Use default import

    return { 
      access_token,
      role: decoded.role
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    }
    throw new Error('Network error. Please check your connection.');
  }
}