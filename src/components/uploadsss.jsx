import React, { useState } from "react";
import Axios from "axios";
import { Progress } from "reactstrap";

const Upload = () => {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showProgressBar, setProgressBarVisibility] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setProgressBarVisibility(true);
    const demo = document.getElementById("demo");
    const bodyFormData = new FormData(demo);
    Axios({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      data: bodyFormData,
      baseURL: "http://localhost:3001/upload",
      onUploadProgress: (Progress) => {
        const { total, loaded } = Progress;
        const totalSizeInMB = total / 1000000;
        const loadedSizeInMB = loaded / 1000000;
        const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
        setUploadPercentage(Number(uploadPercentage.toFixed(2)));
        console.log("total size in MB ==> ", totalSizeInMB);
        console.log("uploaded size in MB ==> ", loadedSizeInMB);
      },
    });
  };

  const handleFormClick = () => {
    setProgressBarVisibility(false);
    setUploadPercentage(0);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-50">
      <form
        onSubmit={(e) => onSubmit(e)}
        id="demo"
        className="flex flex-col bg-white w-[400px] h-auto gap-6 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl text-center">Upload</h1>
        <label htmlFor="videoTitle" className="text-xl font-extralight">
          Video Title
        </label>
        <input
          type="text"
          name="videotitle"
          className="border-2 p-3 rounded-lg"
          required
        />
        <label htmlFor="tambnail" className="text-xl font-extralight">
          The Tambnail
        </label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          id="avatar"
          className="border-2 p-3 rounded-lg"
          required
        />
        <label htmlFor="video" className="text-xl font-extralight">
          Video
        </label>
        <input
          type="file"
          name="video"
          id="avatar"
          className="border-2 p-3 rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-green-500 p-3 text-white font-extralight rounded-sm"
        >
          Submit
        </button>
      </form>
      {showProgressBar ? (
        <>
          <div className="text-center">
            {uploadPercentage !== 100
              ? `Upload percentage - ${uploadPercentage}`
              : "File successfully uploaded"}
          </div>
          <Progress
            animated={uploadPercentage !== 100}
            color="success"
            value={uploadPercentage}
          />
        </>
      ) : null}
    </div>
  );
};

export default Upload;
