import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { AiOutlinePlus } from "react-icons/ai";
const AddButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="light"
      className="border"
      onClick={() => navigate("/create-post")}
    >
      <AiOutlinePlus size={24} />
    </Button>
  );
};

export default AddButton;
