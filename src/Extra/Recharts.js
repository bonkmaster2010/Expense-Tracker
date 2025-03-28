import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

export default function DashChart({ chartData }) {
  if (!chartData || chartData.length === 0) {
    return <p>No data available to display in the chart.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 10, right: 50, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#888" }} />
        <YAxis tick={{ fontSize: 14, fill: "#888" }} />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.75)', color: 'white' }} />
        <Legend verticalAlign="top" height={36} iconSize={20} iconType="circle" />
        <Bar dataKey="expense" fill="#82ca9d" stroke="#4c6f4b" strokeWidth={2} animationDuration={1500}>
          <LabelList dataKey="expense" position="top" style={{ fill: 'white', fontSize: 14 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
