import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slice/postSlice";
import userReducer from "./slice/userSlice";
import profileReducer from "./slice/profileSlice";


const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    profile: profileReducer
  },
});

export default store;