import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

const Navbar = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const urlSearchParam = new URLSearchParams(window.location.search);
        urlSearchParam.set('searchTerm', searchTerm);
        const searchQuery = urlSearchParam.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect(()=>{
        const urlSearchParam = new URLSearchParams(window.location.search);
        const searchTermFromURL = urlSearchParam.get('searchTerm');
        if(searchTermFromURL){
            setSearchTerm(searchTermFromURL);
        }
    }, [window.location.search])

  return (
    <header className="bg-slate-200 shadow-md">
        <div className="flex flex-wrap items-center justify-between max-w-[90%] mx-auto py-3">
            <h1 className="font-bold text-xl sm:text-3xl">
                <span className="text-slate-500">Real</span>
                <span className="text-slate-700">Estate</span>
            </h1>

            <form className='flex items-center justify-between bg-slate-100 rounded-lg p-2 sm:p-3 w-32 sm:w-80' onSubmit={handleSearchSubmit}>
                <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
                <button>
                    <FaSearch/>
                </button>
            </form>
            
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline hover:underline'>Home</li>
                </Link>
                
                <Link to='/about'>
                    <li className='hidden sm:inline hover:underline'>About</li>
                </Link>
                
                <Link to={currentUser ? "/profile" : "login"}>
                    {currentUser ? <img src={currentUser.avatar} alt="profile" className='w-6 h-6 rounded-full object-cover'/> : <li className='hover:underline'>Login</li>}
                </Link>
            </ul>

        </div>
    </header>
  )
}

export default Navbar