import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LoginInput } from '../types/types'; // Correct import to new types file
import { loginUser } from '../services/authApi'; // Ensure loginUser import

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null
};

export const login = createAsyncThunk('auth/login', async (userInput: LoginInput, thunkAPI) => {
  try {
    const response = await loginUser(userInput.loginId, userInput.password); // Correct function call to pass both loginId and password
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{ access_token: string }>) => {
      state.isLoading = false;
      const { access_token } = action.payload;
      state.token = access_token;
      console.log('Token received and stored:', access_token);
      localStorage.setItem('token', access_token);
      console.log('Token state updated');
      state.error = null;
    })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Login failed';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

