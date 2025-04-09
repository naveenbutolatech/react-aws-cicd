import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LoginInput } from '../types/types'; // Correct import to new types file
import { loginUser } from '../services/authApi'; // Ensure loginUser import

interface AuthState {
  token: string | null;
  role: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  role: null,
  isLoading: false,
  error: null
};

export const login = createAsyncThunk('auth/login', async (userInput: LoginInput, thunkAPI) => {
  try {
    const response = await loginUser(userInput.loginId, userInput.password); // Correct function call to pass both loginId and password
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("An unknown error occurred");
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
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{ access_token: string; role: string }>) => {
      state.isLoading = false;
      const { access_token, role } = action.payload;
      state.role = role; // Store the user's role in state
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

