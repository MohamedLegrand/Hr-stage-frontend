import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import preinscriptionService from "./preinscriptionService";

export const fetchStatutPreinscription = createAsyncThunk("preinscription/fetchStatut", async (_, thunkAPI) => {
  try {
    return await preinscriptionService.getStatut();
  } catch (error) {
    return thunkAPI.rejectWithValue(null);
  }
});

export const initierPreinscription = createAsyncThunk("preinscription/initier", async (data, thunkAPI) => {
  try {
    return await preinscriptionService.initierPreinscription(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Erreur préinscription");
  }
});

const preinscriptionSlice = createSlice({
  name: "preinscription",
  initialState: {
    preinscription: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatutPreinscription.fulfilled, (state, action) => { state.preinscription = action.payload; })
      .addCase(initierPreinscription.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(initierPreinscription.fulfilled, (state) => { state.loading = false; })
      .addCase(initierPreinscription.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
  }
});

export default preinscriptionSlice.reducer;
