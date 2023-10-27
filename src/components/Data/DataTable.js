import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FiEdit } from "react-icons/fi";
import { FcFullTrash } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import './dataTable.css'


const DataTable = ({ injuredData, editDataHandler, deleteDataHandler }) => {
  const [showData, setShowData] = useState(false);
  const [injuriedDetails, setInjuredDetails] = useState();
console.log(injuriedDetails)
  function showDetails(items) {
    setInjuredDetails(items);
    setShowData(true);
  }

  function hideDetailsHandler() {
    setShowData(false);
  }
  return (
    <div>
      <div className="w-[80%] bg-white mx-auto rounded-md ">
        <Table className="rounded-md">
          <Thead className="md:sticky top-[16rem] lg:top-[15rem] z-10 bg-white">
            <Tr className="bg-gray-400 rounded-md">
              <Th className=" font-medium text-center py-3 ">Index</Th>
              <Th className=" font-medium text-center py-3 ">Name</Th>
              <Th className=" font-medium text-center py-3 ">Body Parts</Th>
              <Th className=" font-medium text-center py-3 ">Date</Th>
              <Th className=" font-medium text-center py-3 ">Time</Th>
              <Th className=" font-medium text-center py-3 ">Description</Th>
              <Th className=" font-medium text-center py-3 ">Edit/Delete</Th>
            </Tr>
          </Thead>

          {injuredData.map((items, i) => (
            <Tbody className="even:bg-gray-200" key={items._id}>
              <Tr
                className="text-[#092C4C] rounded-md cursor-pointer"
                
              >
                <Td className="p-5 text-center">{i + 1}</Td>
                <Td className="text-center" onClick={() => showDetails(items)}>
                  {items.name.length > 15
                    ? items.name.substring(0, 10) + "..."
                    : items.name}
                </Td>
                <Td className="text-center" onClick={() => showDetails(items)}>{items.bodyParts.join(", ")}</Td>
                <Td className="text-center" onClick={() => showDetails(items)}>{items.date}</Td>
                <Td className="text-center" onClick={() => showDetails(items)}>{items.time}</Td>
                <Td className="text-center " onClick={() => showDetails(items)}>
                  {items.description.length > 21
                    ? items.description.substring(0, 20) + "..."
                    : items.description}
                </Td>
                <Td className="md:h-16 flex justify-center items-center gap-4 ">
                <div className="flex gap-3">
                  <FiEdit
                    className="text-xl cursor-pointer"
                    onClick={() => editDataHandler(items)}
                  />
                  <FcFullTrash
                    className="text-xl cursor-pointer"
                    onClick={() => deleteDataHandler(items)}
                  />
                  </div>
                </Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </div>

      {showData ? (
        <div className="fixed z-10 top-0 w-[100vw] h-[100vh] flex justify-center items-center bg-slate-500 bg-opacity-50">
          <div className="md:h-[90%] lg:h-[26rem] xxl:max-h-[30%] h-[95%] w-[90%] md:w-[80%] lg:w-[50%] rounded-md md:p-3 bg-white flex flex-col gap-5 relative">
            <h2 className="text-center text-xl md:text-3xl pt-2 underline">Person Details</h2>
            <Table>
  <Tbody className="flex flex-col md:gap-3 p-0">
    <Tr className="flex  items-center md:gap-8">
      <Th className="md:text-2xl fw-bold md:w-1/2 text-center">Name:</Th>
      <p className="style-text  md:text-xl bg-gray-300 text-center md:w-full rounded-md md:px-5 py-1">{injuriedDetails.name}</p>
    </Tr>
    <Tr className="flex  items-center md:gap-8">
      <Th className="md:text-2xl fw-bold md:w-1/2">Date:</Th>
      <p className="style-text md:text-xl bg-gray-300 text-center md:w-full rounded-md md:px-5 py-1">{injuriedDetails.date}</p>
    </Tr>
    <Tr className="flex  items-center md:gap-8">
      <Th className="md:text-2xl fw-bold md:w-1/2">Time:</Th>
      <p className="style-text md:text-xl bg-gray-300 text-center md:w-full rounded-md md:px-5 py-1">{injuriedDetails.time}</p>
    </Tr>
    <Tr className="flex  items-center md:gap-8">
      <Th className="md:text-2xl fw-bold md:w-1/2">Body Parts:</Th>
      <p className="style-text md:text-xl bg-gray-300 text-center md:w-full rounded-md md:px-5 py-1 overflow-scroll">{injuriedDetails.bodyParts.join(", ")}</p>
    </Tr>
    <Tr className="flex  items-center md:gap-8">
      <Th className="md:text-2xl fw-bold md:w-1/2">Description:</Th>
      <p className="style-text md:text-xl bg-gray-300 text-center p-0 md:w-full mx-auto rounded-md md:px-5 py-1 h-20 md:h-32 overflow-scroll">{injuriedDetails.description}</p>
    </Tr>
  </Tbody>
</Table>



            <div
              className="bg-red-600 p-2 absolute md:top-3 top-2 right-3  rounded-md cursor-pointer opacity-30 hover:opacity-90"
              onClick={hideDetailsHandler}
            >
              <ImCross className="text-white text-sm md:text-md" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DataTable;