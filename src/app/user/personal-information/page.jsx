"use client";

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { FaCamera } from "react-icons/fa6";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { statesUSA } from "@/assets/data/StatesUSA";
import {
  RiArrowDropRightLine,
  RiMailOpenFill,
  RiAlertFill,
} from "react-icons/ri";
import { Contexto } from "../layout";
import { handleRetrieveTechnician } from "@/api";

const PersonalInformation = () => {
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [photograph, setPhotograph] = useState(null);
  const { user } = useContext(Contexto);

  const dataURLtoBlob = (dataURL) => {
    if (!dataURL) {
      return null;
    }
    var parts = dataURL.split(";base64,");
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };
  const handleChangePhotograph = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotograph(reader.result);
        handleUpdatePicture(dataURLtoBlob(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };
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
    } catch (error) {
      console.log(`Error from here : ${error}`);
    }
  };

  const onHandleSubmit = async (values, { setSubmitting }) => {
    // setSubmitting(true);
    // try {
    //   await updateUserAttributes({
    //     userAttributes: {
    //       "custom:fullName": values.fullName,
    //       "custom:address": values.address,
    //       "custom:city": values.city,
    //       "custom:state": values.state,
    //       "custom:phoneNumber": values.contactNumber,
    //       "custom:zipCode": values.zipCode,
    //     },
    //   });
    //   await client.graphql({
    //     query: updateInformation,
    //     variables: {
    //       email: values.email,
    //       input: {
    //         id: user.dbId,
    //         ...values,
    //       },
    //     },
    //   });
    //   await retrieveOneUser();
    //   toast.success("Updated successfully.");
    // } catch (error) {
    //   console.log(error);
    //   toast.error(`Error during the process.`);
    // }
  };

  useEffect(() => {
    const validatePage = async () => {
      try {
        const data = await handleRetrieveTechnician(user.sub);
        console.log(data);
        if (!user?.profileCompleted || user?.profileCompleted == "false") {
          setProfileCompleted(false);
          setLoading(false);
        } else {
          setProfileCompleted(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    validatePage();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
      <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll flex flex-col px-4 bg-zinc-800 rounded-xl pt-4 pb-8">
        <div className="w-full mb-6">
          <div className="w-[320px] bg-zinc-700 rounded-2xl flex items-center justify-center p-2 ">
            <Link href={"/user"} className="text-zinc-400">
              Technician panel
            </Link>
            <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
            <Link href={"/user"} className="text-zinc-400">
              Profile
            </Link>
            <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
            <Link href={"/user/personal-information"} className="text-white">
              Information
            </Link>
          </div>
        </div>

        <div className="w-full text-white flex flex-col mb-6">
          <h4 className="w-full text-[24px] font-bold mb-2">
            Review and Update your personal information details
          </h4>
          <span className="text-gray-300">
            Make sure this data is up to date, as it will be used so customers
            can find you quickly.{" "}
          </span>
        </div>

        <div className="w-[800px] flex flex-col ">
          <div className="w-full flex gap-x-3 border-b-[2px] border-zinc-700 pb-3 ">
            {loading ? (
              <div className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] rounded-full shadow-md bg-zinc-700 animate-pulse"></div>
            ) : (
              <div className="relative w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] overflow-hidden rounded-full shadow-md group">
                <div className="absolute bg-black group-hover:opacity-60 opacity-0 w-full h-full transition-all">
                  <div className="flex justify-center items-center h-full">
                    <FaCamera className="text-white text-xl md:text-4xl" />
                  </div>
                </div>
                <img
                  src={
                    photograph
                      ? photograph
                      : user.profilePicture
                      ? user.profilePicture
                      : "/image/defaultProfilePicture.jpg"
                  }
                  className="rounded-full w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] cursor-pointer "
                  alt="Profile Picture"
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
            )}

            {loading ? (
              <div className="flex flex-col gap-2 justify-center animate-pulse">
                <div className="bg-zinc-700 text-transparent text-[25px] font-bold rounded-lg">
                  HERE name testing
                </div>
                <div className="bg-zinc-700 text-transparent rounded-lg">HERE EMAIL TESTING</div>
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <div className="text-white text-[25px] font-bold">
                  {user["custom:fullName"]
                    ? user["custom:fullName"]
                    : user?.name}
                </div>
                <div className="text-gray-200">{user?.email}</div>
              </div>
            )}
          </div>
          {!profileCompleted && (
            <div className="text-[20px] text-gray-100 pt-3 font-bold">
              Complete this fields:
            </div>
          )}
          <Formik
            initialValues={{
              address: user["custom:address"] || "",
              city: user["custom:city"] || "",
              state: user["custom:state"] || "",
              zipCode: user["custom:zipCode"] || 0,
              contactNumber: user["custom:phoneNumber"] || 0,
              status: "active",
            }}
            onSubmit={onHandleSubmit}
          >
            {({ isValid }) => {
              return (
                <Form
                  className="w-full h-full flex flex-col"
                  autoComplete="off"
                >
                  <div className="flex flex-col pt-3 text-white border-b-[2px] border-zinc-700 pb-3">
                    <div className="mb-2">State you are in</div>
                    <div className="w-full md:w-2/4 md:mb-0">
                      <Field
                        as="select"
                        name="state"
                        className={`block appearance-none w-full bg-zinc-800 border-zinc-500 border-[1px]
                        text-white py-3 px-4 rounded leading-tight focus:outline-none focus:bg-zinc-700 focus:border-gray-500`}
                      >
                        {statesUSA.map((estado, index) => (
                          <option key={index} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <div className="flex flex-col pt-5 text-white border-b-[2px] border-zinc-700 pb-3">
                    <div className="mb-2">Your city</div>
                    <div className="w-full md:w-2/4 md:mb-0">
                      <Field
                        className={`appearance-none block w-full bg-zinc-800 text-white border-[1px] border-zinc-500
                        rounded py-3 px-4 leading-tight focus:outline-none focus:bg-zinc-700 focus:border-gray-500`}
                        type="text"
                        placeholder="Complete this field"
                        name="city"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col pt-5 text-white border-b-[2px] border-zinc-700 pb-3">
                    <div className="mb-2">Your address</div>
                    <div className="w-full md:w-2/4 md:mb-0">
                      <Field
                        className={`appearance-none block w-full bg-zinc-800 text-white border-[1px] border-zinc-500
                        rounded py-3 px-4 leading-tight focus:outline-none focus:bg-zinc-700 focus:border-gray-500`}
                        type="text"
                        placeholder="Complete this field"
                        name="address"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col pt-5 text-white border-b-[2px] border-zinc-700 pb-3">
                    <div className="mb-2">Your zipCode</div>
                    <div className="w-full md:w-2/4 md:mb-0">
                      <Field
                        className={`appearance-none block w-full bg-zinc-800 text-white border-[1px] border-zinc-500
                        rounded py-3 px-4 leading-tight focus:outline-none focus:bg-zinc-700 focus:border-gray-500`}
                        type="text"
                        placeholder="Complete this field"
                        name="zipCode"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col pt-5 text-white  pb-3 mb-4">
                    <div className="mb-2">Your Phone Number</div>
                    <div className="w-full md:w-2/4 md:mb-0">
                      <Field
                        className={`appearance-none block w-full bg-zinc-800 text-white border-[1px] border-zinc-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-zinc-700 focus:border-gray-500`}
                        type="text"
                        placeholder="Complete this field"
                        name="contactNumber"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className={`bg-emerald-500 hover:bg-emerald-600 p-3 px-5 rounded-lg text-white font-bold  transition-all`}
                    >
                      Save Information
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
