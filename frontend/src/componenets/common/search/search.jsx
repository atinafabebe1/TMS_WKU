import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="d-flex justify-content-center">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          <FaSearch />
        </Button>
      </InputGroup>
    </div>
  );
};

export default Search;
