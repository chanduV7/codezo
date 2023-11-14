import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { GoSearch } from "react-icons/go";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  FormText,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
} from "reactstrap";
import "../../styles/admin/dashBoard.scss";
import {
  RegisterUser,
  deleteCompany,
  deleteJob,
  deleteUser,
  getAllCompanies,
  getAllJobs,
  getAllUsers,
  postCompany,
  postData,
} from "../../redux/slices/dataSlice";
import { Link, useNavigate } from "react-router-dom";
export default function DashBoard() {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [open123, setOpen123] = useState({
    open1: true,
    open2: false,
    open3: false,
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [formData1, setFormData1] = useState({});
  const [formData2, setFormData2] = useState({});
  const [compNames, setCompNames] = useState([]);
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const allUsers = useSelector((state) => state.User.value.allUsers);
  const jobData = useSelector((state) => state.User.value.jobData);
  const companyData = useSelector((state) => state.User.value.companyData);

  const toggle = () => {
    setModal(!modal);
    setModal1(false);
    setModal2(false);
  };
  const toggle1 = () => {
    setModal1(!modal1);
    setModal(false);
    setModal2(false);
  };
  const toggle2 = () => {
    setModal2(!modal2);
    setModal1(false);
    setModal(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(formData));
    window.alert("success");
    setModal(false);
    window.location.reload();
  };
  const onHandleClick2 = () => {
    // dispatch(getAllUsers());
    setOpen123({ ...open123, open1: true, open2: false, open3: false });
  };
  const onHandleClick3 = (e) => {
    e.preventDefault();
    dispatch(postData(formData1));
    window.alert("success");
    setModal1(false);
    window.location.reload();
  };
  const onHandleClick4 = () => {
    // dispatch(getAllJobs());
    setOpen123({ ...open123, open1: false, open2: true, open3: false });
  };
  const onHandleClick9 = () => {
    // dispatch(getAllCompanies());
    setOpen123({ ...open123, open1: false, open2: false, open3: true });
  };
  const handleClick5 = () => {
    setOpen(!open);
  };
  const handleClick6 = (e) => {
    e.preventDefault();
    dispatch(postCompany(formData2));
    window.alert("success");
    setModal2(false);
  };
  const handleClick8 = (id) => {
    dispatch(deleteJob({ jobId: id }));
    window.location.reload();
    // setOpen123({ ...open123, open1: false, open2: true, open3: false })
  };
  const handleClick7 = (id) => {
    dispatch(deleteUser({ userId: id }));
    window.location.reload();
  };
  const handleClick10 = (id) => {
    dispatch(deleteCompany({ cid: id }));
    window.location.reload();
  };
  const token = localStorage.getItem("token");
  const access = localStorage.getItem("access");
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCompanies());
    dispatch(getAllJobs());
    if (!token && !access) {
      navigate("/admin/login");
    }
  }, [token, access]);
console.log(compNames);
console.log(formData1);
  useEffect(() => {
    setCompNames(companyData.map((e) => e.company_name + " " + e._id));
  }, [companyData]);
  return (
    <div className="dashboard-container">
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
          <div onClick={handleClick5} className="profile-name">
            <p>{email && email.slice(0, 2).toUpperCase()}</p>
          </div>
        </div>

        <div
         style={{zIndex:"100"}} className={` profile-dropdown ${open ? "display" : "display-none"}`}
        >
          <ul>
            <li onClick={() => navigate("/profile=/:userId")}>My Profile</li>
            <li>Saved Jobs</li>
            <li>Applied Jobs</li>
            <li
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Log Out
            </li>
          </ul>
        </div>
      </div>
      <div className="dashboard-display-part">
        <div className="listings">
          <ol
            style={{ listStyle: "none", lineHeight: "3rem", cursor: "pointer" }}
          >
            <li onClick={onHandleClick2}>Users</li>
            <li onClick={toggle}>Add User</li>
            <li onClick={onHandleClick4}>Jobs</li>
            <li onClick={toggle1}>Add Job</li>
            <li onClick={onHandleClick9}>Company</li>
            <li onClick={toggle2}>Add Company</li>

            <li
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              LogOut
            </li>
          </ol>
        </div>

        {/* display jobs and users and company */}

        <div
          className={open123.open1 ? "display-part" : "display-part-disable"}
        >
          {allUsers &&
            allUsers.map((e) => {
              return (
                <div className="">
                  <Card
                    style={{
                      width: "18rem",
                    }}
                  >
                    <div className="delete">
                      {" "}
                      <button onClick={() => handleClick7(e._id)} type="button">
                        X
                      </button>
                    </div>
                    <CardBody>
                      <CardTitle tag="h5">{e.username}</CardTitle>
                      <CardText>
                        <div>
                          <Label className="h6">Email:</Label>
                          {e.email}
                        </div>
                        <div>
                          <Label className="h6">Access : </Label>
                          {e.access}
                        </div>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
        </div>

        <div
          className={open123.open2 ? "display-part" : "display-part-disable"}
        >
          {jobData &&
            jobData.map((e) => {
              return (
                <div className="">
                  <Card>
                    <div className="delete">
                      {" "}
                      <button onClick={() => handleClick8(e._id)} type="button">
                        X
                      </button>
                    </div>
                    <CardBody>
                      <CardTitle  tag="h5">{e.title}</CardTitle>
                      <CardText>
                        <div>
                          <Label className="h6" style={{ fontWeight: "500" }}>
                            Company Name :
                          </Label>
                          {e.company_name}
                        </div>
                        <div>
                          <Label className="h6">Role</Label>
                          {e.role}
                        </div>
                        <div>
                          <Label className="h6">State :</Label>
                          {e.States}
                        </div>
                        <div>
                          <Label className="h6">Employment Type :</Label>
                          {e.employmenttype}
                        </div>
                        <div>
                          <Label className="h6">Functional Area :</Label>
                          {e.functionalarea}
                        </div>
                        <div>
                          <Label className="h6">Experience : </Label>
                          {e.experience}
                        </div>
                        <div>
                          <Label className="h6">Skills :</Label>
                          {e.skills}
                        </div>
                        <div>
                          <Label className="h6">Openings :</Label>
                          {e.openings}
                        </div>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
        </div>
        <div
          className={open123.open3 ? "display-part" : "display-part-disable"}
        >
          {companyData &&
            companyData.map((e) => {
              return (
                <div>
                  <Card>
                    <div className="delete">
                      {" "}
                      <button
                        onClick={() => handleClick10(e._id)}
                        type="button"
                      >
                        X
                      </button>
                    </div>
                    <CardBody>
                      <CardText>
                        <div>
                          <Label className="h6">Company Name :</Label>
                          {e.company_name}
                        </div>
                       
                        <div>
                          <Label className="h6">Job Postings :</Label>
                          <span>{e.jobs ? e.jobs.length : "0"}</span>
                        </div>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>

      {/* Add User */}
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add User</ModalHeader>
          <ModalBody>
            <Form className="w-100" onSubmit={handleClick} sm={12}>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Email :
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Username :
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="username"
                    placeholder="Username"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={3}>
                  Password :
                </Label>
                <Col sm={9}>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelect" sm={3}>
                  Access :
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    onChange={(e) =>
                      setFormData({ ...formData, access: e.target.value })
                    }
                  >
                    <option>select</option>
                    <option value="editor">Editor</option>
                    <option value="associate">Associate</option>
                    <option value="recruitor">Recruitor</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                >
                  <Button className="bg-success">Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>

      {/* Add  jobs */}
      <div style={{ width: "100%" }}>
        <Modal isOpen={modal1} toggle={toggle1}>
          <ModalHeader toggle={toggle1}>Add Job</ModalHeader>
          <ModalBody>
            <Form className="w-100" onSubmit={onHandleClick3}>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Title :
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="title"
                    placeholder="Title"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, title: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleSelect" sm={3}>
                  Company Name
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    onChange={(q) => setFormData1({ ...formData1, cid : q.target.value.split(" ")[1], company_name: q.target.value.split(" ")[0]})}
                  >
                    <option >select</option>
                    {compNames &&
                      compNames.map((i) => {
                        return (
                          <option value={i}>
                            {i.split(" ")[0]}
                          </option>
                        );
                      })}
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Role
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="role"
                    placeholder="Role"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, role: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Functional Area
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="functionalarea"
                    placeholder="Functional Area"
                    type="text"
                    onChange={(e) =>
                      setFormData1({
                        ...formData1,
                        functionalarea: e.target.value,
                      })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  States/Cities:
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="States/Cities: "
                    placeholder="States/Cities: "
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, States: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Employment Type:
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="Employment Type: "
                    placeholder="Employment Type "
                    type="text"
                    onChange={(e) =>
                      setFormData1({
                        ...formData1,
                        employmenttype: e.target.value,
                      })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Skills :
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="skills"
                    placeholder="Skills"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, skills: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Experience
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name=" Experience"
                    placeholder=" Experience"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, experience: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Openings
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="openings"
                    placeholder="Openings"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, openings: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Salary :
                </Label>
                <Col sm={9}>
                  <Input
                    id="exampleEmail"
                    name="openings"
                    placeholder="Salary"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, salary: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                >
                  <Button type="submit" className="bg-success">
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>

      {/* add company */}

      <div style={{ width: "100%" }}>
        <Modal isOpen={modal2} toggle={toggle2}>
          <ModalHeader toggle={toggle2}>Add Company</ModalHeader>
          <ModalBody>
            <Form className="w-100" onSubmit={handleClick6}>
              <FormGroup row>
                <Label for="CompanyEmail" sm={2}>
                  Email :
                </Label>
                <Col sm={10}>
                  <Input
                    id="companyEmail"
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    onChange={(e) =>
                      setFormData2({ ...formData2, email: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Company Name :
                </Label>
                <Col sm={10}>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Company Name"
                    type="text"
                    onChange={(e) =>
                      setFormData2({
                        ...formData2,
                        company_name: e.target.value,
                      })
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={2}>
                  About :
                </Label>
                <Col sm={10}>
                  <Input
                    id="about name"
                    name="aboutNAme"
                    placeholder="About Company"
                    type="text"
                    onChange={(e) =>
                      setFormData2({ ...formData2, about: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                >
                  <Button className="bg-success">Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
