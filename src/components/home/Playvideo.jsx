import React from "react";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";

const Playvideo = () => {
  const { id } = useParams();
  return (
    <div className=" flex justify-center items-center h-screen bg-black bg-opacity-50">
      <div>
        <h1 className="text-xl p-4 text-center text-white">{id}</h1>
        <VideoPlayer id={id} />
      </div>
    </div>
  );
};

export default Playvideo;
