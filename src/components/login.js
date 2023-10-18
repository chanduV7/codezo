import { FormGroup, Label, Input, Button } from "reactstrap";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/register.css";
import { useEffect, useState } from "react";
export default function Login() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    console.log(dispatch(Login(formData)));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
        navigate("/");
    }
  })
  return (
    <div className="register-container">
      <div className="imagediv">
        <img src="https://codezo.s3.amazonaws.com/static/img/login-page1.jpg" />
      </div>
      <div className="formDiv">
        <Form className=" border border-2 p-3" onSubmit={handleClick}>
          <FormGroup>
            <Label for="exampleEmail" className="h4">
              Login Form
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email Address"
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormGroup>

      
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </FormGroup>


          
          <FormGroup className="text-center">
            <Button className="bg-success" onClick={handleClick}>
              Register
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
