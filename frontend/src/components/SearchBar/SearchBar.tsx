import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Content } from "../types";

function SearchBar({ setContents }: { setContents: Function }) {
  const [search, setSearch] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/search/${search}`);
    const data: Content[] = await response.json();
    setContents(data);
  };

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <Form
      className="d-flex"
      onChange={(e: any) => setSearch(e.target.value)}
      onSubmit={handleSubmit}
    >
      <Form.Control type="search" placeholder="Search" aria-label="Search" />
      <Button variant="primary" type="submit" className="ms-2">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBar;
