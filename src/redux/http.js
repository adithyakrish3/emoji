import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://artful-iudex.herokuapp.com',
});

export default axiosInstance;