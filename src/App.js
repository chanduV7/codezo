import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Register from './components/register';
import AdminLogin from './components/adminLogin';
import DashBoard from './components/dashBoard';


import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import Login from './components/login';
import BuildProfile from './components/buildProfile';
import ProfileForm from './components/profileForm';

function App() {
   const router = createBrowserRouter([
   
    { 
      path:"/home",
      element:<Home/>
    },
    { 
      path:"/profile=/:userId",
      element:<BuildProfile/>,
      // children : [
      //   {
      //     path : "/editDetails",
      //     element : <ProfileForm/>
      //   }
      // ]
    },
   
    {
      path :"/accounts/login",
      element:<Login/>
    },

    {
      path :"/accounts/register",
      element:<Register/>
    },

      {
        path:"/admin/login",
        element:<AdminLogin/>
      },
      {
        path: "/admin/dashboard",
        element: <DashBoard/>
      }
   ])
  return (
    <div className="App">
             <RouterProvider router={router}/>
    </div>
  );
}

export default App;