import React from 'react';
import CountUp from 'react-countup';
import { Card, CardBody } from "@nextui-org/react";
import { FaFaceMeh, FaFaceSmile, FaTableList } from 'react-icons/fa6';
function CardIssue({ mode, number, filteredIssues, setFilteredIssues, page, rowsPerPage, setTotalPages }) {
    const renderIcon = () => {
        switch (mode) {
            case 'total':
                return <FaTableList className='md:text-5xl text-white dark:text-white' />;
            case 'solved':
                return <FaFaceSmile className='md:text-5xl text-white dark:text-white' />;
            case 'unsolved':
                return <FaFaceMeh className='md:text-5xl text-white dark:text-white' />;
            default:
                return null; // En caso de que el valor de 'mode' no coincida con ninguna opción
        }
    };
    const getColorClass = () => {
        switch (mode) {
          case 'total':
            return 'bg-blue-500'; // Color azul para 'total'
          case 'solved':
            return 'bg-green-500'; // Color verde para 'status'
          case 'unsolved':
            return 'bg-red-600'; // Color amarillo para 'each'
          default:
            return 'bg-gray-500'; // Color gris por defecto
        }
    };
    const getText = () => {
        switch (mode) {
            case 'total':
              return `Total issues: `;
            case 'solved':
              return `Issues solved: `;
            case 'unsolved':
              return `Issues unsolved: `;
            default:
              return null;
        }
    }
    const issuesFilter = () => {
        let filtered;
        let issuesFiltered;
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        switch (mode) {
            case 'total':
                issuesFiltered = issues;
                break;
            case 'solved':

                issuesFiltered = issues.filter(user => user.status === "solved");
                break;
            case 'unsolved':
                filtered = "";
                issuesFiltered = issues.filter(user => user.status === "unsolved");
                break;
            default:
                issuesFiltered = issues;
        }
        setFilteredIssues(issuesFiltered.slice(start, end));
        setTotalPages(calculateTotalPages(issuesFiltered, rowsPerPage));
    }
    return (
        <Card
            shadow="md"
            className={`h-[11rem] w-11/12 l-g:w-[24rem] dark:bg-zinc-800 ${getColorClass()}`}
            isPressable
            onClick={issuesFilter}
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

export default CardIssue