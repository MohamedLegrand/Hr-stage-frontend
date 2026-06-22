import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await authService.login(data);
    localStorage.setItem("token", response.access_token);
    const decoded = jwtDecode(response.access_token);
    return { token: response.access_token, role: decoded.role };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Erreur de connexion");
  }
});

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    await authService.register(data);
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.detail || "Erreur d'inscription");
  }
});

const token = localStorage.getItem("token");
let role = null;
try {
  role = token ? jwtDecode(token)?.role : null;
} catch (e) {
  role = null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    role: role || null,
    loading: false,
    error: null,
    registered: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => { state.error = null; },
    clearRegistered: (state) => { state.registered = false; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.token = action.payload.token; state.role = action.payload.role; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; state.registered = false; })
      .addCase(register.fulfilled, (state) => { state.loading = false; state.registered = true; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
  }
});

export const { logout, clearError, clearRegistered } = authSlice.actions;
export default authSlice.reducer;