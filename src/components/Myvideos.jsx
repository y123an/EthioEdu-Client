import React, { useEffect, useState } from "react";
import Navbar from "./home/Navbar";
import Content from "./home/Content";
import Axios from "axios";
import Card from "./home/Card";
import { useNavigate } from "react-router-dom";

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Myvideos = () => {
  const [userid, setUserid] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getid = async () => {
    await Axios.get("http://localhost:3001/dashboard")
      .then((res) => {
        if (res.data.status === "OK") {
          console.log("ss", res.data);
          setUserid(res.data.userid);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const getData = async () => {
    const res = await Axios.get(
      `http://localhost:3001/api/videosinfo?userid=${userid}`
    );
    const shuffleData = shuffle(res.data);
    setData(shuffleData);
    console.log(shuffleData);
  };

  useEffect(() => {
    getid();
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="text-xl p-6">My videos</h1>
      <div className="grid grid-cols-4 justify-items-center gap-8">
        <div className="menu fixed top-0 right-7 z-10 w-auto"></div>
        {data.map((item) => {
          return (
            <Card
              key={item._id}
              videoTitle={item.videoTitle}
              videoFileName={item.videoFileName}
              tambnailFileName={item.tambnailFileName}
              userid={item.userid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Myvideos;
