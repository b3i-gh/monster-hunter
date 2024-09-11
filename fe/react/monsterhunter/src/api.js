// src/api.js
import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: "http://localhost:8080/api/monsters", // Your Spring Boot backend URL
});

export default api;
