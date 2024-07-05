'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Steps } from 'intro.js-react';
import { useRouter } from 'next/navigation';
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
import Link from 'next/link';
import { FaCircleExclamation, FaComments, FaHandPointUp, FaHouse, FaInfo, FaKey, FaListCheck, FaRegMoon, FaUserXmark } from "react-icons/fa6";
import { RiUserFill, RiLogoutCircleLine } from "react-icons/ri";
import { useDisclosure } from "@nextui-org/react";
import { DeleteUserModal, PassWordModal, SendReportModal } from '@/components/modalUser';
import { UserContext } from '@/contexts/user/UserContext';
import { Steps as Steppers } from '@/utils/tour/customer/steps';
export default function CustomerSidebar() {
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [positions, setPositions] = useState({});
  const { logout } = useContext(UserContext);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("light");
  useEffect(() => {

    if (theme === "dark") {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark')
    }

  }, [theme]);

  const handleChangeTheme = () => {

    setTheme(prevTheme => prevTheme === "light" ? "dark" : 'light');

  };
  const { isOpen: isDeleteUserModalOpen, onOpen: onDeleteUserModalOpen, onOpenChange: onDeleteUserModalChange } = useDisclosure();
  const { isOpen: isChangePasswordModalOpen, onOpen: onChangePasswordModalOpen, onOpenChange: onChangePasswordModalChange } = useDisclosure();
  const { isOpen: isSendReportModalOpen, onOpen: onSendReportModalOpen, onOpenChange: onSendReportModalChange } = useDisclosure();
  const retrieveOneUser = async () => {
    setLoading(true);
    try {
      const userInfo = await fetchUserAttributes();
      setUser({ ...userInfo });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }
  useEffect(() => { retrieveOneUser(); }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      console.log('Scroll position x:', event.target.scrollLeft);
    };

    const container = document.getElementById('sidebar-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const calculatePositions = () => {
      const positions = {};
      const elements = document.querySelectorAll('.item-link');

      elements.forEach((element) => {
        const idMatch = element.className.match(/sidebar-item-selector\d+/);
        if (idMatch) {
          const id = idMatch[0];
          positions[id] = element.getBoundingClientRect().left;
        } else {
          console.warn(`Element ${element} does not match expected class pattern.`);
        }
      });

      setPositions(positions);
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    return () => {
      window.removeEventListener('resize', calculatePositions);
    };
  }, [loading]);

  const handleStartTour = () => {
    const container = document.getElementById('sidebar-container');
    if (container) {
      container.scrollLeft = 0;
    }
    setStepsEnabled(true);
  };

  const handleStepChange = (nextStep) => {
    const container = document.getElementById('sidebar-container');
    const stepClass = `sidebar-item-selector${nextStep + 1}`;
    const position = positions[stepClass];
    
    if (container && position !== undefined) {
      // Calculate container's visible width
      const containerWidth = container.clientWidth;
      // adjust the central element position
      const scrollTo = position - (containerWidth / 2);
      // Set position to scrollLeft of the container
      container.scrollLeft = scrollTo;
    }
  };

  return (
    <div
      id="sidebar-container"
      className="w-full lg:w-[21%] 2xl:w-2/12 lg:h-[calc(100vh-50px)] 2xl:h-[calc(100vh-100px)] rounded-2xl bg-white shadow-lg dark:bg-zinc-800 flex flex-row lg:flex-col items-center justify-between gap-2 overflow-x-auto lg:overflow-x-hidden overflow-y-hidden"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {loading ? (
        <div className='transition-all absolute w-full h-full flex justify-center items-center top-0 overflow-hidden'>
          <div className='loader bg-green-pan' />
        </div>
      ) : (
        <>
          <DeleteUserModal isOpen={isDeleteUserModalOpen} onOpenChange={onDeleteUserModalChange} user={user} />
          <PassWordModal isOpen={isChangePasswordModalOpen} onOpenChange={onChangePasswordModalChange} />
          <SendReportModal isOpen={isSendReportModalOpen} onOpenChange={onSendReportModalChange} />
          <Steps
            enabled={stepsEnabled}
            steps={Steppers}
            initialStep={0}
            onExit={() => setStepsEnabled(false)}
            onChange={handleStepChange}
          />
          <div className="link-container w-full flex flex-row lg:flex-col items-center p-4 gap-2 font-[600]">
            <h4 className='font-bold text-[#40C48E] w-full text-left mb-2 hidden md:block'>Main Menu</h4>
            <div className='item-link w-full flex flex-col gap-y-2 sidebar-item-selector1'>
              <Link href={'/customer'} className={`w-full  rounded-md transition-all hover:bg-emerald-500 flex gap-x-2 hover:text-white text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaHouse />
                Home
              </Link>
            </div>
            <div className='item-link w-full flex flex-col gap-y-2 sidebar-item-selector2'>
              <Link href={'/customer/profile'} className={`w-full  rounded-md transition-all hover:bg-emerald-500 flex gap-x-2 hover:text-white text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <RiUserFill />
                Profile
              </Link>
            </div>
            <div className='item-link w-full flex flex-col gap-y-2 sidebar-item-selector3'>
              <Link href={'/customer/service'} className={`w-full  rounded-md transition-all hover:bg-emerald-500 flex gap-x-2 hover:text-white text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaHandPointUp />
                Service Request
              </Link>
            </div>
            {/* <div className='w-full flex flex-col gap-y-2'>
            <Link href={'/customer/reports'} className={`w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-[16px] items-center p-2 px-3 cursor-pointer`}>
              <FaBug />
              My Reports
            </Link>
          </div> */}
            <div className='item-link w-full flex flex-col gap-y-2 sidebar-item-selector4'>
              <Link href={'/customer/request'} className={`text-center md:text-left w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaListCheck />
                My Requests
              </Link>
            </div>
            <div className='item-link w-full flex flex-col gap-y-2 sidebar-item-selector5'>
              <Link href={'/customer/messages'} className={`w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaComments />
                Messages
              </Link>
            </div>
            <h4 className='font-bold text-[#40C48E] w-full text-left mb-2 hidden md:block'>Additional</h4>
            <div className='w-full flex flex-col gap-y-2 sidebar-item-selector6'>
              <div onClick={handleChangeTheme} className={`text-zinc-950 dark:text-white w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaRegMoon />
                {theme === 'light' ? 'Dark' : 'Light'} Mode
              </div>
            </div>
            <div className='item-link w-full flex flex-col gap-y-2 sidebar-item-selector7'>
              <div onClick={onDeleteUserModalOpen} className={`text-rose-600 w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                <FaUserXmark />
                Delete Account
              </div>
            </div>
            {user['custom:profileCompleted'] ? (
              <>
                <div className='item-link w-full flex flex-col gap-y-2 sidebar-item-selector8'>
                  <div onClick={onChangePasswordModalOpen} className={`text-cyan-600 w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                    <FaKey />
                    Change Password
                  </div>
                </div>
                <div className='item-link w-full flex flex-col gap-y-2 sidebar-item-selector9'>
                  <div onClick={onSendReportModalOpen} className={`text-amber-400 w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                    <FaCircleExclamation />
                    Report
                  </div>
                </div>
                <div className='item-link w-full flex flex-col gap-y-2'>
                  <div onClick={handleStartTour} className={`text-blue-500 w-full rounded-md transition-all hover:bg-emerald-500 hover:text-white flex gap-x-2 text-sm md:text-[16px] items-center p-2 px-3 cursor-pointer`}>
                    <FaInfo />
                    Start Tour
                  </div>
                </div>
              </>
            ) : (
              <p className='text-rose-600'>You need to complete you general information.</p>
            )}

            <div className="w-full flex items-center p-4 ">
              <div
                onClick={async () => {
                  router.replace("/");
                  await signOut();
                  logout();
                }}
                className={`w-full rounded-md  flex gap-x-2 text-[16px] items-center p-2 pt-4 cursor-pointer border-t-[2px] border-[#40C48E] dark:border-zinc-700 `}
              >
                <RiLogoutCircleLine />
                Logout
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
