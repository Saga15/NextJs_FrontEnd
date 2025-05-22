import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

// Dynamically import CanvasJSChart with SSR disabled
const CanvasJSChart = dynamic(
  () => import("@canvasjs/react-charts").then((mod) => mod.default.CanvasJSChart),
  { ssr: false }
);

const StockWithAreaChart = () => {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging

        // Process and format the fetched data
        const formattedData = {
          type: "splineArea",
          color: "purple",
          yValueFormatString: "$#,###.##",
          xValueFormatString: "MMM DD YYYY",
          dataPoints: data.map((item) => ({
            x: new Date(item.date),
            y: Number(item.close),
          })),
        };

        setData(formattedData);
        setIsLoaded(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const options = {
    theme: "light2",
    title: {
      text: "Bitcoin Price Chart (BTC/USD)",
    },
    animationEnabled: true,
    axisX: {
      title: "Date",
      valueFormatString: "MMM YYYY",
      interval: 1,
      intervalType: "month",
    },
    axisY: {
      title: "Price (USD)",
      prefix: "$",
      valueFormatString: "$#,###.##",
    },
    data: data ? [data] : [],
  };

  return (
    <div className="flex flex-col items-center">
      {!isLoaded ? (
        <p className="text-gray-500 text-lg">Loading...</p>
      ) : (
        CanvasJSChart && <CanvasJSChart options={options} />
      )}
    </div>
  );
};

export default StockWithAreaChart;
