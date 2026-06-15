import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messagesService from "./messagesService";

export const fetchMesMessages = createAsyncThunk(
  "messages/fetchMes",
  async (userId) => messagesService.getMesMessages(userId)
);

export const fetchMessagesEnvoyes = createAsyncThunk(
  "messages/fetchEnvoyes",
  async () => messagesService.getMessagesEnvoyes()
);

export const envoyerMessage = createAsyncThunk(
  "messages/envoyer",
  async (data, thunkAPI) => {
    try {
      return await messagesService.envoyerMessage(data);
    } catch (e) {
      return thunkAPI.rejectWithValue("Erreur envoi message");
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: { liste: [], envoyes: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMesMessages.fulfilled, (state, action) => {
        state.liste = action.payload;
      })
      .addCase(fetchMessagesEnvoyes.fulfilled, (state, action) => {
        state.envoyes = action.payload;
      })
      .addCase(envoyerMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(envoyerMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.envoyes.unshift(action.payload);
      })
      .addCase(envoyerMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messagesSlice.reducer;
