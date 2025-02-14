import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, CircularProgress, Button } from "@mui/material";
import axios from "axios";

const SearchableDropdown = () => {
  const [inputValue, setInputValue] = useState(""); // User input
  const [options, setOptions] = useState([]); // API results
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedValue, setSelectedValue] = useState(null); // Selected product
  const [isSearchEnabled, setIsSearchEnabled] = useState(false); // Search button state

  useEffect(() => {
    if (inputValue.length < 2) {
      setOptions([]); // Clear options if input is too short
      setIsSearchEnabled(false); // Disable search when input is edited
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/search?q=${inputValue}`);
        setOptions(response.data || []); // Set API results
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    const debounceTimeout = setTimeout(() => {
      fetchData();
    }, 500); // Debounce API calls

    return () => clearTimeout(debounceTimeout); // Cleanup on new input
  }, [inputValue]);

  // Handle selection from dropdown
  const handleSelect = (event, newValue) => {
    setSelectedValue(newValue);
    setIsSearchEnabled(!!newValue); // Enable button only if value is selected
  };

  // Handle input changes
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);

    if (!newInputValue) {
      setSelectedValue(null); // Clear selected value if user starts typing again
      setIsSearchEnabled(false); // Disable search button
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (selectedValue) {
      console.log("Searching for:", selectedValue.name);
    }
  };

  return (
    <div>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name} // Adjust based on API response
        value={selectedValue}
        onChange={handleSelect}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        loading={loading}
        disableClearable // Prevents clearing input manually
        filterOptions={(x) => x} // Prevents client-side filtering
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Product"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      
      {/* Search Button - Disabled until a product is selected */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSearch} 
        disabled={!isSearchEnabled} // ✅ Disable button until selection
        style={{ marginTop: "10px" }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchableDropdown;
