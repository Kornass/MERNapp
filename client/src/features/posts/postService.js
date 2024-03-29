import axios from "axios";

const API_URL = "/api/posts/";

const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + postId, config);
  return response.data;
};

const closePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + postId,
    { status: "closed" },
    config
  );
  return response.data;
};

const updatePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const post = await axios.get(API_URL + postId, config);
  const today = new Date();
  const created = new Date(post.data.createdAt);
  const dayDiff = (today - created) / 1000 / 60 / 60 / 24;
  if (dayDiff > 1 && post.data.status === "new") {
    const response = await axios.put(
      API_URL + postId,
      { status: "open" },
      config
    );
    return response.data;
  }
};

const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + postId, config);
  return response.data;
};

const restorePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const post = await axios.get(API_URL + postId, config);
  if (post.data.status === "closed") {
    const response = await axios.put(
      API_URL + postId,
      { status: "open" },
      config
    );
    return response.data;
  }
};

const postService = {
  createPost,
  getPosts,
  getPost,
  closePost,
  updatePost,
  deletePost,
  restorePost,
};
export default postService;
