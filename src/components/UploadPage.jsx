import React, { useState } from "react";
import axios from "axios"; // for sending files to the server
import { HiOutlineCloudUpload } from "react-icons/hi"; // for the upload icon
import { AiOutlineClose } from "react-icons/ai"; // for the close icon
import { toast } from "react-toastify"; // for showing notifications
import "react-toastify/dist/ReactToastify.css"; // import toastify css
import "tailwindcss/tailwind.css"; // import tailwind css

const UploadPage = () => {
  const [title, setTitle] = useState(""); // state for storing the title input
  const [thumbnail, setThumbnail] = useState(null); // state for storing the thumbnail file
  const [video, setVideo] = useState(null); // state for storing the video file
  const [preview, setPreview] = useState(null); // state for storing the thumbnail preview url
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showProgressBar, setProgressBarVisibility] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // update the title state when the input changes
  };

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

  const handleVideoChange = (e) => {
    const file = e.target.files[0]; // get the file from the input
    if (file && file.type.startsWith("video/")) {
      // check if the file is a video
      setVideo(file); // update the video state
    } else {
      toast.error("Please select a video file for the content"); // show an error message
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null); // reset the thumbnail state
    setPreview(null); // reset the preview state
  };

  const handleRemoveVideo = () => {
    setVideo(null); // reset the video state
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the default form submission
    if (title && thumbnail && video) {
      setProgressBarVisibility(true);
      const formData = new FormData(demo);
      formData.append("title", title); // append the title to the form data
      formData.append("thumbnail", thumbnail); // append the thumbnail file to the form data
      formData.append("video", video); // append the video file to the form data
      axios({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        data: formData,
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
    } else {
      toast.error("Please fill all the fields"); // show an error message
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Upload Your Content
      </h1>
      <form
        id="demo"
        className="w-96 bg-white shadow-lg rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a catchy title"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Thumbnail <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-center w-full">
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
            ) : (
              <label
                htmlFor="thumbnail"
                className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
              >
                <HiOutlineCloudUpload size={40} />
                <span className="mt-2 text-base leading-normal">
                  Select a thumbnail
                </span>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  onChange={handleThumbnailChange}
                  hidden
                />
              </label>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="video"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Video <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-center w-full">
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
            ) : (
              <label
                htmlFor="video"
                className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
              >
                <HiOutlineCloudUpload size={40} />
                <span className="mt-2 text-base leading-normal">
                  Select a video
                </span>
                <input
                  type="file"
                  id="video"
                  name="video"
                  onChange={handleVideoChange}
                  hidden
                />
              </label>
            )}
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
          >
            Upload
          </button>
        </div>
      </form>
      {/* Initialize the toast container */}
      {/* <toast.Container
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
      /> */}
    </div>
  );
};

export default UploadPage;
