import axios from 'axios';
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });
api.interceptors.request.use(c => { const t = localStorage.getItem('token'); if (t) c.headers.Authorization = 'Bearer ' + t; return c; });
api.interceptors.response.use(r => r, e => {
  if (e.response?.status === 401 && localStorage.getItem('token')) { localStorage.clear(); window.location.href = '/login'; }
  return Promise.reject(e);
});
export const errMsg = e => e.response?.data?.message || 'Cannot reach the server. Try again.';
export default api;
