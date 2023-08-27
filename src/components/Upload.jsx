import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Progress } from "reactstrap";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showProgressBar, setProgressBarVisibility] = useState(false);
  const [thumbnail, setThumbnail] = useState(null); // state for storing the thumbnail file
  const [preview, setPreview] = useState(null); // state for storing the thumbnail preview url
  const [video, setVideo] = useState(null); // state for storing the video file
  const [userid, setUserid] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("https://ethioedu.onrender.com/dashboard")
      .then((res) => {
        if (res.data.status === "OK") {
          console.log("ss", res.data);
          setUserid(res.data.userid);
        } else {
          console.log(res);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]; // get the file from the input
    if (file && file.type.startsWith("image/")) {
      // check if the file is an image
      setThumbnail(file); // update the thumbnail state
      setPreview(URL.createObjectURL(file)); // create a preview url for the image
    } else {
      toast.error("Please select an image file for the thumbnail"); // show an error message
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null); // reset the thumbnail state
    setPreview(null); // reset the preview state
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0]; // get the file from the input
    if (file && file.type.startsWith("video/")) {
      // check if the file is a video
      setVideo(file); // update the video state
    } else {
      toast.error("Please select a video file for the content"); // show an error message
    }
  };
  const handleRemoveVideo = () => {
    setVideo(null); // reset the video state
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setProgressBarVisibility(true);
    const demo = document.getElementById("demo");
    const bodyFormData = new FormData(demo);
    bodyFormData.append("userid", userid);
    Axios({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      data: bodyFormData,
      baseURL: "https://ethioedu.onrender.com/upload",
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
        className="flex flex-col bg-white w-[500px] h-auto gap-6 p-6 rounded-lg shadow-lg"
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
        {thumbnail ? (
          <div className="relative">
            <img
              src={preview}
              alt="Thumbnail preview"
              className="w-full h-48 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={handleRemoveThumbnail}
              className="absolute top-0 right-0 p-1 bg-white rounded-full text-gray-700 hover:text-red-500 focus:outline-none focus:ring"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
        ) : null}
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          id="avatar"
          className="border-2 p-3 rounded-lg"
          required
          onChange={handleThumbnailChange}
        />
        <label htmlFor="video" className="text-xl font-extralight">
          Video
        </label>
        {video ? (
          <div className="relative">
            <video
              src={URL.createObjectURL(video)}
              controls
              className="w-full h-48 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={handleRemoveVideo}
              className="absolute top-0 right-0 p-1 bg-white rounded-full text-gray-700 hover:text-red-500 focus:outline-none focus:ring"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
        ) : null}
        <input
          type="file"
          name="video"
          id="avatar"
          className="border-2 p-3 rounded-lg"
          required
          onChange={handleVideoChange}
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
