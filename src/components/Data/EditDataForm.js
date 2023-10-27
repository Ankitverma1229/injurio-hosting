import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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

const EditDataForm = (props) => {
  const [bodyParts, setBodyParts] = useState(props.editingValue.bodyParts);
  const [formData, setFormData] = useState({
    name: props.editingValue.name,
    date: props.editingValue.date,
    time: props.editingValue.time,
    description: props.editingValue.description,
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setBodyParts(typeof value === "string" ? value.split(",") : value);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      bodyParts: bodyParts,
    });
  };

  props.onFormDataChange(formData);

  return (
    <div className="flex items-center gap-3 h-30 py-3 w-[80vw] mx-auto">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-4 w-full justify-evenly">
          <div className="flex flex-col gap-2 w-1/5">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleFormChange}
              className="custom-text w-full text-black rounded-md h-14 focus:outline-none bg-gray-400 px-2"
            />
          </div>

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Select body parts
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              name="bodyPart"
              className="w-full rounded-md h-14 focus:outline-none bg-gray-400 px-2"
              multiple
              value={bodyParts}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
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

          <div className="flex flex-col gap-2 w-1/5">
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleFormChange}
              className="w-full rounded-md h-14 focus:outline-none bg-gray-400 px-2"
            />
          </div>

          <div className="flex flex-col gap-2 w-1/5">
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
        <div className="flex flex-col mx-6 gap-2 w-[97%]">
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
            className="custom-text rounded-md focus:outline-none bg-gray-400 px-2 py-4 h-40 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default EditDataForm;