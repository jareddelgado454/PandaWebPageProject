"use client";
import React, { useState } from "react";
import {AddUserModal, DeleteModal, EditModal, ShowInfoModal} from "./admin/index";
import { client } from "@/contexts/AmplifyContext";
import {
  FaTrashCan,
  FaPencil,
  FaSort,
  FaAddressCard,
} from "react-icons/fa6";
import { Button, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { baseUrl } from "@/utils/CloudFront";
import { toast } from "react-toastify";
export const Table = ({ item, callback, typeUser }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onOpenChange: onEditModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isShowModalOpen,
    onOpen: onShowModalOpen,
    onOpenChange: onShowModalOpenChange
  } = useDisclosure();
  const {
    isOpen: isAddModalOpen,
    onOpen: onUserAddModalOpen,
    onOpenChange: onAddUserModalChange
  } = useDisclosure();
  const [recordSelected, setRecordSelected] = useState({});
  const handleOpenEditModal = (user) => {
    onEditModalOpen();
    setRecordSelected(user);
  };
  const handleOpenInfoModal = (user) => {
    onShowModalOpen();
    setRecordSelected(user);
  }
  const handleDeleteUserId = async (id, username) => {
    try {
      if (!id) {
        return;
      }
      await client.graphql({
        query: deleteUserFromDB,
        variables: {
          id: id,
          username
        },
      });
      toast.success('Deleted successfully');
      callback();
    } catch (error) {
      console.log(error);
    }
  };
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
          {typeUser === "admin" && (
            <Button
              className="bg-green-panda tracking-widest text-zinc-100 font-semibold"
              onClick={onUserAddModalOpen}
            >
              Add
            </Button>
          )}
        </div>
      </div>
      <div className="relative overflow-x-auto rounded-lg shadow-lg p-6 bg-white dark:bg-zinc-800">
        <table
          id="myTable"
          className="w-full text-sm text-left rtl:text-right  transition-all"
        >
          <thead className="text-xs text-gray-700 dark:text-white uppercase rounded-full bg-zinc-200 dark:bg-zinc-800">
            <tr>
              <th scope="col" className="px-6 py-3 w-20 rounded-l-lg">
                IMAGE
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => handleSort("fullName")}
                >
                  Full Name
                  <FaSort />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  MAIL
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
                  onClick={() => handleSort("contactNumber")}
                >
                  CONTACT NUMBER
                  <FaSort />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 rounded-r-lg">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((user, i) => (
              <tr
                className={`bg-white border-b text-gray-700 dark:bg-zinc-800 dark:border-[#40C48E] dark:text-white dark:font-medium`}
                key={i}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Image
                    src={
                      user.profilePicture
                        ? `${baseUrl + user.profilePicture}`
                        : "/image/defaultProfilePicture.jpg"
                    }
                    alt="logo_image"
                    className="w-[2rem] h-[2rem] rounded-lg bg-cover bg-center"
                    height={250}
                    width={250}
                  />
                </th>
                <td className="px-6 py-4">
                  {user.fullName ? user.fullName : "Guest"}
                </td>
                <td className="px-6 py-4">
                  {user.email ? user.email : "Guest"}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p
                      className={`py-1 font-medium rounded-2xl brightness-125 w-20 flex justify-center ${
                        user.status === "active"
                          ? "bg-emerald-700 text-green-500"
                          : "bg-rose-700 text-rose-300"
                      }`}
                    >
                      {user.status}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {user.contactNumber ? user.contactNumber : "To complete"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleDeleteUserId(user.id, user.email)}
                      className="bg-rose-500 p-2 rounded text-white"
                    >
                      <FaTrashCan />
                    </button>
                    <button
                      type="button"
                      className="bg-blue-500 p-2 rounded text-white"
                      onClick={() => handleOpenInfoModal(user)}
                    >
                      <FaAddressCard />
                    </button>
                    <button
                      type="button"
                      className="bg-yellow-400 p-2 rounded text-white"
                      onClick={() => handleOpenEditModal(user)}
                    >
                      <FaPencil />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <EditModal
            isOpen={isEditModalOpen}
            onOpenChange={onEditModalOpenChange}
            user={recordSelected}
            callback={callback}
            typeUser={typeUser}
            setRecordSelected={setRecordSelected}
          />
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onOpenChange={onDeleteModalOpenChange}
            user={recordSelected}
            callback={callback}
            setRecordSelected={setRecordSelected}
          />
          <ShowInfoModal 
            isOpen={isShowModalOpen}
            onOpenChange={onShowModalOpenChange}
            user={recordSelected}
            setRecordSelected={setRecordSelected}
          />
          <AddUserModal
            isOpen={isAddModalOpen}
            onOpenChange={onAddUserModalChange}
            callback={callback}
          />
        </table>
      </div>
    </>
  );
};
