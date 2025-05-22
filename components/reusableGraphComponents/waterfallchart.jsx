import React from "react";
import {
  ChartCanvas,
  Chart,
  BarSeries,
  XAxis,
  YAxis,
} from "react-financial-charts";
import { scaleTime } from "d3-scale";

const waterfallData = [
  { date: new Date(2024, 0, 1), value: 100, type: "start" }, // Start price
  { date: new Date(2024, 1, 1), value: 20, type: "gain" }, // Positive Earnings
  { date: new Date(2024, 2, 1), value: -5, type: "loss" }, // Dividend Payout
  { date: new Date(2024, 3, 1), value: -10, type: "loss" }, // Market Correction
  { date: new Date(2024, 4, 1), value: 15, type: "gain" }, // Positive News
];

const WaterfallChart = () => {
  const xAccessor = (d) => d.date;
  const yAccessor = (d) => d.value;

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-center mb-4">
        Stock Price Waterfall Chart
      </h2>
      <ChartCanvas
        height={400}
        width={800}
        ratio={1}
        data={waterfallData}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        seriesName="Stock Waterfall"
      >
        <Chart id={1} yExtents={(d) => [0, d.value]}>
          <XAxis />
          <YAxis />

          <BarSeries
            yAccessor={yAccessor}
            fill={(d) =>
              d.type === "gain" ? "green" : d.type === "loss" ? "red" : "blue"
            }
          />
        </Chart>
      </ChartCanvas>
    </div>
  );
};

export default WaterfallChart;
