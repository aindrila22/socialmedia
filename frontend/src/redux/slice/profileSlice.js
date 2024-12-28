import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile, fetchMyLikes } from '../../utils/api';

export const fetchProfileAsync = createAsyncThunk(
  'profile/fetchProfile',
  async (id) => {
    const profileData = await fetchUserProfile(id);
    return profileData;
  }
);

export const fetchLikesAsync = createAsyncThunk(
  'profile/fetchLikes',
  async (id) => {
    const likesData = await fetchMyLikes(id);
    return likesData;
  }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
      profileData: null,
      profileLikes: null,
      profileLoading: false,
      likesLoading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProfileAsync.pending, (state) => {
          state.profileLoading = true;
        })
        .addCase(fetchProfileAsync.fulfilled, (state, action) => {
          state.profileData = action.payload;
          state.profileLoading = false;
        })
        .addCase(fetchProfileAsync.rejected, (state, action) => {
          state.error = action.error.message;
          state.profileLoading = false;
        })
        .addCase(fetchLikesAsync.pending, (state) => {
          state.likesLoading = true;
        })
        .addCase(fetchLikesAsync.fulfilled, (state, action) => {
          state.profileLikes = action.payload;
          state.likesLoading = false;
        })
        .addCase(fetchLikesAsync.rejected, (state, action) => {
          state.error = action.error.message;
          state.likesLoading = false;
        });
    },
  });
  

export default profileSlice.reducer;