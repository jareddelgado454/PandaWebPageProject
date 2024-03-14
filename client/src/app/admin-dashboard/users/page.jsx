'use client';
import React, { useEffect, useState } from 'react';
import { Table } from '@/components/Table';
import { CardData } from '@/components/admin/cards/CardData';
import { calculateTotalPages, totalNumbers } from '@/utils/calculate';
import { listUsers} from '@/graphql/users/query';
import { Spinner } from '@nextui-org/react';
import { client } from '@/app/page';

const Users = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  
  const retrieveData = async() => 
  {
    setLoading(true);

    try {
      
      const { data } = await client.graphql({
        query: listUsers,
      });
      console.log(data);
      setUsers(data.listUsers.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    retrieveData();
  }, []);

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

  const totalPages = calculateTotalPages(users, rowsPerPage);
  const disablePrevious = page === 1;
  const disableNext = page === totalPages;
  const numbers = totalNumbers(users);

  const filterInput = () => {
    var input, filter, table, tr, td, i, txtValue;
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
      
          
          <div className='container mx-auto px-3 md:px-0 mb-8 slide-in-left'>
            <p
              className='text-xl md:text-3xl text-center bg-white text-zinc-800 dark:text-white dark:bg-zinc-800 rounded-b-lg font-bold py-6 tracking-[0.1em] drop-shadow-lg transition-all'
            >
            Users Management
            </p>
            {/* Todo: Cards */}
          
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 my-6 place-items-center'>
              {
                numbers.map((e, i) => {
                  return(
                    <CardData key={i} mode={e.mode} number={e.number} />
                  )
                })
              }
            </div>

            {/* Todo: searchInput */}

            <div className="flex w-full justify-between items-center gap-4 bg-white dark:bg-zinc-800 rounded p-5 mb-6 shadow-md flex-wrap md:flex-nowrap">
              <div className="w-full flex gap-4 items-center flex-wrap md:flex-nowrap">

                <label className="font-extrabold text-zinc-800 dark:text-white tracking-[0.2em] transition-all" htmlFor="search-input">
                  Search
                </label>
                <input
                  type="search"
                  id="myInput"
                  onKeyUp={filterInput}
                  className="dark:bg-zinc-800 border border-[#40C48E] dark:text-white shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                className="bg-green-panda dark:bg-zinc-800 dark:border-2 dark:border-[#40C48E] dark:hover:bg-green-panda hover:bg-[#2e966a] text-white font-bold py-2 px-4 rounded-lg w-full md:w-[10rem] transition-all"
              >
                Add
              </button>
            </div>
            {/* Todo: Table */}
            <div>  
              {
                filteredUsers && <Table item={filteredUsers} callback={retrieveData} />
              }
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between w-full gap-4'>
              <div className='flex flex-row items-center mt-4 dark:text-gray-800 font-medium tab-pagination drop-shadow-lg '>
                <button disabled={disablePrevious} onClick={handlePreviousPage} className='rounded-l-lg border-2 bg-white text-black hover:text-white hover:bg-green-panda p-2 dark:bg-zinc-800 dark:text-white dark:border-white dark:hover:bg-green-panda dark:hover:text-black cursor-pointer transition-all'>Previous</button>
                {users && Array.from({ length: totalPages }, (_, index) => (
                  <p
                    key={index}
                    onClick={() => handlePageClick(index + 1)}
                    className={`p-2 ${
                      page === index + 1 ? 'bg-green-panda text-white cursor-default' : 'bg-white text-black hover:bg-green-panda hover:text-white cursor-pointer'
                    } dark:bg-zinc-800 dark:text-white border-y-2 dark:hover:bg-green-panda dark:hover:text-black transition-all`}
                  >
                    {index + 1}
                  </p>
                ))}
                <button disabled={disableNext} onClick={handleNextPage} className='rounded-r-lg border-2 bg-white text-black hover:text-white hover:bg-green-panda p-2 dark:bg-zinc-800 dark:text-white dark:border-white dark:hover:bg-green-panda dark:hover:text-black cursor-pointer transition-all'>Next</button>
              </div>
              {/* componente de paginación */}
              <div className='flex gap-3 drop-shadow-lg'>
                <p className='font-bold dark:text-white text-black'>rows per page</p>
                <select value={rowsPerPage} onChange={({ target }) => setRowsPerPage(target.value)} name="" className='dark:text-white bg-green-panda dark:bg-black border-2 border-white rounded-lg' >
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
}

export default Users