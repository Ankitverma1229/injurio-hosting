import React, { useEffect, useState } from "react";
import "./data.css";
import axios from "axios";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { NavbarDefault } from "../../components/NavbarComponent/Navbar";
import EditDataForm from "../../components/Data/EditDataForm";
import SearchBar from "../../components/Data/SerachBar";
import DataTable from "../../components/Data/DataTable";
import Swal from 'sweetalert2';


const Data = () => {
  const [injuredData, setInjuredData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingValue, setEditingValue] = useState(null);
  const [formDataArray, setFormDataArray] = useState([]);
  const [searchValue, setSearchValue] = useState(""); 
  const [dateFilter, setDateFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const getInjuredData = async () => {
    try {
      const response = await axios.get(
        "https://injurio-server.onrender.com/injurio/injuriedDetails"
      );
      if (response) {
        setInjuredData(response.data.allInjuredDetail);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInjuredData();
  }, []);

  const handleFormDataChange = (formData) => {
    setFormDataArray(formData);
  };

  const editDataHandler = (items) => {
    setEditingValue(items);
    setShowEditForm(true);
  };

  const deleteDataHandler = async (items) => {
    const id = items._id;
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#31A05D",
      cancelButtonColor: "#D33F49",
    }).then(async(result)=>{
      if(result.isConfirmed){
        try {
          const deleteData = await axios.delete(
            `https://injurio-server.onrender.com/injurio/deleteData/${id}`
          );
          if (deleteData) {
            getInjuredData();
            Swal.fire({
              position: "center",
                icon: "success",
                showConfirmButton: false,
                title: "Data deleted successfully!!",
                timer: 1500,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    })
   
  };

  const updateDataHandler = async (e) => {
    e.preventDefault();
    try {
      const updateData = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/${editingValue._id}`,
        formDataArray
      );
      if (updateData) {
        Swal.fire({
          position: "center",
            icon: "success",
            showConfirmButton: false,
            title: "Data updated successfully!!",
            timer: 1500,
        });
        getInjuredData();
        setShowEditForm(false);
        setEditingValue(null);
      }
      
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const filterData = () => {
      const filtered = injuredData.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchValue.toLowerCase());
        if (!dateFilter || dateFilter === "Custom Date") {
          return nameMatch;
        }
        const currentDate = new Date();
        switch (dateFilter) {
          case "Latest":
            const itemDate = new Date(item.date);
            return nameMatch && currentDate - itemDate <= 0;
          case "Last 7 Days":
            const sevenDaysAgo = new Date(currentDate);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const itemDate7 = new Date(item.date);
            return nameMatch && itemDate7 >= sevenDaysAgo;
          case "Last 30 Days":
            const thirtyDaysAgo = new Date(currentDate);
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const itemDate30 = new Date(item.date);
            return nameMatch && itemDate30 >= thirtyDaysAgo;
          default:
            return nameMatch;
        }
      });
      setFilteredData(filtered);
    };

    filterData();
  }, [searchValue, injuredData, dateFilter]);

  return (
    <div>
      <NavbarDefault className="" />
      <div>
        <div className="md:sticky z-40 bg-white top-[6.3rem] lg:top-[5.3rem] py-1 w-[80%] mx-auto rounded-md">
          <h1 className="text-3xl text-[#21262C] my-5 text-center underline">
            Injured details
          </h1>
        </div>

        {showEditForm ? null : (
          <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
        )}
        
        {showEditForm ? null : (
          <DataTable
            injuredData={filteredData.length > 0 ? filteredData : injuredData}
            editDataHandler={editDataHandler}
            deleteDataHandler={deleteDataHandler}
          />
        )}
                <form onSubmit={updateDataHandler}>
          {editingValue !== null && (
            <EditDataForm
              key={editingValue._id} // Assuming _id is a unique identifier for editingValue
              editingValue={editingValue}
              onFormDataChange={handleFormDataChange}
            />
          )}
          {showEditForm ? (
            <div className="grid place-content-end w-[80vw] mx-auto">
              <button
                type="submit"
                className="bg-red-700 px-10 py-2 text-white rounded-md"
              >
                Update
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Data;