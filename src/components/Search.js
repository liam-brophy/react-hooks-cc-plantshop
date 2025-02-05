import React from "react";

function Search({handleSearch}) {

  const handleChange = (e) => {
    handleSearch(e.target.value); // Update the searchInput in the parent
  };


  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
