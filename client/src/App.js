import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Navbar from './components/Navbar';

const AppLayout=()=>{
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  );
}

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:'/profile',
        element:<Profile/>
      }
    ]
  }
])

const App=()=>{
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
