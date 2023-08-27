import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Avatar } from "@material-tailwind/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function ProfileMenu() {
  return (
    <Button variant="text" color="blue-gray" className="w-30 h-30">
      <img src="./vite.svg" />
    </Button>
  );
}

const Card = ({ userid, videoTitle, videoFileName, tambnailFileName }) => {
  const [data, setData] = useState({});

  const getData = async () => {
    await Axios.get(
      `https://ethioedu.onrender.com/api/userinfo?userid=${userid}`
    ).then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Link to={`/playvideo/${videoFileName}`} className="flex flex-col gap-5">
        <img
          src={`https://ethioedu.onrender.com/api/gettambnail?tambnailName=${tambnailFileName}`}
          alt="img"
          width={400}
          height="auto"
          className="bg-contain rounded-lg shadow-lg"
        />
      </Link>
      <div className="flex gap-4 p-3">
        <ProfileMenu />
        <div>
          <p className="font-light">{videoTitle}</p>
          <p className="font-bold font-sans">{data.username}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
