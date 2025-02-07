'use client';
import React, { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';
import { FaCamera, FaCircleCheck, FaRegStar, FaRegStarHalf, FaStar } from 'react-icons/fa6';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { dataURLtoBlob } from '@/utils/photo/BlobImage';
import { updateMyInformation } from '@/graphql/users/customer/mutation';
import { client } from '@/contexts/AmplifyContext';
import { baseUrl } from '@/utils/CloudFront';
import { calculateRate } from '@/utils/service/AVGRate';
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
            profilePicture: `${filename}`,
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
      className="bg-cover h-[19rem] md:h-[10.5rem] w-full md:w-full bg-fixed bg-bottom rounded-t-lg bg-[#E4E6EB] dark:bg-zinc-900 relative"
    >
      <div className='absolute top-3'>
        <div className='flex flex-col md:flex-row items-center gap-5 h-full px-8'>
          <div className="relative w-[7rem] h-[7rem] md:w-[9rem] md:h-[9rem] overflow-hidden rounded-full shadow-md group">
            <div className="absolute bg-black group-hover:opacity-60 opacity-0 w-full h-full transition-all">
              <div className="flex justify-center items-center h-full">
                <FaCamera className="text-white text-xl md:text-4xl" />
              </div>
            </div>
            <Image
              src={photograph ? photograph : (user.profilePicture ? baseUrl+user.profilePicture : "/image/defaultProfilePicture.jpg")}
              width={400}
              height={400}
              className='rounded-full w-[7rem] h-[7rem] md:h-[9rem] md:w-[9rem] border-emerald-600 border-3'
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
          <div className='flex flex-col gap-2 text-center md:text-left'>
            <div className='flex flex-row gap-2 items-center justify-center md:justify-start flex-wrap'>
              <p className='w-full'>Welcome back, <strong className='text-[#40C48E]'>{user && user.fullName ? user.fullName : <span className='text-rose-600'>This is required</span>}</strong></p>
              {user.rate.items.length > 0 ? (
                <>
                  <ReactStars
                    count={5}
                    value={calculateRate(user.rate)}
                    size={22}
                    edit={false}
                    isHalf={true}
                    emptyIcon={<FaStar />}
                    halfIcon={<FaRegStarHalf />}
                    fullIcon={<FaRegStar />}
                    activeColor="#ffd700"
                  />
                  <p>4 stars</p>
                </>
              ) : <p>No stars</p>}
            </div>
            <p className=''>{user && user.email}</p>
            {user && user.email_verified && <div className='flex items-center justify-center md:justify-start gap-1'><p className='text-[#40C48E]'>Verified </p><FaCircleCheck className='text-[#40C48E]' /></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
