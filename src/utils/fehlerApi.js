import axios from 'axios';

const apiVersion = 'api';

const fehlerApi = axios.create({
  baseURL: `http://127.0.0.1:8000/${apiVersion}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default fehlerApi;
