import React from "react";

const Søg = ({ search, setSearch }) => {
  return (
    <div className="search">
      <div>
        <img src="Search.svg" alt="" />

        <input
          type="text"
          placeholder="Søg igennem tusindvis af film"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Søg;
