import dynamic from "next/dynamic";
import React from "react";

// Dynamically import CanvasJSChart with SSR disabled
const CanvasJSChart = dynamic(
  () => import("@canvasjs/react-charts").then((mod) => mod.default.CanvasJSChart),
  { ssr: false }
);


const DemoChart = ({data}) => {
    const options = {
        theme: "light2",
        title: {
            text: "Company Sales Report"
        },
        animationEnabled: true,
        axisX: {
            interval: 1
        },
        axisY: {
            valueFormatString: "\u20B9#,##0,.L",
            title: "Amount (in INR)"
        },
        data: [data]
    };

    return (
        <div>
            {CanvasJSChart && <CanvasJSChart options={options} />}
        </div>
    );
}

export default DemoChart;
