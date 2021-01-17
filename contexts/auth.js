import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from '@lib/firebase';

const AuthContext = createContext({ user: null, userLoading: true });

export const AuthProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthStateChanged((res) => {
      setUser(res);
      setUserLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={[user, userLoading]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
