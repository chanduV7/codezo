import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
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
  CardText
} from "reactstrap";

import { RegisterUser, getAllJobs, getAllUsers, postData } from "../redux/slices/dataSlice";
import { useNavigate } from "react-router-dom";
export default function DashBoard() {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [onOff, setOnOff] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [formData1, setFormData1] = useState({})
  console.log(formData1);
  const allUsers = useSelector((state) => state.User.value.allUsers);
  const jobData = useSelector((state) => state.User.value.jobData);
  const toggle = () => setModal(!modal);
  const toggle1 = () => {
    setModal1(!modal1)
    setModal(false)
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(formData));
    setModal(false)
  };
  const onHandleClick2 = () => {
    dispatch(getAllUsers());
    setOnOff(true)
  };
  const onHandleClick3 = (e) => {
    e.preventDefault( )
    dispatch(postData(formData1));
    
  }
  const onHandleClick4 = () => {
    dispatch(getAllJobs())
    setOnOff(false)
  }
  const token = localStorage.getItem("token");
  const access = localStorage.getItem("access");
  useEffect(() => {
    dispatch(getAllUsers());
    if(!token && !access){
      navigate("/admin/login");
    
    } 
    
  
  }, [token,access]);

  return (
    <div className="dashboard-container">
      <div className="container d-flex justify-content-between">
        <div style={{ width: "3%" }} className="">
          <img
            className="w-100"
            src="https://codezo.s3.amazonaws.com/static/img/codezo.png"
          />
        </div>
        <div className="h2 text-success">Codezo</div>
        <div>
          <input type="search" />
          <BiSearch />
        </div>
      </div>
      <div className="d-flex w-100">
        <div className="border text-shadow m-3 p-5">
          <ol
            style={{ listStyle: "none", lineHeight: "3rem", cursor: "pointer" }}
          >
            <li onClick={onHandleClick2}>Users</li>
            <li onClick={toggle}>Add User</li>
            <li onClick={onHandleClick4}>Jobs</li>
            <li onClick={toggle1}>Add Job</li>
            <li onClick={()=> {
                              localStorage.clear();
                              window.location.reload()
                              }}>LogOut</li>
          </ol>
        </div>
        {
          onOff ? 
             <div style={{ width: "80%",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem" }} className="">
          {allUsers.length &&
            allUsers.map((e) => {
              return (
                <div className="">
                  <Card
                    className="my-2"
                    style={{
                      width: "18rem",
                    }}
                  >
                   
                    <CardBody>
                      <CardTitle tag="h5">{e.username}</CardTitle>
                      <CardText>
                           <div>
                            <Label>Email:</Label>
                            {e.email}
                            </div>
                            <div>
                              <Label>Access : </Label>
                            { e.access}</div>
                      </CardText>
                    
                    </CardBody>
                  
                  </Card>
                </div>
              );
            })}
        </div>
          :
        <div style={{ width: "80%",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",backgroundColor: "rgb(242,184,198)" }} className="ps-2">
          {jobData.length &&
            jobData.map((e) => {
              return (
                <div className="">
                  <Card
                    className="my-2"
                    style={{
                      width: "18rem",
                    }}
                  >
                   
                    <CardBody>
                      <CardTitle tag="h5">{e.title}</CardTitle>
                      <CardText>
                           <div>
                            <Label className="" style={{fontWeight:"500"}}>Company :</Label>
                            {e.company}
                            </div>
                            <div>
                              <Label>Role</Label>
                            { e.role}</div>
                            <div>
                              <Label>State :</Label>
                            { e.States}</div>
                            <div>
                              <Label>Employment Type :</Label>
                            { e.employmenttype}</div>
                            <div>
                              <Label>Functional Area :</Label>
                            { e.functionalarea}</div>
                            <div>
                              <Label>Experience</Label>
                            { e.experience}</div>
                            <div>
                              <Label>Skills</Label>
                            { e.skills}</div>
                            <div>
                              <Label>Openings</Label>
                            { e.openings}</div>
                      </CardText>
                    
                    </CardBody>
                  
                  </Card>
                </div>
              );
            })}
        </div>
        }
     
      </div>
      <div style={{ width: "100%" }}>
        <Modal  isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add User</ModalHeader>
          <ModalBody>
            <Form className="w-100" onSubmit={handleClick}>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Email
                </Label>
                <Col sm={10}>
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
                <Label for="exampleEmail" sm={2}>
                  Username :
                </Label>
                <Col sm={10}>
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
                <Label for="examplePassword" sm={2}>
                  Password
                </Label>
                <Col sm={10}>
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
                <Label for="exampleSelect" sm={2}>
                  Access
                </Label>
                <Col sm={10}>
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
      <div style={{ width: "100%" }}>
        <Modal isOpen={modal1} toggle={toggle1}>
          <ModalHeader toggle={toggle1}>Add Job</ModalHeader>
          <ModalBody>
            <Form className="w-100" onSubmit={onHandleClick3}>
              
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Title
                </Label>
                <Col sm={10}>
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
                <Label for="exampleEmail" sm={2}>
                  Company Name
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleEmail"
                    name="company"
                    placeholder="Company Name"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, company: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
             
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Role
                </Label>
                <Col sm={10}>
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
                <Label for="exampleEmail" sm={2}>
                Functional Area
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleEmail"
                    name="functionalarea"
                    placeholder="Functional Area"
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, functionalarea: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                States/Cities: 
                </Label>
                <Col sm={10}>
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
                <Label for="exampleEmail" sm={2}>
                Employment Type: 
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleEmail"
                    name="Employment Type: "
                    placeholder="Employment Type "
                    type="text"
                    onChange={(e) =>
                      setFormData1({ ...formData1, employmenttype: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>

              
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
               Skills :
                </Label>
                <Col sm={10}>
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
                <Label for="exampleEmail" sm={2}>
               Experience
                </Label>
                <Col sm={10}>
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
                <Label for="exampleEmail" sm={2}>
               Openings
                </Label>
                <Col sm={10}>
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
              <FormGroup>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                >
                  <Button type="submit" className="bg-success">Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
