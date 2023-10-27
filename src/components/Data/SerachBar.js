import React from "react";

const SearchBar = ({ searchValue, setSearchValue, dateFilter, setDateFilter }) => {
  const dateOptions = [
    "All Date",
    "Last 7 Days",
    "Last 30 Days",
    "Latest",
  ];

  return (
    <div className="w-[80%] py-4 flex flex-col md:flex-row items-center justify-center gap-4 mx-auto md:sticky top-[11.5rem] lg:top-[10.5rem] bg-white rounded-md ">
      <input
        type="text"
        className="h-10 px-2 rounded-md bg-gray-100 focus:outline-none"
        name="nameSearch"
        placeholder="Search any name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <select
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="h-10 px-2 rounded-md bg-gray-100 focus:outline-none"
      >
        {dateOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
     
    </div>
  );
};

export default SearchBar;