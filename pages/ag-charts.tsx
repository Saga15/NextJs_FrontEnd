import React, { useEffect, useRef } from "react";

const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      container: chartRef.current,
      title: { text: "Monthly Sales Data" },
      data: [
        { month: "Jan", sales: 300 },
        { month: "Feb", sales: 450 },
        { month: "Mar", sales: 600 },
        { month: "Apr", sales: 700 },
        { month: "May", sales: 500 },
      ],
      series: [{ type: "column", xKey: "month", yKey: "sales", yName: "Sales Amount" }],
    };

  }, []);

  return <div ref={chartRef} className="w-full max-w-lg mx-auto p-4 border rounded-lg shadow-md" />;
};

export default ChartComponent;
