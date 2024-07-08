"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { uploadData } from "aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";
import {
  RiUserFill,
  RiCalendarTodoFill,
  RiDashboardFill,
  RiLogoutCircleLine,
  RiSettings4Fill,
  RiArrowDownSFill,
  RiArrowRightCircleLine,
  RiHome3Fill,
  RiArrowRightSLine,
} from "react-icons/ri";
import { TbDiamondFilled } from "react-icons/tb";
import Link from "next/link";
import { signOut } from "aws-amplify/auth";
import Cookies from "js-cookie";
import { motion, useAnimationControls } from "framer-motion";
import {
  FaCamera,
  FaCircleExclamation,
  FaKey,
  FaUserXmark,
} from "react-icons/fa6";
import { useDisclosure } from "@nextui-org/react";
import userDefaultProfilePicture from "../../../../public/image/defaultProfilePicture.jpg"
import {
  DeleteUserModal,
  PassWordModal,
  SendReportModal,
  SubscriptionPlanModal,
} from "@/components/modalUser";
import { getCurrentUser } from "aws-amplify/auth";
import Image from "next/image";

const containerVariants = {
  close: {
    // width: "5rem",
    width: "75px",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    // width: "16rem",
    width: "280px",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const iconVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

function UserSidebar({ user }) {
  const router = useRouter();
  const [photograph, setPhotograph] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();
  const iconControls = useAnimationControls();
  const pathName = usePathname();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      iconControls.start("open");
    } else {
      containerControls.start("close");
      iconControls.start("close");
    }
  }, [isOpen]);

  const {
    isOpen: isSubscriptionModalOpen,
    onOpen: onSubscriptionModalOpen,
    onOpenChange: onSubscriptionModalChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteUserModalOpen,
    onOpen: onDeleteUserModalOpen,
    onOpenChange: onDeleteUserModalChange,
  } = useDisclosure();
  const {
    isOpen: isChangePasswordModalOpen,
    onOpen: onChangePasswordModalOpen,
    onOpenChange: onChangePasswordModalChange,
  } = useDisclosure();
  const {
    isOpen: isSendReportModalOpen,
    onOpen: onSendReportModalOpen,
    onOpenChange: onSendReportModalChange,
  } = useDisclosure();
  const [idsPassed, setIdsPassed] = useState({
    idDatabase: "",
    cognitoUsername: "",
  });
  function dataURLtoBlob(dataURL) {
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
  }
  function handleChangePhotograph(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotograph(reader.result);
        handleUpdatePicture(dataURLtoBlob(reader.result));
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
            id: user.id,
            profilePicture: `https://d3nqi6yd86hstw.cloudfront.net/public/${filename}`,
          },
        },
      });
    } catch (error) {
      console.log(`Error from here : ${error}`);
    }
  };
  const handleSubscriptionModal = async () => {
    const userId = user?.id;
    console.log(user);
    const { username } = await getCurrentUser();
    setIdsPassed({
      idDatabase: userId,
      cognitoUsername: username,
    });
    onSubscriptionModalOpen();
  };

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sm:flex hidden">
      <SubscriptionPlanModal
        isOpen={isSubscriptionModalOpen}
        onOpenChange={onSubscriptionModalChange}
        idsPassed={idsPassed}
      />
      <DeleteUserModal
        isOpen={isDeleteUserModalOpen}
        onOpenChange={onDeleteUserModalChange}
        user={user}
      />
      <PassWordModal
        isOpen={isChangePasswordModalOpen}
        onOpenChange={onChangePasswordModalChange}
      />
      <SendReportModal
        isOpen={isSendReportModalOpen}
        onOpenChange={onSendReportModalChange}
      />
      <motion.div
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="lg:relative absolute top-0 left-0 z-10 shadow-lg h-screen  min-h-[75px] w-[280px]  dark:bg-zinc-900 bg-emerald-600 "
      >
        <motion.div
          onClick={handleOpenClose}
          variants={iconVariants}
          animate={iconControls}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="absolute z-50 top-6 -right-[17px] w-[35px] h-[35px] dark:bg-zinc-700 bg-emerald-500 rounded-full flex items-center justify-center cursor-pointer "
        >
          <RiArrowRightSLine
            className="text-[30px] text-white font-bold"
          />
        </motion.div>
        <div className="flex flex-col items-center justify-center px-[15px] py-0 ">
          <div className="h-[90px] flex gap-x-3 items-center justify-start w-full  border-b-[2px] dark:border-zinc-700 border-emerald-500 overflow-x-hidden">
            <div className="flex w-[50px] min-w-[45px] h-[50px] justify-center items-center bg-zinc-200 rounded-xl border-[2px] border-emerald-600">
              <Image
                width={70}
                height={55}
                src="/panda.png"
                className="w-[50px] min-w-[45px] h-[40px] drop-shadow-lg"
                alt="panda_logo"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-[950] drop-shadow-xl overflow-clip whitespace-nowrap tracking-wide text-[22px]">
                The Panda
              </p>
              <span className="text-[17px] overflow-clip whitespace-nowrap tracking-wide dark:text-zinc-400 text-white">
                Technician Panel
              </span>
            </div>
          </div>

          <div className="w-full h-[calc(100vh-110px)] rounded-2xl   text-white flex flex-col items-center justify-between gap-2  overflow-x-hidden">
            <div className="w-full flex flex-col items-center pt-8">
              <div className="w-full flex flex-col gap-y-2  pb-4 mb-4">
                <Link
                  href={"/user"}
                  className={`w-full transition-all rounded-md ${pathName === "/user" ? "dark:bg-zinc-700 bg-emerald-200/90 dark:text-white text-zinc-950" : "" }  flex gap-x-3 text-[16px] items-center py-3 px-3 cursor-pointer`}
                >
                  <RiHome3Fill className="text-[21px] min-w-[24px]" />
                  <span className="overflow-clip whitespace-nowrap tracking-wide text-[15px]">Home Page</span>
                </Link>
                <Link
                  href={"/user/subscription"}
                  className={`w-full rounded-md transition-all ${pathName === "/user/subscription" ? "dark:bg-zinc-700 bg-emerald-200/90 dark:text-white text-zinc-950" : "" }  flex gap-x-3 text-[16px] items-center py-3 px-3 cursor-pointer`}
                >
                  <TbDiamondFilled className="text-[20px] min-w-[24px]" />
                  <span className="overflow-clip whitespace-nowrap tracking-wide text-[15px]">Subscription</span>
                </Link>
                <Link
                  href={"/user/schedule"}
                  className={`w-full rounded-md transition-all ${pathName === "/user/schedule" ? "dark:bg-zinc-700 bg-emerald-200/90 dark:text-white text-zinc-950" : "" }  flex gap-x-3 text-[16px] items-center py-3 px-3 cursor-pointer`}
                >
                  <RiCalendarTodoFill className="text-[21px] min-w-[24px]" />
                  <span className="overflow-clip whitespace-nowrap tracking-wide text-[15px]">Schedule</span>
                </Link>
                <Link
                  href={"/user/requests"}
                  className={`w-full rounded-md transition-all ${pathName === "/user/requests" ? "dark:bg-zinc-700 bg-emerald-200/90 dark:text-white text-zinc-950" : "" }  flex gap-x-3 text-[16px] items-center py-3 px-3 cursor-pointer`}
                >
                  <RiArrowRightCircleLine className="text-[21px] min-w-[24px]" />
                  <span className="overflow-clip whitespace-nowrap tracking-wide text-[15px]">Repair Requests</span>
                </Link>
                <Link
                  href={"/user/finances"}
                  className={`w-full rounded-md transition-all ${pathName === "/user/finances" ? "dark:bg-zinc-700 bg-emerald-200/90 dark:text-white text-zinc-950" : "" }  flex gap-x-3 text-[16px] items-center py-3 px-3 cursor-pointer`}
                >
                  <RiDashboardFill className="text-[21px] min-w-[24px]" />
                  <span className="overflow-clip whitespace-nowrap tracking-wide text-[15px]">Overview</span>
                </Link>
              </div>

              {/* <h4 className='font-bold text-gray-200 w-full text-left mb-2'>Additional</h4> 
                            <div className='w-full flex flex-col gap-y-2  mb-4'>
                                <div onClick={onDeleteUserModalOpen} className={`text-rose-600 w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <FaUserXmark />
                                    Delete Account
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-y-2  mb-4'>
                                <div onClick={onChangePasswordModalOpen} className={`text-cyan-600 w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <FaKey/>
                                    Change Password
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-y-2  mb-4'>
                                <div onClick={onSendReportModalOpen} className={`text-amber-400 w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
                                    <FaCircleExclamation />
                                    Report an issue
                                </div>
                            </div> */}
            </div>
            <div className="w-full flex flex-col items-center pb-3">
              <div className="w-full flex flex-col gap-y-2  mb-4">
                <Link
                  href={"/user/settings"}
                  className={`w-full rounded-md  flex gap-x-3 text-[16px] items-center p-2  cursor-pointer`}
                >
                  <div className="w-[30px] min-w-[30px] h-[30px]">
                    <Image
                        src={user.profilePictureUrl ? user.profilePictureUrl : userDefaultProfilePicture}
                        alt={`profile picture`}
                        width={30}
                        height={30}
                        className="rounded-full object-cover shadow-md"
                    />
                  </div>
                  <span className="overflow-clip whitespace-nowrap tracking-wide text-[15px]">Setting</span>
                </Link>
              </div>
              <div
                onClick={() => {
                  Cookies.remove("currentUser");
                  signOut();
                  router.replace("/");
                }}
                className={`w-full rounded-md  flex gap-x-3 text-[16px] items-center p-2 pt-4 cursor-pointer border-t-[2px] dark:border-zinc-700 border-emerald-500 `}
              >
                <RiLogoutCircleLine className="text-[21px] min-w-[30px]" />
                <span className="overflow-clip whitespace-nowrap tracking-wide text-[15px]">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UserSidebar;
