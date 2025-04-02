import axios from 'axios';
export const API_URL = process.env.REACT_APP_API_URL;
export const ENVIRONMENT = process.env.REACT_APP_NODE_ENV;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


