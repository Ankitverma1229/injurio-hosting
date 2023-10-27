import React, { useEffect, useState } from "react";
import "./home.css";
import { NavbarDefault } from "../../components/NavbarComponent/Navbar";
import inuriyImage1 from "../../assests/injurio_home/injuriy1.jpg";
import inuriyImage2 from "../../assests/injurio_home/injuriy2.jpg";
import inuriyImage3 from "../../assests/injurio_home/injuriy3.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const images = [inuriyImage1, inuriyImage2, inuriyImage3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  const imageContainerStyle = {
    display: "flex",
    transform: `translateX(-${
      currentImageIndex * ((images.length * 100) / images.length)
    }%)`,
    transition: "transform 1s linear",
  };

  function nextPageHandler() {
    const storedLoginItems = JSON.parse(sessionStorage.getItem("loginItems"));
    const storedToken = JSON.parse(localStorage.getItem("rememberData"))

    if (storedLoginItems || storedToken) {
      navigate("/add-new-injuriy");
    } else {
      navigate("/login");
    }
  }

  return (
    <div>
      <NavbarDefault  className="z-40"/>

      <div className="mx-3 mt-10 lg:mt-0 h-[50rem] lg:h-[80vh] flex flex-col lg:flex-row gap-3 justify-center items-center">
        <div className="lg:w-[50%] md:ms-5 flex flex-col gap-5 font-publicSans ">
          <h1 className="text-2xl md:text-3xl w-full">
            Your Premier Solution for{" "}
            <span className="text-yellow-700 text-3xl lg:text-4xl hover:cursor-pointer">
              Injury Prevention and Tracking
            </span>{" "}
          </h1>
          <div>
            <button
              className="bg-[#32324b] text-white px-4 py-2 rounded-md hover:scale-90"
              onClick={nextPageHandler}
            >
              Get Started
            </button>
          </div>
          <p className="text-xl">
            At{" "}
            <span className="text-yellow-700 border-b-2 border-b-yellow-700">
              INJURIO,
            </span>{" "}
            we are committed to creating a safer, healthier, and more productive
            workplace. Our cutting-edge injury tracking system is designed to
            help you proactively manage and prevent workplace injuries. With
            powerful tools, real-time insights, and a user-friendly interface,
            we make safety a priority. Join us on the journey to a safer future.
          </p>
        </div>
        <div className="h-[50%] lg:h-[90%] lg:w-[50%] -z-10 mt-5 overflow-hidden rounded-lg md:mx-5 flex gap-10 justify-center items-center">
          <div
            className="h-[100%] w-[100%]  rounded-lg -z-10 "
            style={imageContainerStyle}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="injuriyImage"
                className="h-[100%] min-w-[100%] object-cover rounded-lg "
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
