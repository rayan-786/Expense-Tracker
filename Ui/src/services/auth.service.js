import api from "../api/axios";

export const register = async (userData) => {

  const response = await api.post(

    "/auth/register",

    userData

  );

  return response.data;

};

export const login = async (credentials) => {

  const response = await api.post(

    "/auth/login",

    credentials

  );

  return response.data;

};

export const logout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

};

export const getToken = () => {

  return localStorage.getItem("token");

};

export const getUser = () => {

  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;

};


export const saveAuth = (

  token,

  user

) => {

  localStorage.setItem(

    "token",

    token

  );

  localStorage.setItem(

    "user",

    JSON.stringify(user)

  );

};

export const isAuthenticated = () => {

  return !!localStorage.getItem(

    "token"

  );

};