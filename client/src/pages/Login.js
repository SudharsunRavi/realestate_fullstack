import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/userSlice";
import OAuth from "../components/OAuth";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const currentUser = useSelector((state) => state.user.currentUser);

  const handleData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success !== false) {
        dispatch(login(data));
        navigate("/");
      } else {
        console.error("Login failed:", data.error); 
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-10">Login</h1>

      <form className="flex flex-col gap-5 items-center" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg px-3 py-2 focus:outline-none w-52 sm:w-72"
          id="email"
          onChange={handleData}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg px-3 py-2 focus:outline-none w-52 sm:w-72"
          id="password"
          onChange={handleData}
          autoComplete="off"
        />
        <button className="bg-slate-600 text-white py-2 px-5 rounded-lg hover:bg-slate-700 disabled:opacity-80 w-52 sm:w-72">
          LOGIN
        </button>
        <OAuth/>
      </form>

      <div>
        <p className="text-center mt-5">
          New User?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            <span>Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;