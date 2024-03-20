"use client";
import React, { useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import Image from "next/image";
import { client } from "@/contexts/AmplifyContext";
import { fetchUserAttributes } from "aws-amplify/auth";
import { getUserByCognitoID } from "@/graphql/custom-queries";
import { Field, Form, Formik } from "formik";
const Settings = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const retrieveOneUser = async () => {
    setLoading(true);
    try {
      const { sub } = await fetchUserAttributes();
      const { data } = await client.graphql({
        query: getUserByCognitoID,
        variables: {
          cognitoId: sub,
        },
      });
      await setUser(data.listUsers.items[0]);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    retrieveOneUser();
  }, []);
  const onHandleSubmit = async() => {
    console.log("submit");
  }
  return (
    <div className="flex justify-center items-center flex-col slide-in-left">
      <div className="bg-white h-[5rem] w-full dark:bg-zinc-800 shadow-md flex justify-center items-center mb-10">
        <p className="text-black dark:text-white font-bold text-3xl capitalize tracking-[0.2em]">
          Profile Settings
        </p>
      </div>
      <div className="w-[90%]">
        {loading ? (
          <div>Loading Information</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          user && (
            <Formik
              initialValues={{
                fullName: user.fullName || "",
                email: user.email || "",
                contactNumber: user.contactNumber || 0,
                address: user.address || "",
                city: user.city || "",
                state: user.state || "",
              }}
              onSubmit={onHandleSubmit}
            >
              <Form className="grid grid-cols-1 gap-4">
                <div className="flex justify-center items-center">
                  <div className="flex flex-row gap-8 w-full">
                    <label htmlFor="grid-name" className="bg-zinc text-black dark:text-white lg:text-xl">FullName*</label>
                    <Field
                      type="text"
                      name="fullName"
                      className="w-full py-3 px-4 outline-none rounded-lg bg-zinc-600 dark:bg-zinc-800 cursor-default lg:w-full"
                    />
                  </div>
                </div>
              </Form>
            </Formik>
          )
        )}
      </div>
    </div>
  );
};

export default Settings;
