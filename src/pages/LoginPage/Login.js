import React, { useEffect, useState } from "react";
import injurio from "../../assests/logo/injurio_logo.png";
import { useNavigate, Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Swal from "sweetalert2";
import "./login.css";
import Spinner from "../../components/Spinner/Spinner";
import { useAuth0 } from "@auth0/auth0-react";

import "./login.css";

const Login = () => {
  const loginDetails = { email: "", password: "" };
  const [userDetails, setUserDetails] = useState(loginDetails);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("rememberData");

    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      const email = parsedToken.email || "";
      const password = parsedToken.password || "";
      setUserDetails({
        email,
        password,
      });
      setRememberMe(parsedToken.rememberMe || false);
    }
  }, []);
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  let name, value;

  useEffect(() => {
    sessionStorage.clear();
  }, []);
  function handleLoginData(e) {
    name = e.target.name;
    value = e.target.value;

    setUserDetails({ ...userDetails, [name]: value });
  }
  const handleSumbit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/login`,
          userDetails
        );
        setIsLogedIn(true);
        const loginItems = {
          name: response.data.userDetails.name,
          isLogedIn: true,
        };

        const rememberData = {
          name: response.data.userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
          rememberMe: rememberMe,
        };
        sessionStorage.setItem("loginItems", JSON.stringify(loginItems));
        if (rememberMe) {
          localStorage.setItem("rememberData", JSON.stringify(rememberData));
        } else if (!rememberMe) {
          localStorage.removeItem("rememberData");
        }
        if (response) {
          setIsLoading(false);
          Swal.fire({
            position: "center",
            icon: "success",
            showConfirmButton: false,
            title: `${response.data.message}`,
            timer: 1500,
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          showConfirmButton: false,
          title: `${error.response.data.message}`,
          timer: 1500,
        });

        setIsLogedIn(false);
        sessionStorage.setItem("isLogedIn", isLogedIn);
      }
    }, 2000);
  };

  const googleLoginHandler = async () => {
    Swal.fire({
      position: "center",
      icon: "error",
      showConfirmButton: false,
      title:
        "This feature is not available for now kindly login with your id and password",
      timer: 2000,
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center py-8 my-5 w-[90vw] lg:w-[40vw] mx-auto bg-slate-100 rounded-lg">
          <div className="w-full py-2">
            <div className="login-form-container px-8 md:mt-0">
              <div className="page-title flex justify-center items-center gap-2 md:gap-3 lg:justify-start">
                <div className="w-48 h-20 rounded-lg bg-[#32324b]">
                  <img
                    src={injurio}
                    alt=""
                    className="h-[100%] w-[90%] mx-auto py-1"
                  />
                </div>
              </div>
              <div className="page-heading flex flex-col items-center gap-5 mt-4 md:mt-4 md:items-start">
                <h1 className=" text-xl lg:text-3xl  font-[700] text-[#414A53] font-publicSans">
                  Login
                </h1>
                <p className="style-[Public Sans] text-[#21262C]  text-sm lg:text-lg text-center md:text-start font-publicSans">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
              </div>
              <form method="POST" onSubmit={handleSumbit} className="mt-10">
                <div className="flex flex-col my-5">
                  <label
                    htmlFor="email"
                    className="font-[500] text-[#85909B] text-base py-2 font-publicSans"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 rounded-lg text-base md:text-xl focus:outline-none md:py-3 md:px-4"
                    placeholder="Enter your email"
                    value={userDetails.email}
                    onChange={handleLoginData}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="flex flex-col my-5">
                  <div className="flex justify-between py-2">
                    <label
                      htmlFor="password"
                      className="font-[500] text-[#85909B] text-base font-publicSans"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-[#377EF9] font-publicSans cursor-pointer"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className=" md:px-2 flex  items-center w-[100%] bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] rounded-lg">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="mt-1  py-3 px-2 md:w-full  w-[90%] bg-[#F7F8FB] focus:outline-none  text-base md:text-xl"
                      placeholder="Enter your password"
                      value={userDetails.password}
                      onChange={handleLoginData}
                      autoComplete="off"
                      required
                    />
                    <div
                      className="cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <BsEyeSlash size={"2rem"} color={"#747D83"} />
                      ) : (
                        <BsEye size={"2rem"} color={"#747D83"} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-5 justify-between items-center my-5 md:flex-row">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="remember-me"
                      name="lsRememberMe"
                      checked={rememberMe}
                      className="w-[1.7rem] h-[1.7rem] accent-[#32324b] cursor-pointer  focus:ring-0 focus:ring-offset-0 focus:outline-none"
                      onClick={() => setRememberMe(!rememberMe)}
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-[#85909B] font-publicSans"
                    >
                      Remember me
                    </label>
                  </div>

                  <Link to={"/signup"} className="flex gap-2 items-center">
                    <span className="pt-1">New User ?</span>
                    <span className="text-green-600 text-[1.2rem] fw-bolder h-7 hover:text-green-900 hover:border-b-2 hover:border-b-yellow-700 hover:cursor-pointer">
                      Sign Up
                    </span>
                  </Link>
                </div>
                <div className="mt-3 w-full flex flex-col  justify-center gap-2 items-center">
                  <button
                    type="submit"
                    className="py-4 w-full px-8 text-white bg-[#32324b] rounded-lg text-[1rem] font-[500] md:py-4 md:px-5 font-publicSans"
                    variant="gradient"
                  >
                    Login Now!
                  </button>
                  <span>OR</span>
                </div>
              </form>
              <div className="w-full" onClick={googleLoginHandler}>
                <button
                  type=""
                  className="flex items-center text-2xl justify-center gap-3 py-4 mt-2 w-full px-8 text-white bg-red-600 rounded-lg text-[1rem] font-[500] md:py-4 md:px-5 font-publicSans"
                  variant="gradient"
                >
                  <FcGoogle />
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
