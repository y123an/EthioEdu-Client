import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineVideoCameraAdd, AiOutlineSearch } from "react-icons/ai";
import { MdApps, MdNotifications } from "react-icons/md";
import axios from "axios";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuHandler,
  MenuList,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  Bars2Icon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const profileMenuItems = [
  {
    label: "My Videos",
    icon: UserCircleIcon,
    path: "myvideos",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu({ username }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center justify-center gap-1 bg-gray-300 rounded-full p-1"
        >
          <h1 className="text-center text-md">{username[0]}</h1>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="w-[10%] h-[25%]">
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Link to="/myvideos" key={label}>
              <MenuItem
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-9 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="2xl"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}

const Navbar = ({ handleChange }) => {
  const [suc, setSuc] = useState("");
  const [username, setUsername] = useState("");
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://ethioedu.onrender.com/dashboard")
      .then((res) => {
        if (res.data.status === "OK") {
          setSuc("success");
          // console.log("ss", res.data.username);
          setUsername(res.data.username);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav className="flex justify-between px-9 items-center bg-slate-100 sticky top-0 z-30 p-4">
      <div className="text-2xl font-extralight">EthioEdu</div>
      <div className="flex items-center bg-white pr-4 rounded-2xl ">
        <input
          type="text"
          name="search"
          placeholder="search"
          className="px-4 py-2 w-[500px] font-extralight text-md h-[40px] rounded-2xl border-r-0"
        />
        <AiOutlineSearch size={24} />
      </div>

      {suc !== "success" ? (
        <div className="space-x-9">
          <Link
            to="/login"
            className="bg-blue-600 px-6 py-3  text-white font-thin rounded-lg hover:bg-blue-800"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-green-600 px-6 py-3 text-white font-thin rounded-lg hover:bg-green-800"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex gap-7 justify-center items-center">
            <Link to="/upload">
              <AiOutlineVideoCameraAdd size={28} />
            </Link>
            <Link>
              <MdNotifications size={28} />
            </Link>
            <div className="mt-[-20px]">
              <IconButton
                size="sm"
                color="blue-gray"
                variant="text"
                onClick={toggleIsNavOpen}
                className=""
              ></IconButton>
              <ProfileMenu username={username} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
