
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CandleStickChartComponent from '../components/reusableGraphComponents/candleStickGraph';

const StockChart = () => {
  const chartContainerRef = useRef(null);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const API_KEY = "VECK0RYJQ07M09MB"; // Replace with your API Key
        const SYMBOL = "TSLA"; // Change to any stock symbol (e.g., TSLA, MSFT)
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${API_KEY}`
        );

        const timeSeries = response.data["Time Series (Daily)"];
        if (!timeSeries) return;

        // Convert API data into chart format
        const formattedData = Object.keys(timeSeries)
          .slice(0,5) // Get the latest 20 days
          .map((date) => ({
            time: date,
            open: parseFloat(timeSeries[date]["1. open"]),
            high: parseFloat(timeSeries[date]["2. high"]),
            low: parseFloat(timeSeries[date]["3. low"]),
            close: parseFloat(timeSeries[date]["4. close"]),
          }))
          .reverse(); // Reverse for chronological order

        setStockData(formattedData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);




  
  
  return (
    <div>
        <CandleStickChartComponent data={stockData} width={500} height={400} />
    </div>
  );
};

export default StockChart;
