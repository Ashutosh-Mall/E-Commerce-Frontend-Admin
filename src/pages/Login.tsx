import React, {useState} from "react";
import Button from "../component/ui/Button";
import Input from "../component/ui/Input";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export interface loginTypes {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth()!;
  const [show, setShow] = useState<boolean>(true);
  const [formData, setFormData] = useState<loginTypes>({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const response = await login(formData);

    if (response?.success) {
      navigate("/dashboard");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;
    setFormData((prev) => {
      return {...prev, [name]: value};
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-600">
          Welcome Back
        </h1>
        <div className="flex flex-col gap-4">
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <Input
              placeholder="Email"
              name="email"
              size="md"
              theme="light"
              type="text"
              className="w-full"
              onChange={handleChange}
              required
            />

            <Input
              placeholder="Password"
              name="password"
              size="md"
              theme="light"
              type={show ? "password" : "text"}
              className="w-full"
              onChange={handleChange}
              required
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="cursor-pointer"
                >
                  {show ? (
                    <FaEye className="text-purple-600" />
                  ) : (
                    <FaEyeSlash className="text-purple-600" />
                  )}
                </button>
              }
            />
            <Button
              text="Log In"
              size="md"
              theme="dark"
              wide={false}
              type="submit"
            />
          </form>
          <p className="text-center text-sm text-gray-600">
            Create new account?{" "}
            <button
              className="text-purple-600 font-medium hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              signup
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
