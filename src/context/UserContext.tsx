import React, {useContext, useState, createContext} from "react";
import axios from "axios";
const API = import.meta.env.VITE_BACKEND_URL;

export type userType = {
  _id: string;
  userName: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};

type UserContextType = {
  allUsers: userType[] | [];
  users: userType | null;
  loading: boolean;
  getAllUsers: () => Promise<void>;
  getOneUser: (id: string) => Promise<void>;
};

type UserProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: UserProviderProps) => {
  const [users, setUser] = useState<userType | null>(null);
  const [allUsers, setAllUsers] = useState<userType[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      console.log(API)
      const response = await axios.get(`${API}/admin/users/all`, {
        withCredentials: true,
      });
      console.log(response.data)
      setAllUsers(response.data.data);
    } catch (error) {
      console.error("Get user Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOneUser = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/admin/users/get/${id}`, {
        withCredentials: true,
      });

      setUser(response.data.data);
    } catch (error) {
      console.error("Get user Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <UserContext.Provider
      value={{allUsers, users, getAllUsers, loading, getOneUser}}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("userContext must be used within UserProvider");
  }

  return context;
};


// {/admin/users/all
//     "success": true,
//     "message": "Users fetched successfully",
//     "data": [
//         {
//             "_id": "6a2cd82b250cf68018ee5eee",
//             "userName": "Ashutosh",
//             "email": "ashutoshpratap791@gmail.com",
//             "isVerified": true,
//             "role": "admin",
//             "createdAt": "2026-06-13T04:10:19.500Z",
//             "updatedAt": "2026-06-13T04:10:19.500Z",
//             "__v": 0
//         },
//         {
//             "_id": "6a2e41fefc172943112ea0a0",
//             "userName": "Harsh",
//             "email": "ashupratap.26@gmail.com",
//             "isVerified": true,
//             "role": "user",
//             "createdAt": "2026-06-14T05:54:06.950Z",
//             "updatedAt": "2026-06-14T05:54:06.950Z",
//             "__v": 0
//         }
//     ]
// }
