import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import CreateListing from './pages/CreateListing';
import UserListing from './pages/UserListings';

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
        element: (
                  <ProtectedRoute>
                    <Profile/>
                  </ProtectedRoute>
                )
      },
      {
        path:"/create-listing",
        element:( 
                <ProtectedRoute>
                  <CreateListing/>
                </ProtectedRoute>
              )
      },
      {
        path:"/user-listing",
        element:( 
                <ProtectedRoute>
                  <UserListing/>
                </ProtectedRoute>
              )
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
