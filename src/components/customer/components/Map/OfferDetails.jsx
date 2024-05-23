'use client';
import React, { useContext, useEffect, useState } from 'react';
import { FaCarOn, FaRegStar, FaRegStarHalf, FaStar } from 'react-icons/fa6';
import Image from 'next/image';
import Cookies from 'js-cookie';
import ReactStars from "react-rating-stars-component";
import { Badge } from '@nextui-org/react';
import { onCreateOffers } from '@/graphql/users/customer/subscription';
import { client } from '@/contexts/AmplifyContext';
import { listOffersByServiceId } from '@/graphql/users/customer/query';
import { ServiceContext } from '@/contexts/service/ServiceContext';
import { updateService } from '@/graphql/users/customer/mutation';
import { MapContext } from '@/contexts/map/MapContext';
import { PlaceContext } from '@/contexts/place/PlaceContext';
import { calculateRate } from '@/utils/service/AVGRate';

export default function OfferDetails() {
  const [active, setActive] = useState(false);
  const [offers, setOffers] = useState([]);
  const { serviceRequest, setServiceRequest } = useContext(ServiceContext);
  const { map } = useContext(MapContext);
  const { userLocation } = useContext(PlaceContext);
  const retrieveOffersFromApi = async () => {
    setOffers([]);
    try {
      if (!serviceRequest) return;
      const { data } = await client.graphql({
        query: listOffersByServiceId,
        variables: {
          serviceId: serviceRequest.id
        }
      });
      setOffers(data.listOffers.items);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { retrieveOffersFromApi() }, [serviceRequest]);

  useEffect(() => {

    if (!serviceRequest) return;
    const subscription = client
      .graphql({ query: onCreateOffers, variables: { serviceId: serviceRequest.id } })
      .subscribe({
        next: ({ data }) => {
          // Update previous state
          setOffers(prevOffers => [...prevOffers, data.onCreateOffer]);
        },
        error: (error) => console.warn(error)
      });

    return () => {
      // Cancel the subscription when this component's life cycle ends
      subscription.unsubscribe();
    };

  }, [serviceRequest, setServiceRequest]);

  const onHandleAcceptServiceFromTechnician = async (offer) => {
    try {
      const { data } = await client.graphql({
        query: updateService,
        variables: {
          serviceId: offer.serviceId,
          serviceTechnicianSelectedId: offer.technician.id,
          price: offer.amount,
          destLatitude: offer.technician.loLatitude,
          destLongitude: offer.technician.loLongitude
        }
      });
      console.log(data);
      setServiceRequest(data.updateService);
      setActive(false);
      Cookies.set(
        "ServiceRequest",
        JSON.stringify(data.updateService)
      );
      map.flyTo({
        center: userLocation,
        zoom: 12,
        duration: 3000,
        easing: (t) => t,
      })
    } catch (error) {
      console.error(error);
    }
  }
  const onDeleteOffer = (id) => {
    setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== id));
  }
  return (
    <>
      {serviceRequest && serviceRequest.status === 'pending' && (
        <div className='absolute top-0 left-0 z-10 md:w-[31rem] 2xl:w-[36rem] h-[17rem] 2xl:h-[22rem]'>
          <div className='p-4 flex gap-4 h-full overflow-y-hidden'>
            <div className='w-[15%]'>
              <div className='dark:bg-zinc-900 bg-white w-[4rem] h-[4rem] rounded-full flex justify-center items-center shadow-lg cursor-pointer' onClick={() => setActive(!active)}>
                <Badge color={`${offers.length > 0 ? 'danger' : 'primary'}`} content={offers.length} shape="circle">
                  <FaCarOn className='text-2xl' />
                </Badge>
              </div>
            </div>
            <div className={`w-[85%] h-full  transition-all duration-300 ease-in-out animate__animated ${offers.length > 0 && 'overflow-y-scroll'} ${active ? 'block animate__bounceInDown' : 'animate__bounceOutUp'}`}>
              <div className='flex flex-col gap-2'>
                {offers.map((offer, i) => (
                  <div key={i} className='dark:bg-zinc-900 bg-white shadow-lg w-full h-[7rem] rounded-lg p-4 overflow-hidden animate__animated animate__fadeInLeft'>
                    <div className='flex flex-row items-center h-full gap-2 w-full'>
                      <Image
                        width={100}
                        height={100}
                        src={`${offer.tecnician && offer.tecnician.profilePicture ? offer.tecnician.profilePicture : '/image/defaultProfilePicture.jpg'}`}
                        className='h-[3rem] w-[3rem] rounded-full'
                        alt="profile_picture_technician_offer"
                      />
                      <div className='flex flex-col gap-1 w-full'>
                        <div className='flex flex-row gap-4 justify-between items-center'>
                          <p className='text-sm 2xl:text-base line-clamp-1'>{offer.technician.fullName}</p>
                          <div className='flex gap-2 justify-center items-center'>
                            {offer.technician.rate ? (
                              <ReactStars
                                count={5}
                                value={calculateRate(offer.technician.rate)}
                                size={22}
                                edit={false}
                                isHalf={true}
                                emptyIcon={<FaStar />}
                                halfIcon={<FaRegStarHalf />}
                                fullIcon={<FaRegStar />}
                                activeColor="#ffd700"
                              />
                            ) : (
                              <p>No rate</p>
                            )}
                            <p className='text-sm font-bold'>{calculateRate(offer.technician.rate)}</p>
                          </div>
                        </div>
                        <p className='text-xs 2xl:text-sm text-zinc-400'>Technician</p>
                        <div className='flex flex-row justify-between'>
                          <p className='text-xs 2xl:text-base'>Amount: <strong className='text-[#40C48E]'>${offer.amount}</strong></p>
                          <div className='flex gap-2'>
                            <button onClick={() => onHandleAcceptServiceFromTechnician(offer)} className='bg-green-panda py-1 px-2 rounded-lg text-sm 2xl:text-base text-white'>Accept</button>
                            <button onClick={() => onDeleteOffer(offer.id)} className='bg-rose-600 py-1 px-2 rounded-lg text-sm 2xl:text-base text-white'>Reject</button>
                            {/* <button className='bg-sky-600 py-1 px-2 rounded-lg '>Info</button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  )
}
