'use client';
import { SecondDateFormatter } from '@/utils/parseDate';
import { Tooltip } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import AnswerInput from './AnswerInput';
import { client } from '@/contexts/AmplifyContext';
import { getAnswersByReport } from '@/graphql/issues/queries/query';
import { ListenAnswersById } from '@/graphql/issues/subscriptions/subscription';
import { FaEllipsisVertical } from 'react-icons/fa6';
export default function ShowComments({ reportId }) {
    const [answers, setAnswers] = useState([]);
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
    useEffect(() => {
        retrieveAnswers();

        const subscription = client
            .graphql({ query: ListenAnswersById, variables: { reportId } })
            .subscribe({
                next: ({ data }) => {
                    // Update previous state with new answers
                    setAnswers(prevAnswers => [...prevAnswers, data.onCreateAnswer]);
                },
                error: (error) => console.warn(error)
            });

        return () => {
            // Cancel the subscription when this component's life cycle ends
            subscription.unsubscribe();
        };
    }, []);
    return (
        <div
            id='answers_admins'
            className=' relative flex flex-col flex-nowrap gap-5 rounded-lg 2xl:h-[32.5rem] overflow-y-scroll slide-in-right '
        >
            {answers.map((answer, i) => (
                <div key={i} className='flex flex-col px-4 dark:bg-zinc-800 bg-white py-4 rounded-lg' id='responses_admin'>
                    <div className='flex gap-2 w-full h-[4rem] justify-between'>
                        <div className='flex gap-2 w-full h-[4rem]'>
                            <Tooltip color='default' content={`id: ${answer.user.id}`}>
                                <img
                                    src={`${answer.user.profilePicture}`}
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
                        <div>
                            <FaEllipsisVertical />
                        </div>
                    </div>
                    <div className='bg-zinc-100 dark:bg-zinc-700 rounded-md p-4'>
                        <p className='text-sm text-justify line-clamp-3'>
                            {answer.text}
                        </p>
                    </div>
                    <p className='text-xs text-zinc-400 my-2'>{SecondDateFormatter(new Date(answer.createdAt))}</p>
                </div>
            ))}
            <div className="flex-grow"></div>
            <AnswerInput reportId={reportId} />
        </div>
    )
}
