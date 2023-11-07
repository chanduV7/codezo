import { useEffect, useState } from "react"
import "../styles/home.scss"
import { Link, useNavigate } from "react-router-dom";
import {GoSearch} from "react-icons/go";


export default function Home() {
 const token  =  localStorage.getItem("token");
 const email = localStorage.getItem("email");
 const userId = localStorage.getItem("userId");
 const [open, setOpen ] = useState(false)
     const navigate = useNavigate();
     const handleClick = () => {
           setOpen(!open)
     }
    useEffect(() => {
       if(!token){
        navigate("/accounts/login");
        window.location.reload();
       }
    },[token])
    return(
        <div className="home-container container-fluid">
         <div className="line"></div>
           <div className="home-container-header">
                <div>
                    <img className="logo" src ="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"/>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-3 border p-1 searchbar-div">
                   <div>
                    <input
                     className=" border-0 searchbar"
                     placeholder="Search by Designation/KeyWord"/>
                   </div>
                   <div className="h4 pt-1"><GoSearch className=""/></div>
                </div>
                <div>Jobs</div>
                <Link to={"/profile=/" + userId } style={{cursor:"pointer",textDecoration:"none",color:"black"}}>Build My Profile</Link>
                <div className="border rounded-pill p-2 border-success text-success">iFollow</div>
                <div onClick={handleClick} className="profile-name">
                    <p  >{email && email.slice(0,2).toUpperCase()}</p>
                    </div>
           </div>
           <div>
            
           </div>

           <div  className= {` profile-dropdown ${open ? "display": "display-none"}`}>
               <ul>
                <li onClick={ () => navigate("/profile=/:userId")}>My Profile</li>
                <li>Saved Jobs</li>
                <li>Applied Jobs</li>
                <li onClick={() => {
                    localStorage.clear();
                    window.location.reload()
                    }}>Log Out</li>
               
               </ul>
           </div>
        </div>
    )
}