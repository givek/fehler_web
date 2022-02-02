import fehlerApi from '../../utils/fehlerApi';
import { SET_TOKEN } from './authTypes';

export async function login(data, dispatchToken) {
  try {
    const response = await fehlerApi.post(`token`, data);

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
    const response = await fehlerApi.post(`register`, data);

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
      return {
        ok: false,
        successMessage: null,
        errors: error.response.data.errors,
      };
    }
    alert(error);
  }
}
