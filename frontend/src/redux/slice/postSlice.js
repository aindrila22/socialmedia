import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllPosts,
  likePost,
  deletePost,
  commentOnPost,
  updatePost,
  createPost,
} from "../../utils/api";

// Thunks for async actions
export const addPostAsync = createAsyncThunk(
  "posts/addPost",
  async (content) => {
    const newPost = await createPost(content);
    return newPost;
  }
);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const posts = await fetchAllPosts();
  return posts;
});

export const likePostAsync = createAsyncThunk(
  "posts/likePost",
  async (postId) => {
    await likePost(postId);
    return postId;
  }
);

export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    await deletePost(postId);
    return postId;
  }
);

export const addCommentAsync = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }) => {
    const updatedPost = await commentOnPost(postId, comment);
    return updatedPost;
  }
);

export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, content }) => {
    const updatedPost = await updatePost(content, postId);
    return updatedPost;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(likePostAsync.fulfilled, (state, action) => {
        const post = state.items.find((p) => p._id === action.payload);
        if (post) post.likes += 1;
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post._id !== action.payload);
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        const updatedPost = action.payload.post;
        console.log(updatedPost)
        const postIndex = state.items.findIndex((post) => post._id === updatedPost._id);     
        if (postIndex >= 0) {
          state.items[postIndex] = updatedPost;
        }
      })
      .addCase(addCommentAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        const postIndex = state.items.findIndex(
          (p) => p._id === action.payload._id
        );
        if (postIndex >= 0) {
          state.items[postIndex] = {
            ...state.items[postIndex],
            ...action.payload,
          };
        }
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default postsSlice.reducer;
