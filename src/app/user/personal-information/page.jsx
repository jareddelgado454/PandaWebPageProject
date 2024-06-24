"use client";

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { uploadData } from "aws-amplify/storage";
import { v4 as uuidv4 } from 'uuid';
import { FaCamera } from "react-icons/fa6";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { statesUSA } from "@/assets/data/StatesUSA";
import { updateUserAttributes } from "aws-amplify/auth";
import {
  RiArrowDropRightLine,
  RiErrorWarningFill,
} from "react-icons/ri";
import { Contexto } from "../layout";
import { handleRetrieveTechnician } from "@/api";
import { updatePersonalInformationTechnician } from "@/graphql/users/mutation/technicians";
import { client } from "@/contexts/AmplifyContext";
import { dataURLtoBlob } from "@/utils/photo/BlobImage";
import ProfileCompleted from "@/components/userComponents/technician/ProfileCompleted";

const PersonalInformation = () => {
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [photograph, setPhotograph] = useState(null);
  const [stateUSA, setStateUSA] = useState("");
  const [userDataBase, setUserDataBase] = useState(null);
  const [errorUploadingData, setErrorUploadingData] = useState(false);
  const [upLoadingInformation, setUploadingInformation] = useState(false);

  const [isEditing, setIsEditing] = useState(null);
  const [infoEditing, setInfoEditing] = useState(null);

  const { user } = useContext(Contexto);
  console.log(user);

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
        query: updatePersonalInformationTechnician,
        variables: {
          id: user.sub,
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

  const onHandleSubmit = async (values, { setSubmitting }) => {
    console.log("valueeeeeeeeeeeeeeeees,", values);
    console.log("state selected..", statesUSA[stateUSA]);
    if (
      values.address !== "" &&
      values.city !== "" &&
      values.contactNumber !== "" &&
      values.zipCode !== "" &&
      stateUSA !== ""
    ) {
      setErrorUploadingData(false);
      console.log("Todos los campos estan completos correctamente");
      setUploadingInformation(true);
      setSubmitting(true);
      console.log("user sssuuuuuub", user.sub);
      try {
        await client.graphql({
          query: updatePersonalInformationTechnician,
          variables: {
            id: user.sub,
            input: {
              id: user.sub,
              state: statesUSA[stateUSA],
              ...values,
            },
          },
        });
        await updateUserAttributes({
          userAttributes: {
            "custom:infoCompleted": "true",
          },
        });
        setUploadingInformation(false);
        setUserDataBase({
          id: user.sub,
          state: statesUSA[stateUSA],
          ...values,
        });
        setProfileCompleted(true);
        console.log("usuario cambiado correctamente");
      } catch (error) {
        console.log(error);
        setUploadingInformation(false);
      }
    } else {
      console.log("Completa los campos que faltan");
      setErrorUploadingData(true);
    }

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

  // When Personal Information is completed
  const handleUpdateInfo = async () => {
    console.log("valueeeeee", infoEditing);
  }
  //....

  useEffect(() => {
    const validatePage = async () => {
      try {
        const data = await handleRetrieveTechnician(user.sub);
        console.log("data from db", data.getTechnician);
        setUserDataBase(data.getTechnician);
        if (user["custom:infoCompleted"] === "false") {
          setProfileCompleted(false);
          setLoading(false);
          console.log("La info esta incompletaaaaaaaaaaaaa");
        } else {
          setProfileCompleted(true);
          setLoading(false);
          console.log("La info esta completaaaaaaaaaaaaa");
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
            <Link href={"/user"} className="text-zinc-400 text-[14px]">
              Technician panel
            </Link>
            <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
            <Link href={"/user"} className="text-zinc-400 text-[14px]">
              Profile
            </Link>
            <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
            <Link href={"/user/personal-information"} className="text-white text-[14px]">
              Information
            </Link>
          </div>
        </div>

        <div className="w-full text-white flex flex-col mb-6">
          <h4 className="w-full text-[24px] font-bold mb-2">
            Review and Update your personal information details
          </h4>
          <span className="text-gray-300 text-[15px]">
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
                  src={photograph ? photograph : (userDataBase.profilePicture ? userDataBase.profilePicture : "/image/defaultProfilePicture.jpg")}
                  className="rounded-full w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] cursor-pointer border-[3px] border-zinc-600/60"
                  alt="Profile Picture "
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
                <div className="bg-zinc-700 text-transparent rounded-lg">
                  HERE EMAIL TESTING
                </div>
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
          {loading ? (
            <div className="bg-zinc-600 w-[250px] text-[20px] text-transparent pt-3 font-bold rounded-lg animate-pulse">
              Completing Fields
            </div>
          ) : (
            <div className="text-[20px] text-gray-100 pt-3 font-bold">
              {!profileCompleted
                ? "Complete this fields:"
                : "Your Personal Information"}
            </div>
          )}
          {loading ? (
            <div className="w-full h-full flex flex-col">
              <div className="flex flex-col pt-3 text-transparent border-b-[2px] border-zinc-700 pb-3 animate-pulse">
                <div
                  className={`mb-2 text-transparent bg-zinc-700 rounded-lg w-[100px] animate-pulse`}
                >
                  Text test
                </div>
                <div className="w-full md:w-2/4 md:mb-0 h-[40px] bg-zinc-600 rounded-lg animate-pulse"></div>
              </div>
              <div className="flex flex-col pt-3 text-transparent border-b-[2px] border-zinc-700 pb-3 animate-pulse">
                <div
                  className={`mb-2 text-transparent bg-zinc-700 rounded-lg w-[100px] animate-pulse`}
                >
                  Text test
                </div>
                <div className="w-full md:w-2/4 md:mb-0 h-[40px] bg-zinc-700 rounded-lg animate-pulse"></div>
              </div>
              <div className="flex flex-col pt-3 text-transparent border-b-[2px] border-zinc-700 pb-3 animate-pulse">
                <div
                  className={`mb-2 text-transparent bg-zinc-700 rounded-lg w-[100px] animate-pulse`}
                >
                  Text test
                </div>
                <div className="w-full md:w-2/4 md:mb-0 h-[40px] bg-zinc-600 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ) : (
            <>
              {profileCompleted ? (
                <ProfileCompleted userDataBase={userDataBase} setUserDataBase={setUserDataBase}/>
              ) : (
                <Formik
                  initialValues={{
                    address: "",
                    city: "",
                    zipCode: "",
                    contactNumber: "",
                    status: "active",
                  }}
                  onSubmit={onHandleSubmit}
                >
                  {({ isValid }) => {
                    return (
                      <Form
                        className={`w-full h-full flex flex-col`}
                        autoComplete="off"
                      >
                        <div className="flex flex-col pt-3 text-white border-b-[2px] border-zinc-700 pb-3">
                          <div className={`mb-2`}>
                            <span className="text-red-400">* </span>State you
                            are in:
                          </div>

                          <div className="w-full md:w-2/4 md:mb-0">
                            <Select
                              variant={"bordered"}
                              label="Complete this field"
                              className="w-full text-white"
                              selectedKeys={[stateUSA]}
                              onChange={(e) => setStateUSA(e.target.value)}
                            >
                              {statesUSA.map((stateUSA, index) => (
                                <SelectItem
                                  key={index}
                                  value={stateUSA}
                                  style={{ color: "#E1E0DD" }}
                                >
                                  {stateUSA}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                        </div>
                        <div className="flex flex-col pt-5 text-white border-b-[2px] border-zinc-700 pb-3">
                          <div className={`mb-2`}>
                            <span className="text-red-400">* </span>Your city:
                          </div>
                          <div className="w-full md:w-2/4 md:mb-0">
                            <Field
                              className={`appearance-none block w-full bg-zinc-800 text-white border-[1px] border-zinc-500
                        rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-zinc-700 focus:border-gray-500`}
                              type="text"
                              placeholder="Complete this field"
                              name="city"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col pt-5 text-white border-b-[2px] border-zinc-700 pb-3">
                          <div className="mb-2">
                            <span className="text-red-400">* </span>Your
                            address:
                          </div>
                          <div className="w-full md:w-2/4 md:mb-0">
                            <Field
                              className={`appearance-none block w-full bg-zinc-800 text-white border-[1px] border-zinc-500
                        rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-zinc-700 focus:border-gray-500`}
                              type="text"
                              placeholder="Complete this field"
                              name="address"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col pt-5 text-white border-b-[2px] border-zinc-700 pb-3">
                          <div className="mb-2">
                            <span className="text-red-400">* </span>Your
                            zipCode:
                          </div>
                          <div className="w-full md:w-2/4 md:mb-0">
                            <Field
                              className={`appearance-none block w-full bg-zinc-800 text-white border-[1px] border-zinc-500
                        rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-zinc-700 focus:border-gray-500`}
                              type="text"
                              placeholder="Complete this field"
                              name="zipCode"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col pt-5 text-white  pb-3 mb-4">
                          <div className="mb-2">
                            <span className="text-red-400">* </span>Your Phone
                            Number:
                          </div>
                          <div className="w-full md:w-2/4 md:mb-0">
                            <Field
                              className={`appearance-none block w-full bg-zinc-800 text-white border-[1px] border-zinc-500 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-zinc-700 focus:border-gray-500`}
                              type="text"
                              placeholder="Complete this field"
                              name="contactNumber"
                            />
                          </div>
                        </div>
                        {errorUploadingData && (
                          <div className="bg-red-500 text-white text-[17px] font-semibold p-3 mb-4 flex items-center gap-x-1">
                            <RiErrorWarningFill className="text-red-300 text-[25px]" />
                            You need to complete all fields to save your
                            information.
                          </div>
                        )}
                        <div>
                          <Button
                            isLoading={upLoadingInformation}
                            isDisabled={upLoadingInformation}
                            type="submit"
                            className={`bg-emerald-500 hover:bg-emerald-600 p-3 px-5 rounded-lg text-white font-bold  transition-all`}
                          >
                            Save Information
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
