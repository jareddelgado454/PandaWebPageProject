"use client"

import React from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeeklyChart = ({weeklyData}) => {
    console.log("la info del chart perri",weeklyData);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4B4B4A" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#459488" shape={<Rectangle />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyChart;
