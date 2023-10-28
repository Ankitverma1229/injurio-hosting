import React, { useState } from "react";
import axios from "axios";
import injurio from "../../assests/logo/injurio_logo.png";
import Spinner from "../Spinner/Spinner";
import Swal from "sweetalert2";
import { Button } from "@material-tailwind/react";

const ForgotForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserEmail(e.target.value);
    setEmailError("");
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendLink = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const trimmedEmail = userEmail.trim();
    if (!trimmedEmail) {
      alert("Please enter your email");
    } else if (!validateEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/forgotPassword`,
          { email: trimmedEmail }
        );
        if (response.status === 200) {
          setIsLoading(false);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }

        setMessage(true);
      } catch (error) {
        setIsLoading(false);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User is not valid!!",
        });
      }
    }
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
                  Forget Password
                </h1>
                <p className="style-[Public Sans] text-[#21262C]  text-sm lg:text-lg text-center md:text-start font-publicSans">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
              </div>
              <form
                method="POST"
                onSubmit={handleSendLink}
                className="mt-5 md:mt-10"
              >
                {message ? (
                  <p className="text-[#31A05D] font-bold text-base font-publicSans">
                    Password reset link send successfully in your email
                  </p>
                ) : (
                  ""
                )}

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
                    className={`bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 rounded-lg text-base md:text-xl focus: outline-none md:py-3 md:px-4 ${
                      emailError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your email"
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                <div className="flex justify-center md:justify-end ">
                  <Button
                    type="submit"
                    className="py-4 px-8 md:mt-5 text-white w-full md:w-1/4 bg-gray-700 rounded-lg text-[1rem] font-[500] md:py-3 lg:px-10 font-publicSans"
                    variant="gradient"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotForm;
