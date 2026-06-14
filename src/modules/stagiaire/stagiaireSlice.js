import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stagiaireService from "./stagiaireService";

export const fetchProfil = createAsyncThunk("stagiaire/fetchProfil", async (_, thunkAPI) => {
  try {
    return await stagiaireService.getProfil();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Erreur");
  }
});

const stagiaireSlice = createSlice({
  name: "stagiaire",
  initialState: {
    profil: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfil.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProfil.fulfilled, (state, action) => { state.loading = false; state.profil = action.payload; })
      .addCase(fetchProfil.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
  }
});

export default stagiaireSlice.reducer;