import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserDetails } from "../../utils/api";

// Async thunk to fetch user details
export const fetchUserAsync = createAsyncThunk(
  "user/fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      const userDetails = await fetchUserDetails(token);
      return userDetails;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user details.");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    details: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser(state) {
      state.details = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;