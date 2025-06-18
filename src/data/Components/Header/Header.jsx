import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Header.css";

function Header({ setSearchQuery, setSortOption }) {
  const [inputVal, setInputVal] = useState("");
  const [sortVal, setSortVal] = useState("");

  // Dealing with Search Query
  const handleSearchQuery = (event) => {
    event.preventDefault();
    setSearchQuery(inputVal);
    setSortOption("");
  };
  const handleInputChange = (event) => {
    setInputVal(event.target.value);
  };
  // if the clear is submitted then clear the search query
  const handleClear = (event) => {
    event.preventDefault();
    setSearchQuery("");
    setInputVal("");
    setSortVal("");
    setSortOption("");
  };

  // Dealing with the Sorting and Filtering
  const handleSortChange = (event) => {
    setSortVal(event.target.value);
    setSortOption(event.target.value);
  };

  return (
    <>
      <div className="header">
        <h1>Flixster</h1>
        <form className="user-input" onSubmit={handleSearchQuery}>
          <input
            type="text"
            id="search"
            placeholder="Enter search..."
            value={inputVal}
            onChange={handleInputChange}
          />
          <button type="submit" id="submit-btn">
            Search
          </button>
          <select
            id="sort-dropdown"
            value={sortVal}
            onChange={handleSortChange}
          >
            <option value="">Default</option>
            <option value="title.asc">Sort by Title</option>
            <option value="primary_release_date.desc">
              Sort by Release Date
            </option>
            <option value="vote_average.desc">Sort by Rating</option>
          </select>
          <button id="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </form>
      </div>
    </>
  );
}

export default Header;
