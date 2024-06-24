'use client'
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { parseISO } from 'date-fns';

function MonthlyComponent({ services }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (services && services.length > 0) {
      // Set an object to count each service's month
      const monthlyData = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0
      };
      // Map all month names with their index
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];      

      // Contar los servicios por mes
      // Count services for each month
      services.forEach(service => {
        const monthIndex = parseISO(service.createdAt).getMonth();
        const monthName = monthNames[monthIndex];
        monthlyData[monthName] += 1;
      });
      // Convert from object to array for charts
      const chartData = Object.keys(monthlyData).map(month => ({
        name: month,
        createdAt: monthlyData[month],
      }));

      setData(chartData);
    }
  }, [services]);

  const renderTooltipContent = ({ payload, label }) => {
    if (payload && payload.length) {
      const { name, createdAt } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{`${name} : ${createdAt} services`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart
        width={200}
        height={60}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={renderTooltipContent} />
        <Area type="monotone" dataKey="createdAt" stroke="#40C48E" fill="#40C48E" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default MonthlyComponent;
