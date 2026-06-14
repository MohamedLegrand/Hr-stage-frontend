import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

export const fetchDashboard = createAsyncThunk("admin/fetchDashboard", async (_, thunkAPI) => {
  try {
    return await adminService.getDashboard();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Erreur");
  }
});

export const fetchDossiers = createAsyncThunk("admin/fetchDossiers", async (_, thunkAPI) => {
  try {
    return await adminService.getDossiers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Erreur");
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboard: null,
    dossiers: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => { state.loading = true; })
      .addCase(fetchDashboard.fulfilled, (state, action) => { state.loading = false; state.dashboard = action.payload; })
      .addCase(fetchDashboard.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchDossiers.pending, (state) => { state.loading = true; })
      .addCase(fetchDossiers.fulfilled, (state, action) => { state.loading = false; state.dossiers = action.payload; })
      .addCase(fetchDossiers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
  }
});

export default adminSlice.reducer;