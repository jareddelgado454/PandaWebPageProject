"use client";
import { DateFormatter } from "@/utils/parseDate";
import React, { useState } from "react";
import {
  FaTrashCan,
  FaSort,
  FaAddressCard,
  FaRectangleList,
} from "react-icons/fa6";
export const TableComponent = ({ item, callback }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const handleSort = (key) => {
    let direction = "asc";
    if (sortedColumn === key && sortDirection === "asc") {
      direction = "desc";
    }
    setSortedColumn(key);
    setSortDirection(direction);
  };

  const sortedData = sortedColumn
    ? [...item].sort((a, b) => {
        const aValue = a[sortedColumn];
        const bValue = b[sortedColumn];

        // Handle null values
        if (aValue === null && bValue !== null) {
          return sortDirection === "asc" ? 1 : -1;
        }
        if (aValue !== null && bValue === null) {
          return sortDirection === "asc" ? -1 : 1;
        }

        // Compare values
        if (aValue < bValue) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      })
    : item;
  const filterInput = () => {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };
  return (
    <>
      {/* Todo: searchInput */}
      <div className="w-full">
        <div className="flex justify-between items-center gap-4 bg-white dark:bg-zinc-800 rounded p-5 mb-6 shadow-md flex-wrap md:flex-nowrap">
          <div className="w-full flex gap-4 items-center flex-wrap md:flex-nowrap">
            <label
              className="font-extrabold text-zinc-800 dark:text-white tracking-[0.2em] transition-all"
              htmlFor="search-input"
            >
              Search
            </label>
            <input
              type="search"
              id="myInput"
              onKeyUp={filterInput}
              className="dark:bg-zinc-800 border border-[#40C48E] dark:text-white shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto rounded-lg shadow-lg p-6 bg-white dark:bg-zinc-800">
        <table
          id="myTable"
          className="w-full text-sm text-left rtl:text-right  transition-all"
        >
          <thead className="text-xs text-gray-700 dark:text-white uppercase rounded-full bg-zinc-200 dark:bg-zinc-800">
            <tr>
              <th scope="col" className="px-6 py-3 flex gap-2 w-full rounded-l-lg cursor-pointer" onClick={() => handleSort("createdBy")}>
                CREATED BY
                <FaSort />
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  TITLE
                  <FaSort />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => handleSort("description")}
                >
                    DECRIPTION
                  <FaSort />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 w-20">
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  STATUS
                  <FaSort />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  CREATED AT
                  <FaSort />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((issue, i) => (
              <tr
                className={`bg-white border-b text-gray-700 dark:bg-zinc-800 dark:border-[#40C48E] dark:text-white dark:font-medium`}
                key={i}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {
                    issue.createdBy
                  }
                </th>
                <td className="px-6 py-4">
                  { issue.title }
                </td>
                <td className="px-6 py-4">
                  <p className="text-justify">
                    { issue.description }
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p
                      className={`py-1 font-medium rounded-2xl brightness-125 w-20 flex justify-center ${
                        issue.status === "solved"
                          ? "bg-emerald-700 text-green-500"
                          : "bg-rose-700 text-rose-300"
                      }`}
                    >
                      {issue.status}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {DateFormatter(issue.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="bg-rose-500 p-2 rounded text-white"
                    >
                      <FaTrashCan />
                    </button>
                    <button
                      type="button"
                      className="bg-blue-500 p-2 rounded text-white"
                    >
                      <FaAddressCard />
                    </button>
                    <button
                      type="button"
                      className="bg-yellow-400 p-2 rounded text-white"
                    >
                      <FaRectangleList />
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
