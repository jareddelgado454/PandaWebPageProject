'use client';
import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ users }) {

 // Encontrar la fecha de registro más antigua
const oldestUserDate = users.reduce((oldestDate, user) => {
  const createdAtDate = new Date(user.createdAt);
  return oldestDate ? (createdAtDate < oldestDate ? createdAtDate : oldestDate) : createdAtDate;
}, null);

// Generar todas las fechas en el intervalo
const allDatesInInterval = [];
let currentDateInInterval = new Date(oldestUserDate);
const currentDate = new Date(); // Fecha actual
while (currentDateInInterval <= currentDate) {
  allDatesInInterval.push(currentDateInInterval.toISOString().split('T')[0]);
  currentDateInInterval.setDate(currentDateInInterval.getDate() + 1);
}

// Contar usuarios registrados por fecha
const userCountByDate = users.reduce((acc, user) => {
  const date = user.createdAt.split('T')[0]; // Obtener solo la parte de la fecha sin la hora
  acc[date] = (acc[date] || 0) + 1; // Contar usuarios registrados en la misma fecha
  return acc;
}, {});

// Preparar los datos para el gráfico
const chartData = {
  labels: allDatesInInterval,
  datasets: [
      {
          label: 'Usuarios Registrados',
          data: allDatesInInterval.map(date => userCountByDate[date] || 0), // Incluir 0 para fechas sin usuarios registrados
          fill: false,
          borderColor: 'rgb(75, 192, 0)',
          tension: 0.2,
      }
  ]
};

  return (
    <div className="shadow-lg rounded-xl py-8 px-1 md:h-full md:w-full bg-zinc-800 text-white overflow-x-auto flex flex-col gap-4 justify-center items-center">
      <p className='text-white text-2xl font-bold'>
        Users Gained
      </p>
      <Line
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false,
            }
          },
          scales:{
            x: {
              grid: {
                color: 'black', // Color de las líneas de la grilla en el eje x
              },
              ticks: {
                color: 'white' // Color de las etiquetas en el eje x
              }
            },
            y: {
              grid: {
                color: 'black', // Color de las líneas de la grilla en el eje y
              },
              ticks: {
                color: 'white' // Color de las etiquetas en el eje y
              }
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;