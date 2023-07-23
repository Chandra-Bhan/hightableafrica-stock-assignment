import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
// import yf from "yfinance";
import style from "../styles/SearchBar.module.css";

function SearchBar({ onSelectStock, setIsLoading }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchStockOptions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://datahub.io/core/s-and-p-500-companies/r/constituents.json"
        );
        const sp500Data = response.data;

        // Extract the stock symbols from the fetched data
        const sp500Stocks = sp500Data.map((stock) => stock);
        const options = sp500Stocks.map((data) => ({
          label: `${data.Symbol} - ${data.Name} - ${data.Sector}`,
          value: data.Symbol,
        }));
        setOptions(options);
        setIsLoading(false);
        console.log(options);
      } catch (error) {
        console.error("Error fetching stock options:", error);
      }
    };
    fetchStockOptions();
  }, []);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleSelectChange = (selectedOption) => {
    onSelectStock(selectedOption.value);
  };

  return (
    <div>
      <div className={style.head_dropdown}>
        <Select
          options={options}
          onInputChange={handleInputChange}
          onChange={handleSelectChange}
          value={null}
        />
      </div>
    </div>
  );
}

export default SearchBar;
