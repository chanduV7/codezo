import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useMatches, useNavigate } from "react-router-dom";
import { getJob } from "../redux/slices/dataSlice";
import Header from "./header";
import { BsBookmark } from "react-icons/bs";
import "../styles/viewJob.scss";
function ViewJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getJobDetails = useSelector((state) => state.User.value.getJobDetails);
  const params = useMatches();
  useEffect(() => {
    dispatch(getJob({ jobId: params[0].params.jobId }));
  }, []);
  return (
    <div className="job-container">
      <Header />

      <div className="container pt-3">
        <div className="d-flex justify-content-between">
          {/* <div>Home / JobId : {getJobDetails._id.slice(0, 3)}</div> */}
          <div style={{ cursor: "pointer" }}>
            <BsBookmark />{" "}
            <span className="text-decoration-underline">Save Job</span>
          </div>
        </div>
        <div className="h2">{getJobDetails.title}</div>
        <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-evenly">
                <div className="text-success border border-success">HIRING</div>
                <div style={{fontSize: "0.8rem"}} className="text-white bg-secondary rounded-pill d-flex justify-content-center align-items-center">{getJobDetails.openings}</div>
            </div>
            <div className="text-danger border border-danger rounded-pill ps-2 pe-2">SHARE JOB</div>
        </div>
      </div>
    </div>
  );
}

export default ViewJob;
