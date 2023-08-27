import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [suc, setSuc] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://ethioedu.onrender.com/dashboard")
      .then((res) => {
        if (res.data.status === "OK") {
          setSuc("success");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>dasboard</div>
      <p>{suc}</p>
    </div>
  );
};

export default Dashboard;
