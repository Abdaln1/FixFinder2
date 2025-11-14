import axios from 'axios'

// Use Vite env variable `VITE_API_BASE` in production (e.g. https://api.yourdomain.com)
// Fallback to localhost for local development
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' }
})

// attach token automatically
api.interceptors.request.use(cfg => {
  try {
    const token = localStorage.getItem('ff_token')
    if (token) cfg.headers.Authorization = `Bearer ${token}`
  } catch (e) {}
  return cfg
})

export default api
