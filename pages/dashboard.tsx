import React, { useEffect, useState } from "react";
import ReusableChart from "../components/reusableGraphComponents/ReusableChart";
import { post, get } from "../helper/ApiHook";
import LineChartGraphComponents from "../components/reusableGraphComponents/lineGraphChart";
import Loader from "../helper/loaderLayout/loader";
import { useSession } from "next-auth/react";
import swal from "sweetalert";

export default function Dashboard() {
  const { data: session, status } = useSession();
  console.log(session, "session");
  console.log(status, "status");
  const [selectedChart, setSelectedChart] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const graphData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 600 },
    { name: "Mar", value: 800 },
    { name: "Apr", value: 650 },
    { name: "May", value: 700 },
  ];

  console.log(selectedChart, "selectedChart");

  useEffect(() => {
    const fetchData = async () => {
      setShowLoader(true);
      const url = "https://jsonplaceholder.typicode.com/posts";
      const response = await get(url);
      console.log(response);
      if (response.data) {
        setShowLoader(false);
        const transformedData = response?.data
          ?.slice(0, 5)
          .map((item: any, index: any) => ({
            label: `Month ${index + 1}`,
            value: Math.floor(Math.random() * 500) + 100,
          }));
        console.log(transformedData, "transformedData");
        setSelectedChart({
          labels: transformedData.map((item: any) => item.label),
          datasets: [
            {
              label: "Sales",
              data: transformedData.map((item: any) => item.value),
              backgroundColor: "#007bff",
              borderColor: "#0056b3",
              borderWidth: 2,
            },
            {
              label: "axis",
              data: [60, 85, 70, 80, 400],
              backgroundColor: "red",
              borderColor: "red",
              borderWidth: 2,
            },
          ],
        });
      }
    };

    fetchData();
  }, []);

 

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Sales 2025",
        data: [400, 300, 500, 200],
        backgroundColor: "#007bff", // Bootstrap Primary Color
        borderColor: "#0056b3",
        borderWidth: 2,
      },
      {
        label: "Sales 2024",
        data: [350, 250, 450, 150],
        backgroundColor: "#28a745", // Bootstrap Success Color
        borderColor: "#1c7430",
        borderWidth: 2,
      },
    ],
  };

  const radarData = {
    labels: ["Speed", "Strength", "Agility", "Stamina", "Skill", "Power"],
    datasets: [
      {
        label: "Player A",
        data: [80, 70, 85, 75, 90, 65],
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "#007bff",
        borderWidth: 2,
      },
      {
        label: "Player B",
        data: [60, 85, 70, 80, 75, 90],
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        borderColor: "#ffc107",
        borderWidth: 2,
      },
    ],
  };

  if (!selectedChart) return <p className="text-center">{showLoader}</p>;

  return (
    <>
      <Loader showLoader={showLoader} fullPage={true} />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Dashboard</h2>
        <h1 className="text-xl font-semibold mb-4">Monthly Data</h1>
        <LineChartGraphComponents data={graphData} />
        <div className="row">
          <div className="col-md-6">
            <ReusableChart
              type="line"
              data={selectedChart}
              title="Sales Comparison"
              showLegend={true}
              legendPosition="bottom"
              showTooltips={true}
              height={300}
            />
          </div>
          <div className="col-md-6">
            <ReusableChart
              type="radar"
              data={radarData}
              title="Player Comparison"
              showLegend={true}
              legendPosition="bottom"
              showTooltips={true}
              height={300}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <ReusableChart
              type="bar"
              data={salesData}
              title="Sales Comparison"
              showLegend={true}
              legendPosition="bottom"
              showTooltips={true}
              height={300}
            />
          </div>
          <div className="col-md-6">
            <ReusableChart
              type="pie"
              data={salesData}
              title="Sales Distribution"
              showLegend={true}
              legendPosition="bottom"
              height={300}
            />
          </div>
        </div>
      </div>
    </>
  );
}
