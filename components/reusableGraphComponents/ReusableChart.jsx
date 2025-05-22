import React from "react";
import { Bar, Line, Pie, Doughnut, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const chartTypes = {
  bar: Bar,
  line: Line,
  pie: Pie,
  doughnut: Doughnut,
  radar: Radar,
};

// Function to generate random colors
const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const ReusableChart = ({
  type = "bar",
  data,
  options = {},
  title = "Chart",
  showLegend = true,
  legendPosition = "top",
  showTooltips = true,
  height,
}) => {
  const ChartComponent = chartTypes[type] || Bar;

  // Apply default colors if not provided
  const enhancedData = {
    ...data,
    datasets: data?.datasets?.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || getRandomColor(),
      borderColor: dataset.borderColor || getRandomColor(),
    })),
  };

  // Merge default and user-defined options
  const enhancedOptions = {
    responsive: true,
    // maintainAspectRatio: false,
    // aspectRatio: ,
    plugins: {
      legend: {
        display: showLegend,
        position: legendPosition,
      },
      tooltip: {
        enabled: showTooltips,
      },
    },
    ...options,
  };

  return (
    <div className="container mt-4">
      <h3>{title}</h3>
      <ChartComponent data={enhancedData} options={enhancedOptions} />
    </div>
  );
};

export default ReusableChart;
