"use client";
import React, { useEffect, useState } from "react";
import CardIssue from '@/components/admin/Issues/CardIssue'
import { client } from "@/contexts/AmplifyContext";
import { calculateTotalPages, totalNumbers } from "@/utils/issues/CalculateIssues";
import { getAllIssues } from "@/graphql/issues/queries/query";
import { IssuePagination, IssueTable } from "@/components/admin";
function page() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState(null);
  const [filteredIssues, setFilteredIssues] = useState(null);
  const retrieveData = async () => {
    setLoading(true);
    try {
      const { data } = await client.graphql({
        query: getAllIssues,
      });
      setIssues(data.listReports.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);
  useEffect(() => {
    if (issues !== null) {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      setFilteredIssues(issues.slice(start, end));
    }
  }, [issues, page, rowsPerPage]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    const total = calculateTotalPages(issues, rowsPerPage);
    setTotalPages(total);
  }, [issues, rowsPerPage]);
  const numbers = totalNumbers(issues);
  return (
    <div className="container mx-auto md:px-0 mb-8 slide-in-left">
      <p className="text-xl md:text-3xl text-center bg-white text-zinc-800 dark:text-white dark:bg-zinc-800 rounded-b-lg font-bold py-6 tracking-[0.1em] drop-shadow-lg transition-all">
        Issues Management
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 my-6 place-items-center">
        {numbers.map((issue, i) => {
          return (
            <CardIssue
              key={i}
              mode={issue.mode}
              number={issue.number}
              issues={issues}
              filteredIssues={filteredIssues}
              setFilteredIssues={setFilteredIssues}
              page={page}
              rowsPerPage={rowsPerPage}
              setTotalPages={setTotalPages}
            />
          )
        })}
      </div>
      {/* Todo: Table */}
      <div className="px-4">
        {filteredIssues && (
          <IssueTable item={filteredIssues} callback={retrieveData} />
        )}
      </div>
      <IssuePagination
        page={page}
        filteredIssues={filteredIssues}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  )
}

export default page