import React, { useEffect, useState } from "react";
import injurio_logo from "../../assests/logo/injurio_logo.png";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import "./navbar.css";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

export function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    const storedLoginItems = JSON.parse(sessionStorage.getItem("loginItems"));
    const storedToken = JSON.parse(localStorage.getItem("rememberData"));
    if (storedLoginItems || storedToken) {
      const userName = storedLoginItems
        ? storedLoginItems.name
        : storedToken.name;
      setUserName(userName);

      if (storedLoginItems && storedLoginItems.isLogedIn === true) {
        setIsLogin(true);
      } else {
        setIsLogin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logout();
        sessionStorage.removeItem("loginItems");
        localStorage.removeItem("rememberData");
        if (!isAuthenticated) {
          navigate("/login");
        }
        console.log(isAuthenticated);
      }
    });
  };

  const toggleProfileDropdown = () => {
    setIsOpenProfile((prev) => !prev);
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="text-white mb-4 mt-2  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center  lg:gap-6">
      <Typography
        as="li"
        variant="small"
        className=" p-1 font-normal h-8 hover:border-b-2 hover:border-b-lime-200 hover:transform hover:translate-y-0"
      >
        <Link to="/" className="flex items-center text-xl">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className=" p-1 font-normal h-8 hover:border-b-2 hover:border-b-lime-200"
      >
        <Link
          to={isLogin ? "/data" : "/login"}
          className="flex items-center text-xl"
        >
          Data
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className=" p-1 font-normal h-8 hover:border-b-2 hover:border-b-lime-200"
      >
        <Link to="/contact" className="flex items-center text-xl">
          Contact
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto py-2 px-4 lg:px-10 lg:py-0  border-0 nav-bg sticky top-0">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography className="mr-4 cursor-pointer py-1.5 font-medium w-[3rem]">
          <div className=" h-13 w-40 ">
            <Link to={"/"}>
              <img
                src={injurio_logo}
                alt="injurio logo"
                className="h-[100%] w-[100%]"
              />
            </Link>
          </div>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        {isLogin ? (
          <span
            className="cursor-pointer hidden lg:block group me-16 bg-white rounded-md p-2 text-black"
            onClick={toggleProfileDropdown}
          >
            Hi, {userName}!
          </span>
        ) : (
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block bg-red-600 hover:bg-red-900 hover:scale-125 duration-200 rounded-lg  place-items-center"
          >
            <Link to={"/login"}>Login/SignUp</Link>
          </Button>
        )}
        {isOpenProfile && isLogin && (
          <div className="user-profile-dropdown  flex  flex-col items-center absolute top-[11rem] md:top-[4.5rem] right-[25%] md:right-[1%]  lg:right-[8%] xl:right-[4%] 2xl:right-[5%] w-[10rem] rounded-md bg-white border border-gray-200 group-hover:block">
            <ul className="menu-items flex flex-col gap-2 w-full py-1 text-center cursor-pointer ">
              <li
                className="menu-item p-2 hover:bg-blue-300 text-black"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}

        <IconButton
          variant="text"
          className=" mb-5 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          {isLogin ? (
            <Button className="bg-white px-4 py-2 text-center text-black">Logout</Button>
          ) : (
            <Button
              variant="gradient"
              size="sm"
              className="mb-2 bg-red-600 w-25"
            >
              <Link to={"/login"}>Login/SignUp</Link>
            </Button>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
