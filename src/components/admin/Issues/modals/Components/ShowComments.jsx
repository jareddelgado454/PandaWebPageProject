'use client';
import { SecondDateFormatter } from '@/utils/parseDate';
import { Tooltip } from '@nextui-org/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { client } from '@/contexts/AmplifyContext';
import { getAnswersByReport } from '@/graphql/issues/queries/query';
import { ListenAnswersById, onDeleteAnswersSubscription } from '@/graphql/issues/subscriptions/subscription';
import { FaXmark } from 'react-icons/fa6';
import { onDeleteAnswerById } from '@/graphql/issues/mutations/mutation';
import 'animate.css';
import Image from 'next/image';
import { UserContext } from '@/contexts/user/UserContext';
export default function ShowComments({ reportId }) {
    const { user } = useContext(UserContext);
    const [answers, setAnswers] = useState([]);
    const answerRefs = useRef({});
    const retrieveAnswers = async () => {

        try {
            const { data } = await client.graphql({
                query: getAnswersByReport,
                variables: {
                    reportId
                }
            });
            setAnswers(data.listAnswers.items);
        } catch (error) {
            console.log(error);
        }
    };
    const onHandleDeleteAnswer = async (userId, answerId, reportId) => {
        try {
            await client.graphql({
                query: onDeleteAnswerById,
                variables: {
                    input: {
                        id: answerId
                    },
                    reportId,
                    userId
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        retrieveAnswers();
        const subscriptionToAnswers = client
            .graphql({ query: ListenAnswersById, variables: { reportId } })
            .subscribe({
                next: ({ data }) => {
                    // Update previous state with new answers
                    setAnswers(prevAnswers => [...prevAnswers, data.onCreateAnswer]);
                },
                error: (error) => console.warn(error)
            });

        const subscriptionToDeleteAnswer = client
            .graphql({ query: onDeleteAnswersSubscription })
            .subscribe({
                next: ({ data }) => {
                    // Update previous state with new answers
                    const answerId = data.onDeleteAnswer.id;
                    answerRefs.current[answerId].classList.remove('animate__bounceInRight');
                    answerRefs.current[answerId].classList.add('animate__backOutRight');
                    setTimeout(() => {
                        setAnswers(prevAnswers => {
                            return prevAnswers.filter((item) => item.id !== answerId);
                        });
                    }, 1000);
                },
                error: (error) => console.warn(error)
            });

        return () => {
            // Cancel the subscription when this component's life cycle ends
            subscriptionToAnswers.unsubscribe();
            subscriptionToDeleteAnswer.unsubscribe();
        };
    }, []);
    return (
        <>
            {answers.length ? answers.map((answer, i) => (
                <div key={i} ref={el => (answerRefs.current[answer.id] = el)} className='flex flex-col px-4 dark:bg-zinc-800 bg-white py-4 rounded-lg animate__animated animate__bounceInRight' id='responses_admin'>
                    <div className='flex gap-2 w-full h-[4rem] justify-between'>
                        <div className='flex gap-2 w-full h-[4rem]'>
                            <Tooltip color='default' content={`id: ${answer.user.id}`}>
                                <Image
                                    height={150}
                                    width={150}
                                    src={`${answer.user && answer.user.profilePicture ? answer.user.profilePicture : '/image/defaultProfilePicture.jpg'}`}
                                    alt='admin_profile_picture'
                                    className='w-[3rem] h-[3rem] rounded-full'
                                />
                            </Tooltip>
                            <div>
                                <div className='flex items-center flex-row flex-nowrap gap-2'>
                                    <p className='text-sm font-semibold'>{answer.user.fullName}</p>

                                </div>
                                <p className='text-zinc-400 font-light text-sm'>{answer.user.email}</p>
                            </div>
                        </div>
                        <div className='relative'>
                            {user.id === answer.user.id && (
                                <FaXmark className='text-center hover:text-rose-600 cursor-pointer' onClick={() => onHandleDeleteAnswer(answer.user.id, answer.id, answer.reportId)} />
                            )}
                        </div>
                    </div>
                    <div className='bg-zinc-100 dark:bg-zinc-700 rounded-md p-4'>
                        <p className='text-sm text-justify line-clamp-3'>
                            {answer.text}
                        </p>
                    </div>
                    <p className='text-xs text-zinc-400 my-2'>{SecondDateFormatter(new Date(answer.createdAt))}</p>
                </div>
            )) : (<div className='w-full h-full flex justify-center items-center'>No Answers Yet</div>)}
        </>
    )
}
