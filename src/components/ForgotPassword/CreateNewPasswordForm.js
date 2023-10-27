import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import injurio from "../../assests/logo/injurio_logo.png";
import axios from 'axios'
import Swal from 'sweetalert2'
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { Button } from "@material-tailwind/react";


const CreateNewPasswordForm = () => {
    const {id, token} = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isStrongPassword, setIsStrongPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfrmPassword, setShowCnfrmPassword] = useState(false);

    const validatePasswordStrength = (password) => {
        const strongPasswordRegex =
          /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
        setIsStrongPassword(strongPasswordRegex.test(password));
      };

    const userValidate = async ()=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/resetPassword/${id}/${token}`);
            if(response.status === 201){
                Swal.fire("User is valid", "You clicked the button!", "success");

            } else {
                navigate("*");
            }
        } catch (error) {
            console.log(error);
            navigate("*");
        }
    }

    useEffect(()=>{
        userValidate();
    }, [])

    const setValue = (e)=>{
        setPassword(e.target.value);
        validatePasswordStrength(e.target.value);
    }

    const handleConfirmPassword = (e)=>{
        setConfirmPassword(e.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
      const toggleCnfrmPasswordVisibility = () => {
        setShowCnfrmPassword(!showCnfrmPassword);
      };

      const handleUpdatePassword = async(e)=>{
        e.preventDefault();
        if(!password.trim() || !confirmPassword.trim()){
      Swal.fire("Fields are empty?", "Both fields are required", "question");

        } else if (password !== confirmPassword) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Passwords do not match!",
            });
          } else if (!isStrongPassword) {
            Swal.fire({
              icon: "error",
              title: "Weak Password",
              text: "Password must be at least 8 characters long and include letters, special characters and numbers.",
            });
          } else {
            try {
              const response = await axios.post(
                `https://injurio-server.onrender.com/injurio/updatePassword/${id}/${token}`,
                { password: password }
              );
      
              if (response.status === 201) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Password successfully updated",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setMessage(true);
                setPassword("");
                setTimeout(() => {
                  navigate("/login");
                }, 1500);
              }
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Token Expired generete new Link",
                showConfirmButton: false,
                timer: 1500,
              });
      
              setTimeout(() => {
                navigate("*");
              }, 1500);
            }
          }
      } 
  return (
  

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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
          <form method="POST" onSubmit={handleUpdatePassword} className="mt-6">
        {message ? (
          <p className="text-[#31A05D] font-bold text-base font-publicSans">
            Password successfully updated
          </p>
        ) : (
          ""
        )}
        <div className="flex flex-col my-5">
          <div className="flex justify-between py-2">
            <label
              htmlFor="newPassword"
              className="font-[500] text-[#85909B] text-base font-publicSans"
            >
              New Password
            </label>
          </div>
          <div className=" md:px-2 flex  items-center w-[100%] bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] rounded-lg">
            <input
              type={showPassword ? "text" : "password"}
              className=" py-3 px-2 md:w-full  w-[90%] bg-[#F7F8FB] focus:outline-none  text-base md:text-xl"
              id="newPassword"
              name="newPassword"
              placeholder="Enter your new password"
              autoComplete="off"
              onChange={setValue}
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
              className=" py-3 px-2 md:w-full  w-[90%] bg-[#F7F8FB] focus:outline-none  text-base md:text-xl"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter your confirm password"
              autoComplete="off"
              onChange={handleConfirmPassword}
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
        </div>
        <div className="flex flex-col gap-5 justify-end mt-16  md:flex-row md:mt-10">
          <Button
            type="submit"
            variant="gradient"
            className={`py-4 px-8 text-white ${
              isStrongPassword ? "bg-gray-700" : " bg-red-700"
            } rounded-lg text-[1rem] lg:text-[1.2rem] font-[500] md:py-3 md:px-10 font-publicSans`}
          >
            Save
          </Button>
        </div>
      </form>
         
        </div>
      </div>
    </div>
  )
}

export default CreateNewPasswordForm