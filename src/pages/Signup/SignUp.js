import React, { useState } from "react";
import injurio from "../../assests/logo/injurio_logo.png";
import { useNavigate, Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import Swal from "sweetalert2";
import Validation from "../../components/SignUp/Validation";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";

const SignUp = () => {
  const userData = { name: "", email: "", password: "", confirmPassword: "" };
  const [signUpDetails, setSignUpDetails] = useState(userData);
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfrmPassword, setShowCnfrmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    const ValidationErrors = Validation(signUpDetails);
    setErrors(ValidationErrors);
    setIsLoading(true);

    const response = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/register`, signUpDetails)
      .then((response) => {
        setIsLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          showConfirmButton: false,
          title: `${response.data.message}`,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",

          showConfirmButton: false,
          title: `${error.response.data.message}`,
          timer: 1500,
        });
      });
    console.log(response);

    if (Object.keys(ValidationErrors).length > 0) {
      Swal.fire(
        "Validation Error",
        "Please fill all fields correctly",
        "error"
      );
    }
  };

  let name, value;

  function handleInputData(e) {
    name = e.target.name;
    value = e.target.value;
    setSignUpDetails({ ...signUpDetails, [name]: value });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCnfrmPasswordVisibility = () => {
    setShowCnfrmPassword(!showCnfrmPassword);
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
                  SignUp
                </h1>
                <p className="style-[Public Sans] text-[#21262C]  text-sm lg:text-lg text-center md:text-start font-publicSans">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
              </div>
              <form method="POST" onSubmit={handleSumbit} className="mt-5">
                <div className="flex flex-col my-5">
                  <label
                    htmlFor="name"
                    className="font-[500] text-[#85909B] text-base py-2 font-publicSans"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 rounded-lg text-base md:text-xl focus:outline-none md:py-3 md:px-4"
                    placeholder="Enter your Name"
                    onChange={handleInputData}
                    autoComplete="off"
                  />
                  {errors.name && <p className="text-red-600">{errors.name}</p>}
                </div>

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
                    onChange={handleInputData}
                    autoComplete="off"
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col my-5">
                  <div className="flex justify-between py-2">
                    <label
                      htmlFor="password"
                      className="font-[500] text-[#85909B] text-base font-publicSans"
                    >
                      Password
                    </label>
                  </div>
                  <div className=" md:px-2 flex  items-center w-[100%] bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] rounded-lg">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="mt-1  py-3 px-2 md:w-full  w-[90%] bg-[#F7F8FB] focus:outline-none  text-base md:text-xl"
                      placeholder="Enter your password"
                      onChange={handleInputData}
                      autoComplete="off"
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
                  {errors.password && (
                    <p className="text-red-600">{errors.password}</p>
                  )}
                </div>
                <div className="flex flex-col my-5">
                  <div className="flex justify-between py-2">
                    <label
                      htmlFor="confirmPassword"
                      className="font-[500] text-[#85909B] text-base font-publicSans"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className=" md:px-2 flex  items-center w-[100%] bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] rounded-lg">
                    <input
                      type={showCnfrmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className="mt-1  py-3 px-2 md:w-full  w-[90%] bg-[#F7F8FB] focus:outline-none  text-base md:text-xl"
                      placeholder="Enter again your password"
                      onChange={handleInputData}
                      autoComplete="off"
                    />
                    <div
                      className="cursor-pointer"
                      onClick={toggleCnfrmPasswordVisibility}
                    >
                      {showCnfrmPassword ? (
                        <BsEyeSlash size={"2rem"} color={"#747D83"} />
                      ) : (
                        <BsEye size={"2rem"} color={"#747D83"} />
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
                <div className="flex flex-col gap-5 justify-between mt-5 md:flex-row items-center">
                  {/* <Link></Link> */}
                  <Link
                    to={"/login"}
                    className="flex justify-center md:justify-start gap-2 items-center  h-13"
                  >
                    <span className="pt-1">Already have an account ?</span>
                    <span className="text-green-600 text-[1.5rem] fw-bolder h-8 hover:text-green-900 hover:border-b-2 hover:border-b-yellow-700 hover:cursor-pointer">
                      Login
                    </span>
                  </Link>
                  <button
                    type="submit"
                    className="px-8 text-white w-full md:w-1/4 bg-[#32324b] rounded-lg text-[1rem] font-[500] py-4 font-publicSans"
                    variant="gradient"
                  >
                    SignUp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
