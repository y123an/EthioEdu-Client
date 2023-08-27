import React from "react";

const VideoPlayer = ({ id }) => {
  return (
    <div>
      <video
        src={`https://ethioedu.onrender.com/api/play?videoId=${id}`}
        width={1000}
        height="auto"
        controls
        autoPlay
        id="video-player"
      />
    </div>
  );
};

export default VideoPlayer;
