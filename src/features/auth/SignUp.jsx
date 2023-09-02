import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [contact, setContact] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            if(password !== confirmPassword) setErrMsg("Passwords do not match");
            else{
              const url = `${import.meta.env.VITE_BASE_URL}/api/auth/signup`;
              const response = await axios.post(url, {
                name,
                email,
                password,
                contact,
              });
              navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }      
    }

    const nameHandler = (e) => setName(e.target.value);
    const emailHandler = (e) => setEmail(e.target.value);
    const passwordHandler = (e) => {
      setPassword(e.target.value);
      setErrMsg("");
    };
    const confirmPasswordHandler = (e) => {
      setConfirmPassword(e.target.value);
      setErrMsg("");
    }
    const contactHandler = (e) => setContact(e.target.value);
    

    return (
      <div className="flex flex-col justify-center items-center min-h-[75vh]">
      <div className="rounded-md bg-tertiary border border-gray-100">
          <h1 className="p-5 text-center">Sign Up</h1>
          <form className="flex flex-col p-5" onSubmit={submitHandler}>
            <input
              type="text"
              className="mb-2 px-5 py-2 rounded border-none outline-none focus:outline-none bg-black-100"
              value={name}
              onChange={nameHandler}
              placeholder="Name"
              required
            />
            <input
              type="email"
              className="mb-2 px-5 py-2 rounded border-none outline-none focus:outline-none bg-black-100"
              value={email}
              onChange={emailHandler}
              placeholder="Email"
              required
            />
            <input
              type="text"
              className="mb-2 px-5 py-2 rounded border-none outline-none focus:outline-none bg-black-100"
              value={contact}
              onChange={contactHandler}
              placeholder="Contact"
              minLength={10}
              maxLength={10}
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
            <input
              type="password"
              className="mb-2 px-5 py-2 rounded border-none outline-none focus:outline-none bg-black-100"
              value={confirmPassword}
              onChange={confirmPasswordHandler}
              placeholder="Confirm password"
              required
            />
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded border-none outline-none focus:outline-none"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center pb-2 px-5 text-sm text-red-500">{errMsg}</p>
          <p className="text-center pb-2 px-5 text-sm">
            <Link to="/api/auth/signin">Sign in</Link> if you already have an
            account.
          </p>
        </div>
      </div>
    );
}

export default SignUp;