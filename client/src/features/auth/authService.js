// File to manage API calls
import axios from "axios";
const API_URL = "/api/users";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${API_URL}/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => localStorage.removeItem("user");

const authService = {
  register,
  logout,
  login,
};

export default authService;
