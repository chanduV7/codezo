import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Register from './components/register';
import AdminLogin from './components/adminLogin';
import DashBoard from './components/dashBoard';


import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import Login from './components/login';

function App() {
   const router = createBrowserRouter([
   
    { 
      path:"/",
      element:<Home/>
    },

    {
      path :"accounts/login",
      element:<div>Login</div>
    },

    {
      path :"accounts/register",
      element:<Register/>
    },

      {
        path:"/admin/login",
        element:<AdminLogin/>
      },
      {
        path: "admin/dashboard",
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