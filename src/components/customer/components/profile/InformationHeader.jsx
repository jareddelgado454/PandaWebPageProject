'use client';
import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';
import { FaCamera, FaCircleCheck, FaRegStar, FaStar } from 'react-icons/fa6';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { dataURLtoBlob } from '@/utils/photo/BlobImage';
import { updateMyInformation } from '@/graphql/users/customer/mutation';
import { client } from '@/contexts/AmplifyContext';
export default function InformationHeader({ user }) {
  const [photograph, setPhotograph] = useState(null);
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
      onUpdateProfilePicture(filename);
    } catch (error) {
      console.log(error);
    }
  };
  const onUpdateProfilePicture = async (filename) => {
    try {
      await client.graphql({
        query: updateMyInformation,
        variables: {
          input: {
            id: user.id,
            profilePicture: `https://d3nqi6yd86hstw.cloudfront.net/public/${filename}`,
          },
        },
      });
      toast.success(`!Your new profile picture has been uploaded!`);
    } catch (error) {
      console.error(error);
      toast.error('something went wrong.');
    }
  }
  return (
    <div
      className="bg-cover h-[10.5rem] w-full md:w-full bg-fixed bg-bottom rounded-t-lg bg-[#E4E6EB] dark:bg-zinc-900 relative"
    >
      <div className='absolute top-3'>
        <div className='flex items-center gap-5 h-full px-8'>
          <div className="relative w-[9rem] h-[9rem] overflow-hidden rounded-full shadow-md group">
            <div className="absolute bg-black group-hover:opacity-60 opacity-0 w-full h-full transition-all">
              <div className="flex justify-center items-center h-full">
                <FaCamera className="text-white text-xl md:text-4xl" />
              </div>
            </div>
            <Image
              src={photograph ? photograph : (user.profilePicture ? user.profilePicture : "/image/defaultProfilePicture.jpg")}
              width={400}
              height={400}
              className='rounded-full h-[9rem] w-[9rem] border-emerald-600 border-3'
              alt='profile_customer_picture'
              priority
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
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <p>Welcome back, <strong className='text-[#40C48E]'>{user && user.fullName}</strong></p>
              <FaStar className='text-amber-500' /><FaStar className='text-amber-500' /><FaStar className='text-amber-500' /><FaStar className='text-amber-500' />
              <FaRegStar className='text-amber-500' />
              <p>4 stars</p>
            </div>
            <p className=''>{user && user.email}</p>
            {user && user.email_verified && <div className='flex items-center gap-1'><p className='text-[#40C48E]'>Verified </p><FaCircleCheck className='text-[#40C48E]' /></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
