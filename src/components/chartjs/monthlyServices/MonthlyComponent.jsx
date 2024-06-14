'use client'
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { parseISO } from 'date-fns';

function MonthlyComponent({ services }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (services && services.length > 0) {
      // Inicializar un objeto para contar los servicios por mes
      const monthlyData = {
        Enero: 0,
        Febrero: 0,
        Marzo: 0,
        Abril: 0,
        Mayo: 0,
        Junio: 0,
        Julio: 0,
        Agosto: 0,
        Septiembre: 0,
        Octubre: 0,
        Noviembre: 0,
        Diciembre: 0,
      };

      // Mapear los nombres de los meses a sus índices
      const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];

      // Contar los servicios por mes
      services.forEach(service => {
        const monthIndex = parseISO(service.createdAt).getMonth();
        const monthName = monthNames[monthIndex];
        monthlyData[monthName] += 1;
      });

      // Convertir el objeto a un array para el gráfico
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
          <p>{`${name} : ${createdAt} servicios`}</p>
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
