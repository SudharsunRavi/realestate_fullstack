import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth"

const Register = () => {
  const [formData, setFormData]=useState({})
  const navigate=useNavigate()
  
  const handleData=(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const res=await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })
    const data=await res.json();
    if(data.success!==false){
      navigate('/login')
    }
    //console.log(data)
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-10">Sign Up</h1>

      <form className="flex flex-col gap-5 items-center" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" className="border rounded-lg px-3 py-2 focus:outline-none w-52 sm:w-72" id="username" onChange={handleData} autoComplete="off"/>
        <input type="email" placeholder="Email" className="border rounded-lg px-3 py-2 focus:outline-none w-52 sm:w-72" id="email"onChange={handleData} autoComplete="off"/>
        <input type="password" placeholder="Password" className="border rounded-lg px-3 py-2 focus:outline-none w-52 sm:w-72" id="password" onChange={handleData} autoComplete="off"/>
        <input type="password" placeholder="Confirm Password" className="border rounded-lg px-3 py-2 focus:outline-none w-52 sm:w-72" autoComplete="off"/>
        <button className="bg-slate-600 text-white py-2 px-5 rounded-lg hover:bg-slate-700 disabled:opacity-80 w-52 sm:w-72">SIGN UP</button>
        <OAuth/>
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