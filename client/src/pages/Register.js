import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-10">Sign Up</h1>

      <form className="flex flex-col gap-5 items-center">
        <input type="text" placeholder="Username" className="border rounded-lg px-3 py-2 focus:outline-none w-52 sm:w-72" />
        <input type="email" placeholder="Email" className="border rounded-lg px-3 py-2 focus:outline-none w-52 sm:w-72" />
        <input type="password" placeholder="Password" className="border rounded-lg px-3 py-2 focus:outline-none w-52 sm:w-72" />
        <input type="password" placeholder="Confirm Password" className="border rounded-lg px-3 py-2 focus:outline-none w-52 sm:w-72" />
        <button className="bg-slate-600 text-white py-2 px-5 rounded-lg hover:bg-slate-700 disabled:opacity-80">SIGN UP</button>
      </form>

      <div>
        <p className="text-center mt-5">
          Already have an account?  
          <Link to="/login" className="text-blue-500 hover:underline">
            <span>Login</span>
          </Link>
        </p>
      </div>

    </div>
  )
}

export default Register