const backendUrl = 'https://reqres.in';

export const API_ENDPOINTS = {
  GET_USERS: `${backendUrl}/api/users`,
  GET_USER: (id: number) => `${backendUrl}/api/users/${id}`,
  CREATE_USER: `${backendUrl}/api/users`,
  DELETE_USER: (id: number) => `${backendUrl}/api/users/${id}`,
  UPDATE_USER: (id: number) => `${backendUrl}/api/users/${id}`,

  LOGIN: `${backendUrl}/api/login`,
};
