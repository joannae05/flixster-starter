import React, { useState } from "react";
import ReactDOM from "react-dom";
import './Header.css';

function Header({setSearchQuery}) {
    const [inputVal, setInputVal] = useState("");

    const handleSearchQuery = (event) => {
        event.preventDefault();
        setSearchQuery(inputVal);
    }
    
    const handleInputChange = (event) => {
        setInputVal(event.target.value);
    }

    // if the clear is submitted then clear the search query
    const handleClear = (event) => {
        event.preventDefault();
        setSearchQuery("");
        setInputVal("");
    }

    return (
        <>
            <div className="header">
                <h1>Flixster</h1>
                <form className="user-input" onSubmit={handleSearchQuery}>
                    <input type="text" id="search" placeholder="Enter search..." value={inputVal} onChange={handleInputChange}/>
                    <button type="submit" id="submit-btn">Search</button>
                    <button id="submit-btn" onClick={handleClear} >Clear</button>
                </form>
            </div>
        </>
    );
}

export default Header;