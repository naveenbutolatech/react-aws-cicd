import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerHospitalService, HospitalRegistrationData } from '../services/hospitalRegistrationService';

interface RegistrationState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  isLoading: false,
  success: false,
  error: null,
};

export const registerHospital = createAsyncThunk(
  'hospitalRegistration/register',
  async (formData: HospitalRegistrationData, { rejectWithValue }) => {
    try {
      return await registerHospitalService(formData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Registration failed');
    }
  }
);

const hospitalRegistrationSlice = createSlice({
  name: 'hospitalRegistration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerHospital.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerHospital.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(registerHospital.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default hospitalRegistrationSlice.reducer;
