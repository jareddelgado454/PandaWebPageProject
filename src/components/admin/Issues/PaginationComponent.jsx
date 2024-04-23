import React from 'react';
export default function PaginationComponent({
    page,
    filteredIssues,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    handlePageClick,
    rowsPerPage,
    setRowsPerPage
}) {
    const disablePrevious = page === 1;
    const disableNext = page === totalPages;
    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 px-4">
            <div className="flex flex-row items-center mt-4 dark:text-gray-800 font-medium tab-pagination drop-shadow-lg ">
                <button
                    disabled={disablePrevious}
                    onClick={handlePreviousPage}
                    className="rounded-l-lg border-2 bg-white text-black hover:text-white hover:bg-green-panda p-2 dark:bg-zinc-800 dark:text-white dark:border-white dark:hover:bg-green-panda dark:hover:text-black cursor-pointer transition-all"
                >
                    Previous
                </button>
                {filteredIssues &&
                    Array.from({ length: totalPages }, (_, index) => (
                        <p
                            key={index}
                            onClick={() => handlePageClick(index + 1)}
                            className={`p-2 ${page === index + 1
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
    )
}
