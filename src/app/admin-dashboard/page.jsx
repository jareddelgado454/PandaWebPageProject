'use client';
import React, { useEffect, useState } from "react";
import { isSameMonth, parseISO } from "date-fns";
import Link from "next/link";
import CardHome from "../../components/CardHome";
import { client } from "@/contexts/AmplifyContext";
import { listAllUsers } from "@/graphql/users/query/user";
import LoadingComponent from "@/components/LoadingComponent";
import { ShortCutItemsComponent } from "@/components/admin";
const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [admins, setAdmins] = useState([]);
  const retrieveAllUsers = async () => {
    // Indicate that the loading process has started.
    setLoading(true);
    try {
      // Perform a GraphQL query to fetch all users.
      const { data } = await client.graphql({
        query: listAllUsers,
      });
      // Set the retrieved customers data to the customers state.
      setCustomers(data.listCustomers.items);
      // Set the retrieved technicians data to the technicians state.
      setTechnicians(data.listTechnicians.items);
      // Set the retrieved admins data to the admins state.
      setAdmins(data.listUsers.items);
      // Indicate that the loading process has finished.
      setLoading(false);
    } catch (error) {
      // Log any errors to the console.
      console.warn(error);
      // Set the error state to the caught error.
      setError(error);
      // Indicate that the loading process has finished, even if there was an error.
      setLoading(false);
    }
  }
  useEffect(() => { retrieveAllUsers() }, []);
  // We want to calculate users per month with this function
  const usersPerMonth = (users = []) => {
    const now = new Date(); // Get current date
    return users.filter((u) => { // filter array of users
      const createdAt = parseISO(u.createdAt); // parse to ISO using Date-fns
      return isSameMonth(createdAt, now); // return if user createdAt date is the same to our current month
    }).length; // return just lenght of that filtered array.
  }
  return (
    <div className="m-4">
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <div className="w-full h-full flex justify-center items-center">Something went wrong</div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-2">
            <Link href={`/admin-dashboard/customers`} className='w-full flex items-center justify-center'>
              <CardHome type="Customers" numberActive={customers.length} lastRegistrations={usersPerMonth(customers)} />
            </Link>
            <Link href={`/admin-dashboard/technicians`} className='w-full flex items-center justify-center'>
              <CardHome type="Technicians" numberActive={technicians.length} lastRegistrations={usersPerMonth(technicians)} />
            </Link>
            <Link href={`/admin-dashboard/admins`} className='w-full flex items-center justify-center'>
              <CardHome type="Users" numberActive={admins.length} lastRegistrations={usersPerMonth(admins)} />
            </Link>
          </div>
          <h2 className="text-[22px] text-black dark:text-white font-bold my-8">
            Other Options:
          </h2>
          <ShortCutItemsComponent />
        </>
      )}

    </div>
  );
};

export default AdminDashboard;
