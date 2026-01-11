import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: analyticsData = {}, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics");
      return res.data;
    },
  });

  const { serviceStats = [], totalRevenue = 0, totalBookings = 0 } = analyticsData;

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#e60077", "#14b8a6"];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  if (isLoading) {
    return (
      <div className="text-center p-10 text-base-content">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Analytics & Revenue
      </h2>

      <div className="stats shadow w-full mb-10 bg-base-100 border border-base-300">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-base-content/70">Total Revenue</div>
          <div className="stat-value text-primary">{totalRevenue} BDT</div>
          <div className="stat-desc text-base-content/60">Lifetime earnings</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-base-content/70">Total Bookings</div>
          <div className="stat-value text-secondary">{totalBookings}</div>
          <div className="stat-desc text-base-content/60">
            Services assigned/completed
          </div>
        </div>
      </div>

      <div className="bg-base-200 p-6 rounded-lg shadow-lg border border-base-300">
        <h3 className="text-xl font-bold mb-4 text-center text-base-content">
          Service Demand Chart (Bookings per Service)
        </h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={serviceStats}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'currentColor' }}
                stroke="currentColor"
              />
              <YAxis 
                tick={{ fill: 'currentColor' }}
                stroke="currentColor"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--b1))',
                  color: 'hsl(var(--bc))',
                  border: '1px solid hsl(var(--b3))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--bc))' }}
              />
              <Legend 
                wrapperStyle={{ color: 'hsl(var(--bc))' }}
              />
              <Bar dataKey="bookings" fill="#8884d8" label={{ position: 'top', fill: 'currentColor' }}>
                {serviceStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
