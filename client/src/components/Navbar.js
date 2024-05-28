import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="bg-slate-200 shadow-md">
        <div className="flex flex-wrap items-center justify-between max-w-[90%] mx-auto py-3">
            <h1 className="font-bold text-xl sm:text-3xl">
                <span className="text-slate-500">Real</span>
                <span className="text-slate-700">Estate</span>
            </h1>

            <form className='flex items-center justify-between bg-slate-100 rounded-lg p-2 sm:p-3 w-32 sm:w-80'>
                <input type="search" placeholder="Search..." className='bg-transparent focus:outline-none' />
                <FaSearch/>
            </form>
            
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline hover:underline'>Home</li>
                </Link>
                
                <Link to='/about'>
                    <li className='hidden sm:inline hover:underline'>About</li>
                </Link>
                
                <Link to='/login'>
                    <li className='hover:underline'>Login</li>
                </Link>
            </ul>

        </div>
    </header>
  )
}

export default Navbar