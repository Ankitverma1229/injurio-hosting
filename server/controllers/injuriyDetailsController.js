import InjuriyDetail from "../models/newPersonInjuriy.js";
import asyncHandler from "express-async-handler";

export const createInjuredDetail = asyncHandler(async (request, response) => {
  const { name, bodyParts, description, date, time } = request.body;

  const existingUser = await InjuriyDetail.findOne({ name });

  if (existingUser) {
    response.status(400);
    throw new Error("This user data is already present");
  }

  if (name && bodyParts && description && date && time) {
    const userData = await InjuriyDetail.create({
      name,
      bodyParts,
      description,
      date,
      time,
    });
    response
      .status(200)
      .json({ userData, message: "Data Registered Successfully" });
  } else {
    response.status(400);
    throw new Error("All fields are mandatory");
  }
});

export const getInjuredDetail = asyncHandler(async (request, response) => {
  const allInjuredDetail = await InjuriyDetail.find({});

  if (allInjuredDetail) {
    response.status(200).json({ allInjuredDetail });
  } else {
    response.status(400);
    throw new Error("Something error happend");
  }
});

export const updateInjuredDetail = asyncHandler(async (request, response) => {
  try {
    const _id = request.params;
    const { name, bodyParts, description, date, time } = request.body;

    if (name && bodyParts && description && date && time) {
      const userData = await InjuriyDetail.updateOne(
        { _id }, // Filter to find the document
        {
          name,
          bodyParts,
          description,
          date,
          time,
        }
      );

      if (userData) {
        response.status(200).json({ message: "Data updated Successfully" });
      } else {
        response.status(404);
        throw new Error("No matching document found for update");
      }
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

export const deleteInjuredDetail = asyncHandler(async (request, response) => {
  const _id = request.params;

  try {
    await InjuriyDetail.deleteOne({ _id });
    response.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    response.status(400);
    throw new Error("something Error Happend" + error);
  }
});
