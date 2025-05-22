import React, { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamic import to prevent SSR issues in Next.js
const CanvasJSChart = dynamic(
  () =>
    import("@canvasjs/react-charts").then((mod) => mod.default.CanvasJSChart),
  { ssr: false }
);

const CandlestickChart = ({ data }) => {
  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    creditText: "", // Removes the CanvasJS credit link
    creditHref: "", // Removes the CanvasJS hyperlink
    title: {
      text: "Intel Corporation Stock Price - 2017",
    },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      includeZero: false,
      prefix: "$",
      title: "Price (in USD)",
    },
    data: [
      {
        type: "candlestick",
        showInLegend: true,
        name: "Intel Corporation",
        yValueFormatString: "$###0.00",
        xValueFormatString: "MMMM YY",
        risingColor: "green", // Filled Green for Bullish
        fallingColor: "red", // Filled Red for Bearish
        dataPoints: data,
      },
    ],
  };


useEffect(() => {
  const hideCredit = () => {
    const creditLink = document.querySelector(".canvasjs-chart-container a.canvasjs-chart-credit");
    if (creditLink) {
      creditLink.style.color = "red !important";
    }
  };

  // setTimeout(hideCredit, 500); // Delay ensures it's removed after rendering

  return () => clearTimeout(hideCredit);
}, []);


  return (
    <div>
      <h1>React Candlestick Chart (Filled Green & Red Candles)</h1>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default CandlestickChart;
