import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import Form from "react-bootstrap/Form";
import PostCard from "./components/PostCard";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./screens/sign-up/components/Login";
import Dashboard from "./screens/sign-up/components/dash";
import SignUp from "./screens/sign-up/components/SignUp";
import CreatePost from "./components/CreatePost/createPost";
import Directory from "./screens/directory/components/Directory";
import { User } from "./components/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = () => toast("Wow so easy !");

  const navigate = useNavigate();

  // load in local user from local storage and load into user type (if not null)
  let defaultUser = null;
  try {
    defaultUser =
      (JSON.parse(localStorage.getItem("user") || "") as User) || null;
  } catch (e) {}

  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    console.log({ user });
    if (user == null) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />{" "}
      <header />
      <Routes>
        <Route path="/login" element={<Login updateGlobalUser={setUser} />} />
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/directory" element={<Directory />} />
        <Route
          path="/sign-up"
          element={<SignUp updateGlobalUser={setUser} />}
        />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
