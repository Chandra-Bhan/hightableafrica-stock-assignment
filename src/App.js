import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import StockChart from "./components/StockChart";
import axios from "axios";

function App() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    const fetchStockData = async () => {
      if (selectedStock) {
        try {
          setIsLoading(true);
          const apiKey = "MDJ6GdQ4A4wQTCxLnKd5_aefpYYefC5G";
          const response = await axios.get(
            `https://api.polygon.io/v2/aggs/ticker/${selectedStock}/range/1/minute/2000-01-09/2023-01-09?adjusted=true&limit=121&apiKey=${apiKey}`
          );

          const stockData = response.data["results"];
          setCurrency(response.data.results[0].h);
          console.log(stockData);
          setIsLoading(false);
          setStockData(stockData);
        } catch (error) {
          console.error("Error fetching stock data:", error);
        }
      }
    };
    fetchStockData();
  }, [selectedStock, setStockData]);

  const handleSelectedStock = (stockSymbol) => {
    setSelectedStock(stockSymbol);
  };

  return (
    <div className="App">
      <h1 style={{ color: "#6DCCCC" }}>Stock Chart App</h1>
      <div>{isLoading ? <p>Loading...</p> : <p> &nbsp;</p>}</div>
      <SearchBar
        setIsLoading={setIsLoading}
        onSelectStock={handleSelectedStock}
      />
      {stockData.length > 0 && (
        <StockChart
          selectedStock={selectedStock}
          currency={currency}
          stockData={stockData}
        />
      )}
    </div>
  );
}

export default App;
