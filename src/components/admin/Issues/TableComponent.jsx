"use client";
import React, { useEffect, useState } from "react";
import {
  FaTrashCan,
  FaSort,
  FaRectangleList,
} from "react-icons/fa6";
import { DateFormatter } from "@/utils/parseDate";
import { useDisclosure } from "@nextui-org/react";
import { client } from "@/contexts/AmplifyContext";
import InputSearchFilter from "./InputSearchFilter";
import { IssueInformationModal } from "..";
import { DeleteReportById } from "@/graphql/issues/mutations/mutation";
import { onUpdateReport } from "@/graphql/issues/subscriptions/subscription";
export default function TableComponent({ data, callback }) {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [issueSelected, setIssueSelected] = useState(null);
  const {
    isOpen: isIssueInformationModalOpen,
    onOpen: onIssueInformationModalOpen,
    onOpenChange: onIssueInformationModalChange,
  } = useDisclosure();
  const handleSort = (key) => {
    let direction = "asc";
    if (sortedColumn === key && sortDirection === "asc") {
      direction = "desc";
    }
    setSortedColumn(key);
    setSortDirection(direction);
  };
  const sortedData = sortedColumn
    ? [...data].sort((a, b) => {
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
    : data;
  const handleModalInformation = (issueRow) => {
    setIssueSelected(issueRow);
    onIssueInformationModalOpen();
  }
  const handleDeleteReport = async (reportId) => {
    await client.graphql({
      query: DeleteReportById,
      variables: {
        reportId
      }

    });
    callback();
  }
  useEffect(() => {
    
    const subscription = client
      .graphql({ query: onUpdateReport })
      .subscribe({
        next: ({ data }) => {
          // Update previous state
          setIssueSelected(data.onUpdateReport);
        },
        error: (error) => console.warn(error)
      });

    return () => {
      // Cancel the subscription when this component's life cycle ends
      subscription.unsubscribe();
    };
  }, []);
  
  return (
    <>
      <IssueInformationModal callback={callback} isOpen={isIssueInformationModalOpen} onOpenChange={onIssueInformationModalChange} issueSelected={issueSelected} />
      <InputSearchFilter />
      <div className="relative overflow-x-auto rounded-lg shadow-lg p-6 bg-white dark:bg-zinc-800">
        <table
          id="myTable"
          className="w-full text-sm text-left rtl:text-right  transition-all"
        >
          <thead className="text-xs text-gray-700 dark:text-white uppercase rounded-full bg-zinc-200 dark:bg-zinc-800">
            <tr className="">
              <th scope="col" className="px-6 py-3 rounded-l-lg">
                <div
                  className="flex gap-2 items-center cursor-pointer "
                  onClick={() => handleSort("title")}
                >
                  TITLE
                  <FaSort />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 flex gap-2 w-full cursor-pointer " onClick={() => handleSort("createdBy")}>
                CREATED BY
                <FaSort />
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
                <td className="px-6 py-4">
                  {issue.title}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {
                    issue.createdBy
                  }
                </td>
                <td className="px-6 py-4">
                  <p className="text-justify">
                    {issue.description}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p
                      className={`py-1 font-medium rounded-2xl brightness-125 w-20 flex justify-center
                        ${issue.status === "solved" && "bg-emerald-700 text-green-300"}
                        ${issue.status === "pending" && "bg-amber-600 text-amber-300"}
                        ${issue.status === "processed" && "bg-indigo-600 text-indigo-300"}
                      `}
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
                      onClick={() => handleDeleteReport(issue.id)}
                    >
                      <FaTrashCan />
                    </button>
                    <button
                      type="button"
                      className="bg-blue-500 p-2 rounded text-white"
                      onClick={() => handleModalInformation(issue)}
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