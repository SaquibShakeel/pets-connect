import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/auth/signin`;
      const response = await axios.post(url, {
        email,
        password,
      });
      //save token to local storage
      localStorage.setItem("token", response.data.token);
      //redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh]">
      <div className="rounded-md bg-tertiary border border-gray-100">
        <h1 className="p-5 text-center">Sign In</h1>
        <form className="flex flex-col p-5">
          <input
            type="email"
            className="mb-2 px-5 py-2 rounded border-none outline-none focus:outline-none bg-black-100"
            value={email}
            onChange={emailHandler}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="mb-2 px-5 py-2 rounded border-none outline-none focus:outline-none bg-black-100"
            value={password}
            onChange={passwordHandler}
            placeholder="Password"
            required
          />
          <button
            onClick={submitHandler}
            className="bg-blue-500 text-white px-5 py-2 rounded border-none outline-none focus:outline-none"
          >
            Sign In
          </button>
        </form>
        <p className="text-center pb-2 px-5 text-sm">
          <Link to="/api/auth/signup">Create new account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
