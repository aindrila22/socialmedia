import { backendUrl } from "@/lib/utils";

//register user
export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  try {
    const response = await fetch(`${backendUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || "Failed to register");
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

//login user
export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || "Failed to login");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

//current user 
export const fetchUserDetails = async (token) => {
  try {
    const response = await fetch(`${backendUrl}/api/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(
      "Error fetching user details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//all posts
export const fetchAllPosts = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/posts/`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    console.error(
      "Error fetching user details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// create post
export const createPost = async (content) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found. Please log in.");
  }
  try {
    const response = await fetch(`${backendUrl}/api/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create post");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while creating the post"
    );
  }
};

// update post
export const updatePost = async (content, id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found. Please log in.");
  }
  try {
    const response = await fetch(`${backendUrl}/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create post");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while creating the post"
    );
  }
};

// Like a post
export const likePost = async (postId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found. Please log in.");
  }

  try {
    const response = await fetch(`${backendUrl}/api/posts/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(
      "Error fetching user details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a post
export const deletePost = async (postId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found. Please log in.");
  }

  try {
    const response = await fetch(`${backendUrl}/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete post");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting post:", error.message || error);
    throw error;
  }
};

// Comment on a post
export const commentOnPost = async (postId, commentContent) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found. Please log in.");
  }

  try {
    const response = await fetch(`${backendUrl}/api/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: commentContent }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to add comment.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding comment:", error.message);
    throw error;
  }
};

// Fetch user profile
export const fetchUserProfile = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found. Please log in.");
  }
  try {
    const response = await fetch(`${backendUrl}/api/auth/profile/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Fetch user likes
export const fetchMyLikes = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found. Please log in.");
  }
  try {
    const response = await fetch(`${backendUrl}/api/auth/profile/${id}/likes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch liked posts");
    }
    const data = await response.json();
    return data.likedPosts;
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    throw error;
  }
};