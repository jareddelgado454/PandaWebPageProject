"use client";

import React, { useContext, useEffect, useState } from "react";
import { Contexto } from "../layout";
import Link from "next/link";
import {
  RiArrowDropRightLine,
  RiMailOpenFill,
  RiAlertFill,
  RiCheckboxCircleFill 
} from "react-icons/ri";
import { BsCalendar2Check } from "react-icons/bs";
import Stripe from "stripe";
import { useRouter } from "next/navigation";
import { getStripeInformationTechnician } from "@/graphql/users/query/technician";
import { getCurrentUser } from "aws-amplify/auth";
import { client } from "@/contexts/AmplifyContext";
import { Button } from "@nextui-org/react";
import { updateUserAttributes } from "aws-amplify/auth";
import { handleUpdateStripeInformationTechnician } from "@/api";

const Subscription = () => {
  const { user } = useContext(Contexto);
  const [stripeId, setStripeId] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [stripeAccountStatus, setStripeAccountStatus] = useState(null);
  console.log("usseeeeeeeeeeeeeeeer", user);
  const router = useRouter();

  const TEST_SECRET_KEY =
    "sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf";
  const stripe = new Stripe(TEST_SECRET_KEY);

  // const retrieveData = async () => {
  //   const response = await client.graphql({
  //     query: getStripeInformationTechnician,
  //     variables: {
  //       id: user.sub,
  //     },
  //   });
  //   console.log(response);
  //   const technicianData = response.data.getTechnician;
  //   if (technicianData.stripeId) {
  //     console.log("No hay id perri");
  //     setStripeId(technicianData.stripeId);
  //   }
  //   if (technicianData.stripeAccountStatus) {
  //     setStripeAccountStatus(technicianData.stripeAccountStatus);
  //   }
  // };

  useEffect(() => {
    // retrieveData();
    if (user["custom:stripeId"] && user["custom:stripeAccountStatus"]) {
      setStripeId(user["custom:stripeId"]);
      setStripeAccountStatus(user["custom:stripeAccountStatus"]);
    }
  }, [user]);

  const handleCreateAccount = async () => {
    try {
      setLoadingCreate(true);
      const { username } = await getCurrentUser();
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
        refresh_url: "http://localhost:3000/user",
        return_url: "http://localhost:3000/user/subscription",
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

  return (
    <div className="w-full h-[calc(100vh-100px)] relative pr-[20px]">
      <div className="w-full h-[calc(100vh-100px)] flex flex-col px-4 bg-zinc-800 rounded-xl pt-4">
        <div className="w-full mb-6">
          <div className="w-[270px] bg-zinc-700 rounded-2xl flex items-center justify-center p-2 ">
            <Link href={"/user"} className="text-zinc-400 text-[14px]">
              Technician panel
            </Link>
            <RiArrowDropRightLine className="text-zinc-400 text-[25px] " />
            <Link href={"user/subscription"} className="text-white text-[14px]">
              Subscription
            </Link>
          </div>
        </div>
        <div className="w-full text-white flex flex-col mb-6">
          <h4 className="w-full text-[24px] font-bold mb-2">My subscription</h4>
          <span className="text-gray-300">
            Here is the information about your current subscription, expiration,
            price and benefits.
          </span>
        </div>
        <div className="w-full px-20 flex flex-col justify-center">
          <div className="w-full flex flex-col  gap-y-3">
            {!stripeAccountStatus ? (
              <div className="w-full bg-red-500/40 text-zinc-200 p-3 text-[15px] flex justify-between gap-x-2 items-center shadow-md mb-4">
                  <div className="flex flex-col gap-y-1  justify-center">
                    <div className="flex items-center gap-x-1">
                      <RiAlertFill className="text-red-400 text-[25px]" />
                      <span className="text-white font-bold text-[16px]">
                          Stripe Account: <span className="text-zinc-200 text-[14px]">(required)</span>
                      </span>
                    </div>
                    <div className="px-2">
                      You need to create your account in Stripe to be able to
                      receive payments for the services you provide
                    </div>
                  </div>
                <Button
                  isLoading={loadingCreate}
                  isDisabled={loadingCreate}
                  onClick={handleCreateAccount}
                  className="w-[180px] py-1 bg-red-300/20 border-red-600/50 border-[1px] text-white rounded-md shadow-sm cursor-pointer"
                >
                  Create Account
                </Button>
              </div>
            ) : stripeAccountStatus === "incomplete" ||
              stripeAccountStatus === "pending_verification" ? (
              <div className="w-full bg-red-500/40 text-zinc-200 p-3 text-[15px] flex justify-between items-center shadow-md mb-4">
                <div className="flex flex-col gap-y-1  justify-center">
                    <div className="flex items-center gap-x-1">
                      <RiAlertFill className="text-red-400 text-[25px]" />
                      <span className="text-white font-bold text-[16px]">
                          Stripe Account: <span className="text-zinc-200 text-[14px]">(required)</span>
                      </span>
                    </div>
                    <div className="px-2">
                      You need to complete the account creation process
                    </div>
                  </div>
                <Button
                  onClick={handleContinueOnboarding}
                  className="px-3 py-1 bg-red-300/20 border-red-600/50 border-[1px] text-white rounded-md shadow-sm cursor-pointer"
                >
                  Complete Creation
                </Button>
              </div>
            ) : (
              <div className="w-full bg-green-400/40 text-zinc-200 p-3 text-[15px] flex justify-between items-center shadow-md mb-4">
                <div className="flex flex-col gap-y-1  justify-center">
                  <div className="flex items-center gap-x-1">
                    <RiCheckboxCircleFill  className="text-green-400 text-[27px]" />
                    <span className="text-white font-bold text-[16px]">
                      Stripe Account: <span className="text-zinc-200 text-[14px]">(required)</span>
                    </span>
                  </div>
                  <div className="px-2">
                    Your account is ready to receive payments
                  </div>
                </div>
                <button className="bg-green-300/30 px-4 py-2 rounded-lg text-white  border-green-500/50 border-[1px]">
                  Account details
                </button>
              </div>
            )}

            <div className=" w-full flex flex-col">
              <div className="w-full text-zinc-300 mb-2">Current Plan</div>
              <div className="w-full flex items-center justify-between border-b-[1px] pb-3 border-zinc-700 mb-6">
                <div className="flex gap-x-3 items-center text-[35px] text-white font-bold">
                  <BsCalendar2Check className="text-zinc-400" />
                  Free Plan
                </div>
                <div className="py-2 px-4 rounded-xl bg-emerald-600 text-white cursor-pointer">
                  Renew Plan
                </div>
              </div>
              <div className="w-full flex ">
                <div className="w-1/4 flex flex-col py-2 px-8">
                  <span className="text-[16px] text-zinc-300 mb-3">
                    Devices
                  </span>
                  <span className="text-[28px] font-semibold text-emerald-300">
                    3
                  </span>
                  <span className="text-zinc-400">
                    You can use up to 3 devices with your account
                  </span>
                  <span className="text-emerald-400 font-semibold cursor-pointer">
                    Device Management
                  </span>
                </div>
                <div className="w-1/4 flex flex-col py-2 px-8">
                  <span className="text-[16px] text-zinc-300 mb-3">
                    Active devices
                  </span>
                  <span className="text-[28px] font-semibold text-emerald-300">
                    1 / 3
                  </span>
                  <span className="text-zinc-400">
                    Currently you have 1 active devices
                  </span>
                  <span className="text-emerald-400 font-semibold cursor-pointer">
                    Device Management
                  </span>
                </div>
                <div className="w-1/4 flex flex-col py-2 px-8">
                  <span className="text-[16px] text-zinc-300 mb-3">
                    Renewal date
                  </span>
                  <div className="text-[28px] flex font-semibold text-white items-center gap-x-2">
                    <RiAlertFill className="text-emerald-500 text-[30px]" /> -{" "}
                    <span className="text-emerald-400">.</span> -{" "}
                    <span className="text-emerald-400">.</span> -
                  </div>
                  <span className="text-zinc-400">Unlimited plan</span>
                </div>
                <div className="w-1/4 flex flex-col py-2 px-8">
                  <span className="text-[16px] text-zinc-300 mb-3">
                    Renewal Amount
                  </span>
                  <span className="text-[28px] font-semibold text-emerald-300">
                    $ 0
                  </span>
                  <span className="text-zinc-400">Free plan</span>
                  <span className="text-emerald-400 font-semibold cursor-pointer">
                    See past invoices
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
