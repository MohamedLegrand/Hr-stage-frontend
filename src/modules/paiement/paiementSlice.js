import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paiementService from "./paiementService";

export const fetchStatutPaiement = createAsyncThunk("paiement/fetchStatut", async (_, thunkAPI) => {
  try {
    return await paiementService.getStatut(); // null si aucun paiement (200), objet sinon
  } catch {
    return thunkAPI.rejectWithValue(null);
  }
});

export const initierPaiement = createAsyncThunk("paiement/initier", async (data, thunkAPI) => {
  try {
    return await paiementService.initierPaiement(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Erreur paiement");
  }
});

const paiementSlice = createSlice({
  name: "paiement",
  initialState: {
    paiement: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatutPaiement.fulfilled, (state, action) => { state.paiement = action.payload; })
      .addCase(initierPaiement.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(initierPaiement.fulfilled, (state, action) => { state.loading = false; })
      .addCase(initierPaiement.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
  }
});

export default paiementSlice.reducer;