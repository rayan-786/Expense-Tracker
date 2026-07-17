import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  login as loginService,
  logout as logoutService,
  saveAuth,
  getToken,
  getUser
} from "../services/auth.service";

/* =========================================================
   CONTEXT
========================================================= */

const AuthContext = createContext();

/* =========================================================
   PROVIDER
========================================================= */

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     RESTORE LOGIN
  ===================================================== */

  useEffect(() => {

    const storedToken = getToken();
    const storedUser = getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setLoading(false);

  }, []);

  /* =====================================================
     LOGIN
  ===================================================== */

  const login = async (credentials) => {

    const response = await loginService(credentials);

    if (!response.success) {
      throw new Error(response.message);
    }

    saveAuth(
      response.token,
      response.user
    );

    setToken(response.token);
    setUser(response.user);

    return response;

  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {

    logoutService();

    setToken(null);
    setUser(null);

  };

  /* =====================================================
     UPDATE USER
  ===================================================== */

  const updateUser = (updatedUser) => {

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

  };

  /* =====================================================
     VALUES
  ===================================================== */

  const value = {

    user,
    setUser,

    token,

    loading,

    isAuthenticated: !!token,

    login,

    logout,

    updateUser

  };

  return (

    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>

  );

};

/* =========================================================
   CUSTOM HOOK
========================================================= */

export const useAuth = () => {
  return useContext(AuthContext);
};