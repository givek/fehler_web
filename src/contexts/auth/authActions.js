import axios from 'axios';
import { SET_TOKEN } from './authTypes';

export async function login(data, dispatchToken) {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/token/`, data);

    if (response.status === 200) {
      dispatchToken({ type: SET_TOKEN, token: response.data.token });
      return {
        ok: true,
        successMessage: 'Login Successfull.',
        errors: null,
      };
    }
  } catch (error) {
    if (error.response) {
      return {
        ok: false,
        successMessage: null,
        errors: { password: error.response.data.errors['non_field_errors'] },
      };
    }
    alert(error);
  }
}

export async function register(data, dispatchToken) {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/register/`,
      data
    );

    if (response.status === 200) {
      dispatchToken({ type: SET_TOKEN, token: response.data.token });
      return {
        ok: true,
        successMessage: 'Register Successfull.',
        errors: null,
      };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      // return {
      //   ok: false,
      //   successMessage: null,
      //   errors: error.response.data.errors,
      // };
    }
    alert(error);
  }
}
