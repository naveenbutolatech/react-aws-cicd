import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHospitalList } from '../services/hospitalService';

export interface HospitalType {
  id: string;
  firstname: string;
  email: string;
  address: string;
  phonenumber: string;
}

interface HospitalState {
  hospitals: HospitalType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HospitalState = {
  hospitals: [],
  isLoading: false,
  error: null,
};

export const fetchHospitals = createAsyncThunk(
  'hospitals/fetchHospitals',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    return await getHospitalList(limit, offset);
  }
);

const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHospitals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hospitals = action.payload;
        state.error = null;
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch hospitals.';
      });
  },
});

export default hospitalSlice.reducer;

