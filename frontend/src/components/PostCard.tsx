import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addNewPoints } from "../utils/points";
import { fetchComments } from "../utils/comments";
import { Content, Comment } from "./types";

const PostCard = ({ content }: { content: Content }) => {
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    addNewPoints(5);
    setShow(true);
  };

  useEffect(() => {
    async function getComments() {
      setComments((await fetchComments(content._id)) || []);
    }
    getComments();
    console.log(comments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  let details;

  if (content.startTime != null) {
    if (content.location.startsWith("http")) {
      details = (
        <>
          <p>
            {" "}
            From: {content.startDate} {content.startTime}
          </p>
          <p>
            {" "}
            To: {content.endDate} {content.endTime}
          </p>
          <p>
            Location: <a href={content.location}>{content.location}</a>
          </p>
        </>
      );
    } else {
      details = (
        <>
          <p>
            {" "}
            From: {content.startDate} {content.startTime}
          </p>
          <p>
            {" "}
            To: {content.endDate} {content.endTime}
          </p>
          <p>Location: {content.location}</p>
        </>
      );
    }
  }

  let tags;
  if (content.format != null) {
    tags = (
      <Button style={{ marginLeft: "16px" }} variant="warning" size="sm">
        {content.format}
      </Button>
    );
  }

  return (
    <>
      <Card className="mt-3 mb-3" onClick={handleShow}>
        <Card.Body>
          <Card.Title>{content.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {content.body.slice(0, 75) +
              (content.body.length > 75 ? "..." : "")}
          </Card.Subtitle>
          <Card.Text> Posted by {content.author}</Card.Text>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{content.title}</Modal.Title>
          <Button style={{ marginLeft: "16px" }} variant="info" size="sm">
            {content.category}
          </Button>
          {tags}
        </Modal.Header>
        <Modal.Body>
          <p>Posted by: {content.author}</p>
          <p>Description: {content.body}</p>
          {details}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Comments:</h3>
            <Button> New Comment</Button>
          </div>

          {comments.map((comment, index) => (
            <div key={index} className="border rounded p-2 my-3">
              <h4>{comment.body}</h4>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>By: {comment.username}</p>
                <p>{Date.now()}</p>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default PostCard;
