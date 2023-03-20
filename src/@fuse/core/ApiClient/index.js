
import axios from 'axios'

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? "https://dv3uzoisph.execute-api.eu-west-2.amazonaws.com/dev"
    : "https://dv3uzoisph.execute-api.eu-west-2.amazonaws.com/dev",
  timeout: 20000,
});

const requestHandler = config => {
  if (config.url !== "/login") {
    const token = `Bearer ${localStorage.getItem('access_token')}`;
    config.headers.Authorization = token;
  }
  return config;
};

const responseHandler = response => {
  return response;
};

const errorHandler = error => {
  return Promise.reject(error);
};

client.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

client.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
export default client;