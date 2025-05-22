//Use-Auth is Custom-Hook used to get the session anywhere in the project.
//You just need to wrap the children component in this AuthProvider at _app.jsx

import { useEffect, useState, createContext, useContext } from "react";
import { getSession, signOut } from "next-auth/react";

const AuthContext = createContext({
  session: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
      setLoading(false);
    };
    fetchSession();
  }, []);

  const logout = async () => {
    signOut({ redirect: false });
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
