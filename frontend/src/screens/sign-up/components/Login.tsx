import { FormEventHandler, MouseEventHandler, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import { addNewPoints } from "../../../utils/points";

function Login({ updateGlobalUser }: { updateGlobalUser: Function }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onUsernameChange = (e: any) => {
    e.preventDefault();
    setUsername(e.target.value);
    console.log({ change: username });
  };

  const submitUsername = async (e: any) => {
    e.preventDefault();
    console.log({ username });
    const response = await fetch(`http://localhost:8000/users/${username}`);
    const data = await response.json();
    console.log("submitUsernameResponse", { data });
    if (response.status === 200) {
      console.log("SUCCESS!");
      setError("");
      localStorage.setItem("user", JSON.stringify(data));
      updateGlobalUser(data);
      addNewPoints(5);
      navigate("/");
    } else {
      setError(data.message);
    }
    console.log({ data });
  };

  const handleSignUp = () => {
    navigate("/sign-up");
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
        <div className="border p-5 rounded bg-white" style={{ width: "500px" }}>
          <Form onSubmit={submitUsername}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={onUsernameChange}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>

            <Button
              variant="primary"
              type="button"
              style={{ marginLeft: "10px" }}
              onClick={() => handleSignUp()}
            >
              Sign Up
            </Button>
            <p>{error}</p>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
