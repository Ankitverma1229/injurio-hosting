import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./addNewInjuriyForm.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Head",
  "Face",
  "Neck",
  "Hand",
  "Chest",
  "Shoulder",
  "Waist",
  "Leg",
  "Foot",
];

const AddNewIjuriyForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    description: "",
  });
  const [bodyParts, setBodyParts] = useState([]);


  props.onFormDataChange(formData);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      bodyParts: bodyParts,
    });
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setBodyParts(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };


  return (
    <div className="flex items-center gap-3 h-30 py-3 mx-5 md:mx-10">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-evenly">
          <div className="flex flex-col gap-2 w-full md:w-1/5">
          <label htmlFor="name" className="md:hidden text-xl">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={
                formData.name === "" ? "Enter injured name" : "hello"
              }
              value={formData.name}
              onChange={handleFormChange}
              className="custom-text w-full text-black rounded-md h-14 focus:outline-none bg-gray-400 px-2"
            />
          </div>

          <FormControl sx={{ m: 1, width: {xs:280, sm:200, lg:250} }}>
          <label htmlFor="bodayPart" className="md:hidden text-xl mb-2">Select Body Parts</label>

            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              name="bodyPart"
              className="custom-text w-full rounded-md h-14 focus:outline-none bg-gray-400 px-2"
              multiple
              value={bodyParts}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={bodyParts.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex flex-col gap-2 w-full md:w-1/5">
          <label htmlFor="date" className="md:hidden text-xl">Date</label>

            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleFormChange}
              className="w-full rounded-md h-14 focus:outline-none bg-gray-400 px-2"
            />
          </div>

          <div className="flex flex-col gap-2 w-full md:w-1/5">
          <label htmlFor="time" className="md:hidden text-xl">Time</label>

            <input
              type="time"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleFormChange}
              className="w-full rounded-md h-14 focus:outline-none bg-gray-400 px-2"
            />
          </div>
        </div>
        <div className="flex flex-col md:mx-6 gap-2 w-full md:w-[97%]">
          <label
            htmlFor="description"
            className="fw-bolder text-xl text-start w-full"
          >
            Injury Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Add description of injury as labeled for ex:
   1.adskjasdhjsdhjaskdhaskdhadasd
   2.asdasjbdajdashdashdashdashdhasd
   3. adjasdojasdjsakdj"
            className="custom-text rounded-md focus:outline-none bg-gray-400 px-2 py-4 h-40 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewIjuriyForm;
