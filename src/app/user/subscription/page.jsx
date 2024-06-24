"use client";

import React, { useContext, useEffect, useState } from "react";
import { Contexto } from "../layout";
import dayjs from "dayjs";
import Link from "next/link";
import {
  RiArrowDropRightLine,
  RiMailOpenFill,
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleFill 
} from "react-icons/ri";
import { BsCalendar2Check } from "react-icons/bs";
import Stripe from "stripe";
import { useRouter } from "next/navigation";
import { getStripeInformationTechnician, getSubscriptionExpirationDate } from "@/graphql/users/query/technician";
import { getCurrentUser } from "aws-amplify/auth";
import SubscriptionPlan from "@/components/modalUser/SubscriptionPlan";
import { useDisclosure } from "@nextui-org/react";
import { client } from "@/contexts/AmplifyContext";
import { Button } from "@nextui-org/react";
import { updateUserAttributes } from "aws-amplify/auth";
import { handleUpdateStripeInformationTechnician } from "@/api";

const Subscription = () => {
  const { user } = useContext(Contexto);
  const [stripeId, setStripeId] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingRetrieving, setLoadingRetrieving] = useState(false);
  const [username, setUsername] = useState(null);
  const [idsPassed, setIdsPassed] = useState(null);
  const [stripeAccountStatus, setStripeAccountStatus] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [differenceDays, setDifferenceDays] = useState(null);
  console.log("usseeeeeeeeeeeeeeeer", user);
  const router = useRouter();

  const {
    isOpen: isSubscriptionPlanModalOpen,
    onOpen: onSubscriptionPlanModalOpen,
    onOpenChange: onSubscriptionPlanModalOpenChange,
  } = useDisclosure();

  const TEST_SECRET_KEY =
    "sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf";
  const stripe = new Stripe(TEST_SECRET_KEY);

  const retrieveData = async () => {
    setLoadingRetrieving(true);
    try {
        const { username } = await getCurrentUser();
        console.log("perri aca que onda..");
        if(user["custom:subscription"] !== "free"){
          console.log("dentro de la condicion perrita")
          const {data} = await client.graphql({
            query: getSubscriptionExpirationDate,
            variables: {
              id: user.sub,
            },
          });
          const date = dayjs(data?.getTechnician?.subscriptionExpirationDate);
          const now = dayjs();
          const difference = date.diff(now, 'day');
          setDifferenceDays(difference);
          setFormattedDate({
            month: date.format('MM'),
            day: date.format('DD'),
            year: date.format('YYYY')
          });
        }    
        setUsername(username); 
        setLoadingRetrieving(false);
    } catch (error) {
        console.log(error);
        setLoadingRetrieving(false);
    }
  };

  useEffect(() => {
    if (user["custom:stripeId"] && user["custom:stripeAccountStatus"]) {
      setStripeId(user["custom:stripeId"]);
      setStripeAccountStatus(user["custom:stripeAccountStatus"]);
    }
  }, [user]);

  useEffect(()=>{
    retrieveData();
  },[]);

  const handleCreateAccount = async () => {
    try {
      setLoadingCreate(true);
      const account = await stripe.accounts.create({
        type: "express",
        capabilities: {
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
        },
        business_type: "individual",
        metadata: { technicianId: user.sub, cognitoUsername: username },
        email: user.email,
      });

      const response = await handleUpdateStripeInformationTechnician({
        id: user.sub,
        stripeId: account.id,
        stripeAccountStatus: "incomplete",
      });
      console.log("stripe updated in database", response);

      const cognitoResponse = await updateUserAttributes({
        userAttributes: {
          "custom:stripeId": account.id,
          "custom:stripeAccountStatus": "incomplete",
        },
      });
      console.log("Despues de guardar en cognito ", cognitoResponse);

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: "https://master.d3dtglewderhtg.amplifyapp.com/user",
        return_url: "https://master.d3dtglewderhtg.amplifyapp.com/user/subscription",
        type: "account_onboarding",
      });
      console.log("El proceso fue correcto paso2", accountLink);
      if (accountLink.url) {
        router.push(accountLink.url);
      }
      setLoadingCreate(false);
    } catch (error) {
      console.log(error);
      setLoadingCreate(false);
    }
  };

  const handleContinueOnboarding = async () => {
    if (stripeId) {
      try {
        const accountLink = await stripe.accountLinks.create({
          account: stripeId,
          refresh_url: "https://master.d3dtglewderhtg.amplifyapp.com/user",
          return_url: "https://master.d3dtglewderhtg.amplifyapp.com/user/subscription",
          type: "account_onboarding",
        });
        if (accountLink.url) {
          router.push(accountLink.url);
        }
      } catch (error) {
        console.error("Error continuing onboarding: ", error);
      }
    }
  };

  const handleUpgrade = () => {
    setIdsPassed({
      idDatabase : user.sub,
      cognitoUsername : username
    });
    onSubscriptionPlanModalOpen();
  }

  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
      <div className="w-full h-[calc(100vh-100px)] flex flex-col px-4 dark:bg-zinc-800 bg-zinc-100 dark:shadow-none  shadow-lg shadow-zinc-400 rounded-xl pt-4">
        <div className="w-full mb-6">
          <div className="w-[270px] dark:bg-zinc-700 bg-zinc-300 rounded-2xl flex items-center justify-center p-2 ">
            <Link
              href={"/user"}
              className="dark:text-zinc-400 text-zinc-600 text-[14px]"
            >
              Technician panel
            </Link>
            <RiArrowDropRightLine className="dark:text-zinc-400 text-zinc-600 text-[25px] " />
            <Link
              href={"user/subscription"}
              className="dark:text-white text-black text-[14px]"
            >
              Subscription
            </Link>
          </div>
        </div>
        <div className="w-full  flex flex-col mb-6">
          <h4 className="w-full text-[24px] font-bold mb-2">My subscription</h4>
          <span className="dark:text-gray-300 text-zinc-700">
            Here is the information about your current subscription, expiration,
            price and benefits.
          </span>
        </div>
        <div className="w-full px-20 flex flex-col justify-center">
          <div className="w-full flex flex-col  gap-y-3">
            {!stripeAccountStatus ? (
              <div className="w-full dark:bg-red-500/40 bg-red-600/80 text-zinc-200 p-3 text-[15px] flex justify-between gap-x-2 items-center shadow-md mb-4">
                <div className="flex flex-col gap-y-1  justify-center">
                  <div className="flex items-center gap-x-1">
                    <RiAlertFill className="dark:text-red-400 text-red-200 text-[25px]" />
                    <span className="text-white font-bold text-[16px]">
                      Stripe Account:{" "}
                      <span className="text-zinc-200 text-[14px]">
                        (required)
                      </span>
                    </span>
                  </div>
                  <div className="px-2">
                    You need to create your account in Stripe to be able to
                    receive payments for the services you provide
                  </div>
                </div>
                <Button
                  isLoading={loadingCreate}
                  isDisabled={loadingCreate || loadingRetrieving}
                  onClick={handleCreateAccount}
                  className="w-[180px] py-1 dark:bg-red-300/20 bg-red-300/30 border-red-600/50 border-[1px] text-white rounded-md shadow-sm cursor-pointer"
                >
                  Create Account
                </Button>
              </div>
            ) : stripeAccountStatus === "incomplete" ||
              stripeAccountStatus === "pending_verification" ? (
              <div className="w-full dark:bg-red-500/40 bg-red-600/80 text-zinc-200 p-3 text-[15px] flex justify-between items-center shadow-md mb-4">
                <div className="flex flex-col gap-y-1  justify-center">
                  <div className="flex items-center gap-x-1">
                    <RiAlertFill className="dark:text-red-400 text-red-200 text-[25px]" />
                    <span className="text-white font-bold text-[16px]">
                      Stripe Account:{" "}
                      <span className="text-zinc-200 text-[14px]">
                        (required)
                      </span>
                    </span>
                  </div>
                  <div className="px-2">
                    You need to complete the account creation process
                  </div>
                </div>
                <Button
                  onClick={handleContinueOnboarding}
                  className="px-3 py-1 dark:bg-red-300/20 bg-red-300/30 border-red-600/50 border-[1px] text-white rounded-md shadow-sm cursor-pointer"
                >
                  Complete Creation
                </Button>
              </div>
            ) : (
              <div className="w-full dark:bg-green-400/40 bg-emerald-500/60  p-3 text-[15px] flex justify-between items-center shadow-md mb-4">
                <div className="flex flex-col gap-y-1  justify-center">
                  <div className="flex items-center gap-x-1">
                    <RiCheckboxCircleFill className="dark:text-green-400 text-emerald-100 text-[27px]" />
                    <span className=" font-bold text-[16px]">
                      Stripe Account:{" "}
                      <span className="dark:text-zinc-200 text-zinc-700 text-[14px]">
                        (required)
                      </span>
                    </span>
                  </div>
                  <div className="px-2">
                    Your account is ready to receive payments
                  </div>
                </div>
                <button className="dark:bg-green-300/30 bg-emerald-200/50 px-4 py-2 rounded-lg   border-green-500/50 border-[1px]">
                  Account details
                </button>
              </div>
            )}

            <div className=" w-full flex flex-col">
              <div className="w-full dark:text-zinc-300 text-zinc-800 mb-2">
                Current Plan
              </div>
              <div className="w-full flex items-center justify-between border-b-[1px] pb-3 border-zinc-700 mb-6">
                <div className="flex gap-x-3 items-center text-[35px]  font-bold">
                  <BsCalendar2Check className="dark:text-zinc-400 text-zinc-700" />
                  {
                    user["custom:subscription"] === "free" ? "Free Plan" : user["custom:subscription"] === "annual" ? "Annualy Plan" : "Monthly Plan"
                  }
                </div>
                {user["custom:subscription"] === "free" ? (
                  <Button isDisabled={loadingRetrieving} onClick={handleUpgrade} className="py-2 px-4 rounded-xl bg-emerald-600 text-white cursor-pointer">
                    Upgrade
                  </Button>
                ) : (
                  <div className="py-2 px-4 rounded-xl bg-emerald-600 text-white cursor-pointer">
                    Renew Plan
                  </div>
                )}
              </div>
              <div className="w-full flex ">
                <div className="w-1/4 flex flex-col py-2 px-8">
                  <span className="text-[16px] dark:text-zinc-300 text-zinc-700 mb-3">
                    Devices
                  </span>
                  <span className="text-[28px] font-semibold dark:text-emerald-300 text-emerald-600">
                    3
                  </span>
                  <span className="dark:text-zinc-400 text-zinc-700">
                    You can use up to 3 devices with your account
                  </span>
                  <span className="dark:text-emerald-400 text-emerald-500 font-semibold cursor-pointer">
                    Device Management
                  </span>
                </div>
                <div className="w-1/4 flex flex-col py-2 px-8">
                  <span className="text-[16px] dark:text-zinc-300 text-zinc-700 mb-3">
                    Active devices
                  </span>
                  <span className="text-[28px] font-semibold dark:text-emerald-300 text-emerald-600">
                    1 / 3
                  </span>
                  <span className="dark:text-zinc-400 text-zinc-700">
                    Currently you have 1 active devices
                  </span>
                  <span className="dark:text-emerald-400 text-emerald-500 font-semibold cursor-pointer">
                    Device Management
                  </span>
                </div>
                <div className="w-1/4 flex flex-col py-2 px-8">
                  <span className="text-[16px] dark:text-zinc-300 text-zinc-700 mb-3">
                    Renewal date
                  </span>
                  <div className="text-[22px] flex font-semibold items-center gap-x-2 dark:text-emerald-300 text-emerald-600">
                    <RiAlertFill className="dark:text-emerald-500 text-emerald-600 text-[30px]" />{" "}
                    { formattedDate?.month ? formattedDate.month : "-" }
                    <RiCheckboxBlankCircleFill  className="dark:text-emerald-400 text-emerald-600 text-[8px]" />
                    { formattedDate?.day ? formattedDate.day : "-" }
                    <RiCheckboxBlankCircleFill  className="dark:text-emerald-400 text-emerald-600 text-[8px]" />
                    { formattedDate?.year ? formattedDate.year : "-" }
                  </div>
                  <span className="dark:text-zinc-400 text-zinc-700">
                  {  user["custom:subscription"] === "free" ? "Unlimited plan" : differenceDays ? `Expires in ${differenceDays} days` : "We couldn't find the information" }
                  </span>
                </div>
                <div className="w-1/4 flex flex-col py-2 px-8">
                  <span className="text-[16px] dark:text-zinc-300 text-zinc-700 mb-3">
                    Renewal Amount
                  </span>
                  <span className="text-[28px] font-semibold dark:text-emerald-300 text-emerald-600">
                    $ {  user["custom:subscription"] === "free" ? "0" : user["custom:subscription"] === "annual" ? "5,000.00" : "500.00" }
                  </span>
                  <span className="dark:text-zinc-400 text-zinc-700">
                    { user["custom:subscription"] === "free" ? "Free Plan" : user["custom:subscription"] === "annual" ? "Annualy Plan" : "Monthly Plan" }
                  </span>
                  <span className="dark:text-emerald-400 text-emerald-500 font-semibold cursor-pointer">
                    See past invoices
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubscriptionPlan isOpen={isSubscriptionPlanModalOpen} onOpenChange={onSubscriptionPlanModalOpenChange} idsPassed={idsPassed}/>
    </div>
  );
};

export default Subscription;
