import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://ethioedu.onrender.com/login", { email, password })
      .then((res) => {
        if (res.data.status === "OK") {
          if (res.data.role === "user") {
            console.log(res);
            navigate("/");
          } else {
            console.log(res);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-gray-50 flex justify-center items-center h-[100vh] ">
      <div className=" bg-white h-[500px] w-[400px] p-6 flex flex-col gap-5 rounded-lg shadow-lg">
        <h2 className="text-3xl mb-4 font-thin">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 space-x-6">
            <label htmlFor="Email">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md mt-3 w-[300px]"
            />
          </div>
          <div className="mb-4 space-x-6">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-md mt-3 w-[300px]"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 w-[100%] p-2 text-white mt-4"
          >
            Login
          </button>
        </form>
        <p>I dont have Account?</p>
        <Link
          to="/register"
          className="bg-blue-500 w-[350px] text-center  p-2 text-white"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
