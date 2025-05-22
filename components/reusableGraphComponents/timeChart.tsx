import React, { useEffect, useRef } from "react";
import { createChart, AreaSeries } from "lightweight-charts";

const TimeBasedChartComponent = ({ data, width = 300, height = 400 }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width,
      height,
      layout: {
        background: {
          //  type: "solid",
          color: "#ffffff",
        },
        textColor: "#000000",
      },
      grid: {
        vertLines: { color: "#e1e1e1" },
        horzLines: { color: "#e1e1e1" },
      },
      rightPriceScale: {
        visible: false, // Hide the default right price scale
      },
      leftPriceScale: {
        visible: true, // Show left-side price scale
        borderColor: "#e1e1e1",
        // fixLeftEdge: true, // Ensure left side is fixed
      },
    });
    console.log("chart.addSeries: ", chart.addSeries);

    // Add area series
    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
      priceScaleId: "left",
    });

    if (data && data.length > 0) {
      areaSeries.setData(data);
    }

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [data, width, height]);

  return <div ref={chartContainerRef} style={{ width, height }} />;
};

export default TimeBasedChartComponent;




