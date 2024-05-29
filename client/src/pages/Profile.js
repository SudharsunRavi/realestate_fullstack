import { useSelector } from "react-redux"

const Profile = () => {

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-10">Profile</h1>

      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile" className="rounded-full w-20 h-20 object-cover cursor-pointer self-center"/>
        <input
          type="username"
          placeholder="Username"
          className="border rounded-lg px-3 py-2 focus:outline-none self-center mt-3"
          id="username"
          autoComplete="off"
        />

        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg px-3 py-2 focus:outline-none self-center mt-3"
          id="email"
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg px-3 py-2 focus:outline-none self-center mt-3"
          id="password"
          autoComplete="off"
        />

        <button className='bg-slate-700 text-white rounded-lg px-3 py-2 uppercase hover:opacity-95 disabled:opacity-80 w-52 self-center mt-3'>Update</button>
      </form>

      <div className='flex flex-col justify-center items-center mt-5'>
        <span className='text-red-700 cursor-pointer hover:underline'>
          Delete account
        </span>

        <span className='text-red-700 cursor-pointer hover:underline mt-3'>
          Sign out
        </span>
      </div>

    </div>
  )
}

export default Profile