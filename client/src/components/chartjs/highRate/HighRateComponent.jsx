'use client';
import React, { useEffect, useState } from 'react';
import { client } from '@/contexts/AmplifyContext';
import { filterUserByRate } from '@/graphql/users/query/user';
import { FaFaceSmile, FaStar } from 'react-icons/fa6';

function HighRateComponent() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const retrieveData = async() => 
    {
      setLoading(true);
  
      try {
        
        const { data } = await client.graphql({
          query: filterUserByRate
        });
        const sortedUsers = data.listUsers.items.sort((a, b) => b.rate - a.rate);
        await setUsers(sortedUsers);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    useEffect(() => {
        retrieveData();
      }, []);
    
    return (
        <div className='flex flex-col gap-4'>
            {
                loading ? (<div>loading</div>) : (
                    <>
                        {users && users.map((user, i) => (
                            <div key={i} className='bg-white rounded-lg h-[6rem] flex flex-row gap-2 px-4'>
                                <div className='w-1/4 lg:w-2/12 flex justify-center items-center'>
                                    <img
                                        src={`${user.profilePicture ? user.profilePicture : "/image/defaultProfilePicture.jpg"}`}
                                        alt="user_profile"
                                        className='rounded-full w-[2.5rem] h-[2rem] lg:w-[4rem] lg:h-[4rem]'
                                    />
                                </div>
                                <div className='w-full flex flex-row justify-between'>
                                    <div className='flex flex-col justify-center gap-2'>
                                        <p className='text-black text-sm lg:text-base font-semibold text-center w-[4.5rem] lg:w-full'>{ user.fullName }</p>
                                        <div className='bg-green-panda w-[3rem] h-[1.7rem] text-sm rounded-2xl flex flex-row items-center justify-center gap-1'>
                                            <div className='flex flex-row gap-1 justify-center items-center'>
                                                <FaStar />
                                                { user.rate }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-green-500 flex justify-center items-center'>
                                        <FaFaceSmile className='text-lg lg:text-5xl' />
                                    </div>
                                </div>
                            </div>
                        )) }
                    </>
                )
            }
        </div>
    )
}

export default HighRateComponent
