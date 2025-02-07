"use client";
import React, { useContext, useEffect, useState } from "react";
import { Table } from "@/components/Table";
import { CardData } from "@/components/admin/cards/CardData";
import { calculateTotalPages, totalNumbers } from "@/utils/calculate";
import { listUsers } from "@/graphql/users/query/user";
import { client } from "@/contexts/AmplifyContext";
import { UserContext } from "@/contexts/user/UserContext";
const Users = () => {
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);

  const retrieveData = async () => {
    setLoading(true);

    try {
      const { data } = await client.graphql({
        query: listUsers,
        variables: {
          currentAdminId: user.id
        }
      });
      setUsers(data.listUsers.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveData();
  }, [user]);

  useEffect(() => {
    if (users !== null) {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      setFilteredUsers(users.slice(start, end));
    }
  }, [users, page, rowsPerPage]);

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
    const total = calculateTotalPages(users, rowsPerPage);
    setTotalPages(total);
  }, [users, rowsPerPage]);
  const disablePrevious = page === 1;
  const disableNext = page === totalPages;
  const numbers = totalNumbers(users);
  return (
    <>
      <div className="container mx-auto md:px-0 mb-8 slide-in-left">
        <p className="text-xl md:text-3xl text-center bg-white text-zinc-800 dark:text-white dark:bg-zinc-800 rounded-b-lg font-bold py-6 tracking-[0.1em] drop-shadow-lg transition-all">
          Administrators
        </p>
        {/* Todo: Cards */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 my-6 place-items-center">
          {numbers.map((e, i) => {
            return (
                <CardData
                    key={i}
                    mode={e.mode}
                    number={e.number}
                    users={users}
                    filteredUsers={filteredUsers}
                    setFilteredUsers={setFilteredUsers}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    setTotalPages={setTotalPages}
                />
            )
          })}
        </div>   
        {/* Todo: Table */}
        <div className="px-4">
          {filteredUsers && (
            <Table item={filteredUsers} callback={retrieveData} typeUser={"admin"} />
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 px-4">
          <div className="flex flex-row items-center mt-4 dark:text-gray-800 font-medium tab-pagination drop-shadow-lg ">
            <button
              disabled={disablePrevious}
              onClick={handlePreviousPage}
              className="rounded-l-lg border-2 bg-white text-black hover:text-white hover:bg-green-panda p-2 dark:bg-zinc-800 dark:text-white dark:border-white dark:hover:bg-green-panda dark:hover:text-black cursor-pointer transition-all"
            >
              Previous
            </button>
            {filteredUsers &&
              Array.from({ length: totalPages }, (_, index) => (
                <p
                  key={index}
                  onClick={() => handlePageClick(index + 1)}
                  className={`p-2 ${
                    page === index + 1
                      ? "bg-green-panda text-white cursor-default"
                      : "bg-white text-black hover:bg-green-panda hover:text-white cursor-pointer"
                  } dark:bg-zinc-800 dark:text-white border-y-2 dark:hover:bg-green-panda dark:hover:text-black transition-all`}
                >
                  {index + 1}
                </p>
              ))}
            <button
              disabled={disableNext}
              onClick={handleNextPage}
              className="rounded-r-lg border-2 bg-white text-black hover:text-white hover:bg-green-panda p-2 dark:bg-zinc-800 dark:text-white dark:border-white dark:hover:bg-green-panda dark:hover:text-black cursor-pointer transition-all"
            >
              Next
            </button>
          </div>
          {/* componente de paginación */}
          <div className="flex gap-3 drop-shadow-lg">
            <p className="font-bold dark:text-white text-black">
              rows per page
            </p>
            <select
              value={rowsPerPage}
              onChange={({ target }) => setRowsPerPage(target.value)}
              name=""
              className="dark:text-white bg-green-panda dark:bg-black border-2 border-white rounded-lg"
            >
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
