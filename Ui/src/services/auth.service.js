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

export const verifyOTP = async (data) => {
  const response = await api.post("/auth/verify-otp", data);
  return response.data;
};
export const sendEmailOTP = async (newEmail) => {
  const response = await api.post("/auth/send-email-otp", {
    newEmail,
  });

  return response.data;
};

export const updateEmail = async (otp) => {
  const response = await api.put("/auth/update-email", {
    otp,
  });

  return response.data;
};
export const changePassword = async (data) => {
  const response = await api.put(
    "/auth/change-password",
    data
  );

  return response.data;
};

export const updateLanguage = async (language)=>{

 const response=await api.put(

 "/auth/language",

 {language}

 );

 return response.data;

};
export const deleteAccount = async (password) => {

  const response = await api.delete(
    "/auth/delete-account",
    {
      data: {
        password
      }
    }
  );

  return response.data;

};