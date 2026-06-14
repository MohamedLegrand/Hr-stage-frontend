import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import documentsService from "./documentsService";

export const fetchDocuments = createAsyncThunk("documents/fetchDocuments", async (_, thunkAPI) => {
  try {
    return await documentsService.getMesDocuments();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Erreur");
  }
});

const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    liste: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => { state.loading = true; })
      .addCase(fetchDocuments.fulfilled, (state, action) => { state.loading = false; state.liste = action.payload; })
      .addCase(fetchDocuments.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
  }
});

export default documentsSlice.reducer;