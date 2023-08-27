import React, { useEffect, useState } from "react";
import Axios from "axios";
import Card from "./Card";
import { Sidebar } from "./Sidebar";

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Content = ({ userid }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await Axios.get(
      `https://ethioedu.onrender.com/api/videosinfo?userid=${userid}`
    );
    const shuffleData = shuffle(res.data);
    setData(shuffleData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex justify-center mt-4 ">
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

export default Content;
