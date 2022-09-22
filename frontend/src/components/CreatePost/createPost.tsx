import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState, useEffect } from "react";
import { addNewPoints } from "../../utils/points";
import { useNavigate } from "react-router";

function CreatePost() {
  const navigate = useNavigate();

  const [isEvent, setIsEvent] = useState(false);

  const [data, setData] = useState({
    title: "",
    body: "",
    author: JSON.parse(localStorage.getItem("user") || "{}").username,
    category: "",
    isEvent: "",
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    location: null,
  });

  const onFormChange = (e: any) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, isEvent }),
    });

    addNewPoints(25);
    navigate("/");
  };

  return (

    <div
      style={{
        height: "100%",
        backgroundImage:
          "linear-gradient(0 to 100 #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)",
        marginTop: "0.05rem"
      }}
    >
      <div className="container">
        <br></br>
        <h1>Create new post</h1>
        <Form onChange={onFormChange}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title of Post or Event" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="body">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Select aria-label="category">
              <option>Select Category</option>
              <option value="Chess">Chess</option>
              <option value="Karate">Karate</option>
              <option value="Football">Football</option>
              <option value="Tutoring">Tutoring</option>
              <option value="Post">Post</option>
              <option value="Social Event">Social Event</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="event-checkbox">
            <div key="default-checkbox" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Event"
                onClick={(e) => setIsEvent(e.currentTarget.checked)}
              />
            </div>
          </Form.Group>

          {isEvent && (
            <>
              <Form.Group className="mb-3" controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="text" placeholder="mm/dd/yyyy" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="text" placeholder="mm/dd/yyyy" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="startTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="text" placeholder="hh:mm Time Zone" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="endTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control type="text" placeholder="hh:mm Time Zone" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="format">
                <Form.Select aria-label="format">
                  <option>Select Event Format</option>
                  <option value="Virtual">Virtual</option>
                  <option value="In Person">In Person</option>
                  <option value="Hybrid">Hybrid</option>
                </Form.Select>
                <Form.Group className="mb-3" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" placeholder="Location or Zoom Link" />
                </Form.Group>
              </Form.Group>
            </>
          )}
          <table>
            <tr>
              <td>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Create
                </Button>
              </td>
              <td>
                <Button variant="secondary" type="reset" onClick={() => navigate("/")}>
                  Exit
                </Button>
              </td>
            </tr>
          </table>
        </Form>
      </div>
    </div>
  );
}

export default CreatePost;
