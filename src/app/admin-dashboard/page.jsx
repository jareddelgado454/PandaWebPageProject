import React from "react";
import CardHome from "../../components/CardHome";
import Link from "next/link";
import { FaGear, FaChartSimple } from "react-icons/fa6";
const AdminDashboard = () => {
  return (
    <div className="m-4">
      <h4 className="text-[22px] mb-8 text-gray-700 dark:text-gray-100 font-semibold">
        The bussiness information is here
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-2">
        <div className='w-full flex items-center justify-center mb-8'>
            <CardHome type="Customers" numberActive={50} lastRegistrations={5} />
        </div>
        <div className='w-full flex items-center justify-center mb-8'>
            <CardHome type="Technicians" numberActive={50} lastRegistrations={5} />
        </div>
        <div className='w-full flex items-center justify-center mb-8'>
            <CardHome type="Users" numberActive={50} lastRegistrations={5} />
        </div>
      </div>
      <h2 className="text-[22px] text-black dark:text-white font-bold mb-8">
        Other Options:
      </h2>
      <div className="flex gap-x-4">
        <Link
          href="/admin-dashboard/graphs"
          className="text-white bg-zinc-600 hover:text-gray-200 cursor-pointer font-semibold flex gap-x-2 items-center shadow-lg text-base dark:text-white dark:bg-zinc-800  px-3 py-2 rounded-lg  transition-all hover:-translate-y-1 hover:scale-110 duration-300"
        >
          <FaChartSimple />
          View Charts
        </Link>
        <Link
          href="/admin-dashboard/settings"
          className="text-white bg-zinc-600 hover:text-gray-200 cursor-pointer font-semibold flex gap-x-2 items-center shadow-lg text-base  dark:text-white dark:bg-zinc-800  px-3 py-2 rounded-lg transition-all hover:-translate-y-1 hover:scale-110 duration-300"
        >
          <FaGear />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
