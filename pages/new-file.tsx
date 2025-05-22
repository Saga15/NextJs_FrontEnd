import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  BarChart,
} from "recharts";
import WaterfallChart from "../components/reusableGraphComponents/waterfallchart"

const data = [
  { name: "Jan", value: 400, high:  450, low: 380, open: 390, close: 420 },
  { name: "Feb", value: 300, high: 350, low: 290, open: 310, close: 330 },
  { name: "Mar", value: 500, high: 520, low: 460, open: 470, close: 510 },
  { name: "Apr", value: 700, high: 750, low: 690, open: 710, close: 730 },
  { name: "May", value: 600, high: 640, low: 580, open: 590, close: 620 },
];

export default function Dashboard() {
  return (
    <div className="container-fluid bg-dark text-white min-vh-100 p-4">
      <h1 className="text-center mb-4">Summary Dashboard Page</h1>

      <div className="row">
        {/* Radar Chart */}
        <div className="col-md-6 mb-4">
          <div className="card bg-secondary text-white p-3">
            <h2 className="h5">Radar</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Management Track Records (Table) */}
        <div className="col-md-6 mb-4">
          <div className="card bg-secondary text-white p-3">
            <h2 className="h5">Management Track Records</h2>
            <table className="table table-dark table-bordered">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ROI</td>
                  <td>15.2%</td>
                </tr>
                <tr>
                  <td>Revenue</td>
                  <td>$120K</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Compare Section - 3 Candlestick Charts */}
        <div className="col-md-6 mb-4">
          <div className="card bg-secondary text-white p-3">
            <h2 className="h5">Compare (Candlestick Chart 1)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                {/* Candlestick bars */}
                <Bar dataKey="open" fill="green" />
                <Bar dataKey="close" fill="red" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card bg-secondary text-white p-3">
            <h2 className="h5">Compare (Candlestick Chart 2)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="high" fill="blue" />
                <Bar dataKey="low" fill="orange" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card bg-secondary text-white p-3">
            <h2 className="h5">Compare (Candlestick Chart 3)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="value" fill="#ff4b4b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card bg-secondary text-white p-3">
            <h2 className="h5">Charts</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line  dataKey="value" stroke="#ff4b4b" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <WaterfallChart/>
    </div>
  );
}
