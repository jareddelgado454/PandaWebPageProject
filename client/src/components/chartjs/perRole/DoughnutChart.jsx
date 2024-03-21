import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ users }) => {
     // Contar el total de usuarios por cada rol
    const rolesCount = users.reduce((acc, user) => {
        acc[user.rol] = (acc[user.rol] || 0) + 1;
        return acc;
    }, {});

    // Obtener las etiquetas (roles) y los datos (cantidad de usuarios)
    const labels = Object.keys(rolesCount);
    const data = Object.values(rolesCount);

    // Datos para el gráfico
    const chartData = {
        labels: labels,
        datasets: [
        {
            label: 'Usuarios por Rol',
            data: data,
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
            ],
            hoverOffset: 4
        }
        ]
    };
  return (
    <div className="bg-zinc-800 rounded-xl shadow-lg h-[35rem] w-full p-4 overflow-hidden flex flex-col justify-center items-center">
      <p className='text-2xl font-bold text-white text-center'>Users per role</p>
      <Doughnut className="bg-cover object-fill h-[]" data={chartData} />
    </div>
  )
}

export default DoughnutChart
