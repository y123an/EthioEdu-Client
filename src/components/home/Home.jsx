import React, { useState } from "react";
import Content from "./Content";
import Navbar from "./Navbar";

const Home = () => {
  const [sideNavbar, setSideNavebar] = useState(false);
  const handleChange = () => {
    setSideNavebar(!sideNavbar);
  };

  return (
    <>
      <Navbar />
      <Content />
    </>
  );
};

export default Home;
