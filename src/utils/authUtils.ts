import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string;
  // add other properties based on the expected payload structure
}

export const redirectBasedOnRole = (token: string, navigate: (path: string) => void) => {
  console.log('redirectBasedOnRole called with token:', token);

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log('Decoded JWT payload:', decoded);

    if (decoded.role === 'admin') {
      navigate('/admin');
    } else if (decoded.role === 'doctor') {
      navigate('/doctor');
    } else {
      console.warn(`Unknown role: ${decoded.role}`);
    }
  } catch (error) {
    console.error('Failed to decode token', error);
  }
};

