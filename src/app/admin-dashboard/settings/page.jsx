"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { fetchUserAttributes, updateUserAttributes } from "aws-amplify/auth";
import { FaCamera } from "react-icons/fa6";
import { toast } from "react-toastify";
import { uploadData } from "aws-amplify/storage";
import { client } from "@/contexts/AmplifyContext";
import { getUser } from "@/graphql/custom-queries";
import { statesUSA } from "@/assets/data/StatesUSA";
import { updateInformation } from "@/graphql/users/mutation/users";
import Image from "next/image";
import { dataURLtoBlob } from "@/utils/photo/BlobImage";
const Settings = () => {
  const [photograph, setPhotograph] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const retrieveOneUser = async () => {
    setLoading(true);
    try {
      const info = await fetchUserAttributes();
      const { data } = await client.graphql({
        query: getUser,
        variables: {
          userId: info.sub,
        },
      });
      const user = data.getUser;
      setUser({ ...info, ...user });
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
  const onHandleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await updateUserAttributes({
        userAttributes: {
          "custom:fullName": values.fullName,
          "custom:address": values.address,
          "custom:city": values.city,
          "custom:state": values.state,
          "custom:phoneNumber": values.contactNumber,
          "custom:zipCode": values.zipCode,
        },
      });
      await client.graphql({
        query: updateInformation,
        variables: {
          email: values.email,
          input: {
            id: user.id,
            ...values,
          },
        },
      });
      await retrieveOneUser();
      toast.success("Updated successfully.");
    } catch (error) {
      console.log(error);
      toast.error(`Error during the process.`);
    }
  };
  function handleChangePhotograph(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setPhotograph(reader.result);
        await handleUpdatePicture(dataURLtoBlob(reader.result));
      };
      reader.readAsDataURL(file);
    }
  }
  const handleUpdatePicture = async (picture) => {
    const uniqueId = uuidv4();
    const filename = `user-profile-pictures/${uniqueId}.jpg`;
    try {
      const result = await uploadData({
        key: filename,
        data: picture,
        options: {
          contentType: "image/png",
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${Math.round(
                  (transferredBytes / totalBytes) * 100
                )} %`
              );
            }
          },
        },
      }).result;
      console.log("Succeeded: ", result);
      await client.graphql({
        query: updateInformation,
        variables: {
          email: user.email,
          input: {
            id: user.sub,
            profilePicture: `https://d3nqi6yd86hstw.cloudfront.net/public/${filename}`,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="slide-in-left h-full">
      <div className="bg-white h-[5rem] w-full dark:bg-zinc-800 shadow-md flex justify-center items-center mb-10">
        <p className="text-black dark:text-white font-bold text-lg lg:text-3xl capitalize tracking-[0.2em]">
          Profile Settings
        </p>
      </div>

      <div className="w-full flex justify-center items-center">
        {loading ? (
          <div>Loading Information</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          user && (
            <div className="flex flex-col gap-8 w-[80%]">
              <div className="w-full flex justify-center items-center">
                <div className="relative w-[6rem] h-[6rem] md:w-[12rem] md:h-[12rem] overflow-hidden rounded-full shadow-md group">
                  <div className="absolute bg-black group-hover:opacity-60 opacity-0 w-full h-full transition-all">
                    <div className="flex justify-center items-center h-full">
                      <FaCamera className="text-white text-xl md:text-4xl" />
                    </div>
                  </div>
                  <Image src={
                    photograph ? photograph : (user.profilePicture ? user.profilePicture : "/image/defaultProfilePicture.jpg")
                  }
                    className="rounded-full w-[6rem] h-[6rem] md:w-[12rem] md:h-[12rem] cursor-pointer object-cover object-center"
                    alt="Fotografía de perfil"
                    width={250}
                    height={250}
                  />
                  <input
                    id="file-upload"
                    type="file"
                    name=""
                    accept="image/gif, image/jpeg, image/png"
                    className="absolute top-0 right-0 min-w-full min-h-full opacity-0 cursor-pointer bg-center object-cover object-center"
                    onChange={(event) => {
                      handleChangePhotograph(event);
                    }}
                  />
                </div>
              </div>
              <Formik
                initialValues={{
                  fullName: user["custom:fullName"] || "",
                  email: user.email || "",
                  contactNumber: user["custom:phoneNumber"] || 0,
                  address: user["custom:address"] || "",
                  city: user["custom:city"] || "",
                  state: user["custom:state"] || "",
                  zipCode: user['custom:zipCode'] || 0,
                }}
                onSubmit={onHandleSubmit}
                validationSchema={formSchema}
                validateOnChange={true}
              >
                {({ errors, isValid }) => {
                  return (
                    <Form className="w-full h-full flex flex-col gap-7">
                      <div className="w-full">
                        <label
                          htmlFor="grid-name"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          FullName
                        </label>
                        <Field
                          type="text"
                          name="fullName"
                          className="w-full py-3 px-4 outline-none rounded-lg bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white cursor-default lg:w-full shadow"
                        />
                      </div>
                      <div className="w-full" >
                        <label
                          htmlFor="grid-number"
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          ContactNumber
                        </label>
                        <Field
                          id="grid-number"
                          type="text"
                          placeholder="90210"
                          name="contactNumber"
                          className="w-full py-3 px-4 outline-none rounded-lg bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white cursor-default lg:w-full shadow"
                        />
                      </div>


                      <button
                        type="submit"
                        className={`${!isValid ? "bg-gray-200" : "bg-green-panda"
                          } bg-green-panda dark:bg-zinc-800 rounded py-3 w-full`}
                        disabled={!isValid}
                      >
                        Update Information
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const formSchema = Yup.object().shape({
  fullName: Yup.string().required("Required").max(50),
  email: Yup.string().email().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  contactNumber: Yup.number().required("Required").positive().integer(),
});

export default Settings;
