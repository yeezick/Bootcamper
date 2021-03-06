import { api } from './apiConfig';
import * as SecureStore from 'expo-secure-store';

export const getAllUsers = async () => {
  try {
    const res = await api.get('/users');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getOneUser = async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, userUpdate) => {
  try {
    const res = await api.put(`/users/${id}`, userUpdate);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await api.delete(`/users/${id}`);
    const token = await SecureStore.deleteItemAsync('token', token);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addPortfolioProject = async (id, newProject) => {
  try {
    const res = await api.patch(`/users/${id}`, newProject);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const checkEmailAuth = async (email) => {
  try {
    const res = await api.post('/email', email);
    return res.data.message;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (credentials) => {
  try {
    const res = await api.post('/sign-up', credentials);
    const { token, user } = res.data;
    SecureStore.setItemAsync('token', token);
    return user;
  } catch (error) {
    console.error(
      'Error: Unsuccessful sign-up. Verify that you do not have empty fields and a valid email.'
    );
    console.error(error);
    return false;
  }
};

export const signIn = async (credentials) => {
  try {
    const res = await api.post('/sign-in', credentials);
    const { token, user } = res.data;
    await SecureStore.setItemAsync('token', token);
    // const user = jwtDecode(res.data.token);
    return user;
  } catch (error) {
    console.error('Error: User credentials incorrect or user does not exist.');
    console.error(error);
    return false;
  }
};

export const signOut = async () => {
  try {
    // todo: poor error handling, please revise
    await SecureStore.deleteItemAsync('token');
    return true;
  } catch (error) {
    throw error;
  }
}; // missing endpoint

export const verify = async () => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    const { data: payload } = await api.get('/verify');
    const { data: user } = await api.get(`/users/${payload.userID}`);
    return user;
  }
  return false;
};

// tokens may be different every time the JWT formula is used
// foolproof this solution
export const confirmPassword = async (credentials, userID) => {
  try {
    const { data: passwordConfirmed } = await api.post(`/confirm-password/${userID}`, credentials);
    return passwordConfirmed;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePassword = async (newPassword, userID) => {
  const res = await api.patch(`/update-password/${userID}`, { newPassword });
  const { message, status, token, user } = res.data;
  if (status) {
    await SecureStore.setItemAsync('token', token);
    return { status, user };
  } else {
    console.error('API Error:', message);
    return false;
  }
};
