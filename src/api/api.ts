import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// TODO update while working on Authentication feature
// API.interceptors.request.use((request) => {
//   const accessToken = getAccessToken();
//   const accessHeader = `Bearer ${accessToken}`;
//   request.headers['Authorization'] = accessHeader;
//   return request;
// });

export default API;
