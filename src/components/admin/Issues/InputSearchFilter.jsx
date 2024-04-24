import React from 'react';
export default function InputSearchFilter() {
    const filterInput = () => {
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
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
  )
}
