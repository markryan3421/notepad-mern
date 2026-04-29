import axios from "axios";

const api = axios.create({
  baseUrl: "http://localhost:5001/api"
});

export default api;