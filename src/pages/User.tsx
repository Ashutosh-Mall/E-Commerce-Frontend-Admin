import { useEffect } from "react";
import { useUser } from "../context/UserContext";

const User = () => {
  const { allUsers, getAllUsers, loading } = useUser();

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-5 text-center">
        <h2>Loading users...</h2>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">All Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3">#</th>
              <th className="border p-3">Username</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Created At</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{user.userName}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        user.role === "admin"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="border p-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;