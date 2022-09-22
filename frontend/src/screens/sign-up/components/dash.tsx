import React, { useEffect, useState } from "react";
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AddButton from "../../../components/AddButton/AddButton";
import SearchBar from "../../../components/SearchBar/SearchBar";
import PostCard from "../../../components/PostCard";
import SlideShow from "../../../components/Carousel/Carousel";
import { User, Content } from "../../../components/types";
import { getUserByUserId } from "../../../utils/points";
import { Button } from "react-bootstrap";
import NavBarLogOut from "../../../components/NavBar/NavBarLogOut";
import { GrFormRefresh } from "react-icons/gr";

function Dashboard({ user }: { user: User | null }) {
  const [points, setPoints] = React.useState(0);
  const [contents, setContents] = useState<Content[]>([]);

  const getContents = async () => {
    const response = await fetch("http://localhost:8000/content");
    const data = await response.json();
    console.log(data);
    setContents(data as Content[]);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        setPoints((await getUserByUserId(user._id)).points);
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getContents();
  }, []);

  return (
    <div
      style={{
        "height": "100%",
        "backgroundSize": "cover",
        "backgroundImage": "linear-gradient(to top, #F3E7E9 0%, #E3EEFF 99%, #E3EEFF 100%)",
            
        
      }}
    >
      <NavBarLogOut />
      <div className="container">
        
        {/* left side - Search, and Events/Posts */}
        <div className="row pt-3 pb-3">
        
          <div className="col-md-6 col-sm-12">
          <h1 className="lead display-5">
            Welcome back, {user?.firstName}!
          </h1>
            <div className="rounded">
              {/* search bar */}
              <div className="container">
                <div className="row mb-3" style={{ color: "white" }}>
                  <div className="col-10 p-0">
                    <SearchBar setContents={setContents} />
                  </div>
                  <div className="col-1">
                    <AddButton />
                  </div>
                  <div className="col-1">
                    <Button
                      className="border"
                      variant="light"
                      onClick={getContents}
                    >
                      <GrFormRefresh size={24} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* cards */}
              <div
                className="row"
                style={{
                  color: "black",
                  height: "70vh",
                  overflow: "scroll",
                }}
              >
                <div className="container">
                  {contents.map((content) => (
                    <PostCard content={content} />
                  ))}
                </div>

                {/* cards*/}
                <div
                  className="row rounded"
                  style={{
                    height: "50vh",
                    overflow: "scroll",
                  }}
                >

                </div>
              </div>
            </div>
          </div>

          {/* right side - USER INFO*/}
          <div className="col">
            <div
              className="container rounded"
              style={{
                backgroundColor: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
              }}
            >
              <div className="row pb-2 pt-2">
                {/* user profile picture */}
                <div className="col-5 text-center">
                  <img
                    src="https://freesvg.org/img/abstract-user-flat-4.png"
                    width={130}
                    height={130}
                    alt="user profile"
                  ></img>
                </div>
                <div
                  className="col display-6  justify-content-center"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Current points: {points}
                </div>
              </div>
            </div>

            {/* Learn Stuff */}
            <div className="container rounded mt-3">
              <div
                className="row rounded pt-3 pb-3 ps-2 pe-2"
                style={{
                  backgroundColor: "white",
                  boxShadow:
                    "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
                }}
              >
                <SlideShow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
