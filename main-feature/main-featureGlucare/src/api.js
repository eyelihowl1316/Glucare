import axios from 'axios';

// Ini adalah "Best Practice" Axios Instance
// Mengambil URL dari file .env (VITE_API_URL)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
