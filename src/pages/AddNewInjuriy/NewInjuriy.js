import React, { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { NavbarDefault } from "../../components/NavbarComponent/Navbar";
import humanImage from "../../assests/human_images/human-image.png";
import AddNewInjuryForm from "../../components/AddNewInjuriy/AddNewInjuriyForm.js";

const NewInjury = () => {
  const [showForms, setShowForms] = useState(false);
  const [circles, setCircles] = useState([]);
  const [circleCount, setCircleCount] = useState(1); // Initialize the circle count
  const [showTable, setShowTable] = useState(false);
  const [formDataArray, setFormDataArray] = useState([]);

  // Create a ref to store the image elements
  const frontImageRef = useRef(null);
  const backImageRef = useRef(null);

  const handleFormDataChange = (formData) => {
    // Update the formDataArray with the collected data
    setFormDataArray(formData);
  };

  function createForm(event, imageType) {
    setShowTable(true);
    setShowForms(<AddNewInjuryForm onFormDataChange={handleFormDataChange} />);

    // Get the image's position on the page
    const rect =
      imageType === "front"
        ? frontImageRef.current.getBoundingClientRect()
        : backImageRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCircles([...circles, { x, y, label: circleCount }]);
    setCircleCount(circleCount + 1);
  }

  const storeDataHandler = async (e) => {
    e.preventDefault();
    try {
      const addData = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/injuriyForm`,
        formDataArray
      );

      if(addData){
        Swal.fire({
          position: "center",
          icon: "success",
          showConfirmButton: false,
          title: `${addData.data.message}`,
          timer: 1500,
        });

        setFormDataArray([]);
        setShowForms(false);
        setShowTable(false)
        setCircleCount(1);
        setCircles([])
      }
      console.log("addData:", addData.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        showConfirmButton: false,
        title: `${error.response.data.message}`,
        timer: 1500,
      });
    }

  };

  return (
    <div>
      <NavbarDefault />
      <div className="flex flex-col gap-5">
        <div className="text-center py-5 h-32 inline-flex flex-col gap-2">
          <div>
          <span className="inline-block text-4xl border-b-4 border-b-yellow-700 text-yellow-700">
            Add New Injury 
          </span>
          </div>
          <span className="text-xl text-red-700">(Click on the area of body got injured and fill the form)</span>
        </div>
        <div className="h-[30rem] lg:w-[26%] mx-auto flex gap-10 p-4 justify-center relative">
          <div className="h-[90%] w-full">
            <img
              src={humanImage}
              alt="Illustration of a person"
              className="h-[100%]"
              onClick={(event) => createForm(event, "front")}
              ref={frontImageRef} // Set the ref for the front image
            />
            <p className="text-center text-3xl mt-3 border-b-4 border-b-black">
              Human image
            </p>
          </div>

          {circles.map((circle, index) => (
            <div
              key={index}
              className="absolute flex justify-center items-center p-4 bg-red-500 opacity-70"
              style={{
                left: `${circle.x}px`,
                top: `${circle.y}px`,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
            >
              {circle.label}
            </div>
          ))}
        </div>
        <div>
          <form className="flex md:flex-col flex-col gap-2" onSubmit={storeDataHandler}>
            {showTable ? (
              <div className="md:flex hidden  md:flex-row items-center md:justify-evenly">
                <p className="fw-bolder text-xl text-center w-1/5">Name</p>
                <p className="fw-bolder text-xl text-center w-1/5">Body Part</p>
                <p className="fw-bolder text-xl text-center w-1/5">Date</p>
                <p className="fw-bolder text-xl text-center w-1/5">Time</p>
              </div>
            ) : null}

            {showForms}

            {showTable ? (
              <div className="grid mx-5 md:place-content-end md:me-12">
                <button
                  type="submit"
                  className="bg-red-700 w-full md:px-10 py-2 text-white rounded-md"
                >
                  Register
                </button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewInjury;
