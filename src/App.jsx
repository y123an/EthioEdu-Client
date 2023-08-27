import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playvideo from "./components/home/Playvideo";
import Home from "./components/home/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Upload from "./components/Upload";
import Myvideos from "./components/Myvideos";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/playvideo/:id" element={<Playvideo />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="/myvideos" element={<Myvideos />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
