"use client";
import React from 'react';
import CountUp from 'react-countup';
import {Card, CardBody, user} from "@nextui-org/react";
import { FaFaceMeh, FaFaceSmile, FaPeopleGroup } from 'react-icons/fa6';
import {calculateTotalPages} from "@/utils/calculate";

export const CardData = ({ mode, number, users, setFilteredUsers, page, rowsPerPage, setTotalPages }) => {
    const renderIcon = () => {
        switch (mode) {
          case 'total':
            return <FaPeopleGroup className='md:text-5xl text-white dark:text-white' />;
          case 'active':
            return <FaFaceSmile className='md:text-5xl text-white dark:text-white' />;
          case 'inactive':
            return <FaFaceMeh className='md:text-5xl text-white dark:text-white' />;
          default:
            return null; // En caso de que el valor de 'mode' no coincida con ninguna opción
        }
    };

    const getColorClass = () => {
        switch (mode) {
          case 'total':
            return 'bg-blue-500'; // Color azul para 'total'
          case 'active':
            return 'bg-green-500'; // Color verde para 'status'
          case 'inactive':
            return 'bg-red-600'; // Color amarillo para 'each'
          default:
            return 'bg-gray-500'; // Color gris por defecto
        }
    };

    const getText = () => {
        switch (mode) {
            case 'total':
              return `Total users: `;
            case 'active':
              return `Active users: `;
            case 'inactive':
              return `Inactive users: `;
            default:
              return null;
        }
    }

    const usersFilter = () => {
        let filtered;
        let userFiltered;
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        switch (mode) {
            case 'total':
                userFiltered = users;
                break;
            case 'active':
                userFiltered = users.filter(user => user.status === "active");
                break;
            case 'inactive':
                userFiltered = users.filter(user => user.status === "inactive");
                break;
            default:
                userFiltered = users;
        }
        if(!userFiltered === null) setFilteredUsers(users);
        setFilteredUsers(userFiltered.slice(start, end));
        setTotalPages(calculateTotalPages(userFiltered, rowsPerPage));
    }

  return (
    <Card
        isDisabled={!users}
        shadow="md"
        className={`h-[11rem] w-11/12 l-g:w-[24rem] dark:bg-zinc-800 ${getColorClass()}`}
        isPressable
        onClick={usersFilter}
    >
        <CardBody className="overflow-visible p-4 relative">
            {renderIcon()}
            <div className='absolute left-4 bottom-4'>
                <p className='text-xl text-white font-bold'>
                  {getText()} <CountUp end={number} duration={2.5} />
                </p>
            </div>
        </CardBody>
  </Card>
  )
}
