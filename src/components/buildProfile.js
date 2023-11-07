import React, { useEffect } from "react";
import "../styles/buildmyprofile.scss";
import { GoSearch } from "react-icons/go";
import { MdModeEditOutline} from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/home.scss";
import "../styles/buildmyprofile.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/dataSlice";

const BuildProfile = () => {
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const userDetails = useSelector((state) => state.User.value.userDetails);
  console.log(userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser({ userId: userId }));
  }, []);
  return (
    <div className="buldmyprofile-container  ">
      <div className="home-container">
        <div className="line"></div>
        <div className="home-container-header">
          <div>
            <img
              className="logo"
              src="https://res.cloudinary.com/cliqtick/image/upload/v1692600339/icons/logo-techie-_IE_uqk1bc.png"
            />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3 border p-1 searchbar-div">
            <div>
              <input
                className=" border-0 searchbar"
                placeholder="Search by Designation/KeyWord"
              />
            </div>
            <div className="h4 pt-1">
              <GoSearch className="" />
            </div>
          </div>
          <div>Jobs</div>
          <Link
            to={"/profile=/" + userId}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
          >
            Build My Profile
          </Link>
          <div className="border rounded-pill p-2 border-success text-success">
            iFollow
          </div>
          <div className="profile-name">
            <p>{email && email.slice(0, 2).toUpperCase()}</p>
          </div>
        </div>
      </div>
     
      <div className="container profile-container">
        <h2>Profile</h2>
        <div className="profile-pic-container">
           <div className="profile-pic">
            {
              userDetails? <img className="profile-image" src={userDetails.profile_pic} alt="Img"/> :  <p className="h1" >{email && email.slice(0,2).toUpperCase()}</p>
            }
          
            <MdModeEditOutline  className="edit-icon"/> 
           </div>
        </div>
        <div className="profile-div">
          <div className="profile-details">
            <div className="no1">
              <div>
                <label>User Name :</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={`${userDetails.username}`}
                  readOnly
                />
              </div>
            </div>
            <div className="no1">
           
              <div>
                <label>Name :</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={`${userDetails.name? userDetails.name:"N/A"}`}
                  readOnly
                />
              </div>
           
            </div>
            <div className="no1">
          
              <div>
                <label>Email Address :</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={`${userDetails.email}`}
                  readOnly
                />
              </div>
           
            </div>
            <div className="no1">
            
              <div>
                <label>Phone Number</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={`+91${userDetails.mobilenumber}`}
                  readOnly
                />
              </div>
           
            </div>
            <div className="no1">
              <div>
                <label>Date of Birth :</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={`${userDetails.dob? userDetails.dob:"N/A"}`}
                  readOnly
                />
              </div>
            </div>
            <div className="no1">
              <div>
                <label>Gender :</label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder={`${userDetails.gender? userDetails.gender:"N/A"}`}
                  readOnly
                />
              </div>
            </div>
            <div className="no1">
              <div><label>Address :</label></div>
            <textarea readOnly cols={50}>{`${userDetails.gender? userDetails.gender:"N/A"}`}</textarea>
            </div>
          </div>
          <div className="update">
            <Link to={"/profile/edit/" + userId}>    <button type="button">Update Details</button></Link>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildProfile;
