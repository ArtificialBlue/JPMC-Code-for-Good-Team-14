import { validate } from "json-schema";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap/lib/Tab";
import { useNavigate } from "react-router";
import NavBar from "../../../components/NavBar/NavBar";
import { addNewPoints } from "../../../utils/points";

const SignUp = ({ updateGlobalUser }: { updateGlobalUser: Function }) => {
  const [data, setData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    type: "",
    email: "",
  });

  const [error, setError] = useState("");

  const onFormChange = (e: any) => {
    e.preventDefault();
    console.log({
      ...data,
      [e.target.id]: e.target.value,
    });
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const submitForm = async (e: any) => {
    e.preventDefault();

    // create new user
    const response = await fetch(`http://localhost:8000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const updatedData = await response.json();
    console.log({ response });
    if (response.status === 201) {
      console.log("POST SUCCESS");
      setError("");
      localStorage.setItem("user", JSON.stringify(updatedData));
      updateGlobalUser(updatedData);
      addNewPoints(10);
      navigate("/");
    }
  };

  const handleExit = () => {
    navigate("/login");
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          justifyContent: "center",
          alignItems: "center",
          "backgroundImage": "linear-gradient(to top, #48C6EF 0%, #6F86D6 100%)"
        }}
      >
        <div className="border p-5 rounded bg-white opacity-70" style={{ width: "500px" }}>
          <Form onChange={onFormChange} onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select aria-label="category">
                <option>Select Type</option>
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="secondary"
              style={{ marginLeft: "10px" }}
              type="reset"
              onClick={handleExit}
            >
              Exit
            </Button>
            <p>{error}</p>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
