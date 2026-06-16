import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import type { loginTypes } from "../pages/Login";

const API = import.meta.env.VITE_BACKEND_URL;

type User = loginTypes;

type AuthContextType = {
  user: User | null;
  loading: boolean;  
  authLoading: boolean;
  isLogin: boolean;

  login: (userData: loginTypes) => Promise<any>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API}/auth/getme`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsLogin(true);
      } catch (error) {
        console.log(error);
        setUser(null);
        setIsLogin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (userData: loginTypes) => {
    setAuthLoading(true);

    try {
      const response = await axios.post(
        `${API}/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      );

      setUser(response.data.user);
      setIsLogin(true);

      return response.data;
    } catch (error) {
      setUser(null);
      setIsLogin(false);

      console.error("Login Error:", error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);

    try {
      await axios.post(
        `${API}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
      setIsLogin(false);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        isLogin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};