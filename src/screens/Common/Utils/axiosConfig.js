import axios from 'axios';
import { handleError, handleResponse } from './handleServer';

axios.defaults.baseURL = 'http://127.0.0.1:9996';

export const axiosGet = async (url, params) => {
  let responseHandled;
  try {
    const response = await axios.get(url, { params });
    responseHandled = handleResponse(response);
  } catch (error) {
    responseHandled = handleError(error);
  }

  return responseHandled;
};

export const axiosPost = async (url, data) => {
  let responseHandled;
  try {
		 const response = await axios.post(url, data);
    responseHandled = handleResponse(response);
  } catch (error) {
    responseHandled = handleError(error);
  }

  return responseHandled;
};
