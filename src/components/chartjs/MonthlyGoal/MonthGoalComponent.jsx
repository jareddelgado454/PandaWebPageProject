import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button, Progress } from '@nextui-org/react'
import { client } from '@/contexts/AmplifyContext'
import { getGoalPerMonth } from '@/graphql/custom-queries'
import { FaRegPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { createMonthlyGoal, deleteMonthlyGoal, updateGoalValue } from '@/graphql/goal/mutation';
export default function MonthGoalComponent({ services = [] }) {
  const [goal, setGoal] = useState(0);
  const [goalExists, setGoalExists] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [goalValue, setGoalValue] = useState(0);
  const month = format(new Date(), 'MMMM');
  const monthYear = format(new Date(), 'yyyy-MM');
  const retrieveGoalOfMonth = async () => {
    try {
      const { data: { listGoals } } = await client.graphql({
        query: getGoalPerMonth,
        variables: { month: monthYear }
      });
      if (listGoals.items.length > 0) {
        setGoalExists(true);
        setGoal(listGoals.items[0]);
        setLoading(false);
      }
    } catch (error) {
      console.warn(error);
      setLoading(false);
    }
  }
  useEffect(() => { retrieveGoalOfMonth() }, []);
  const completedServices = services.filter(i => i.status === "completed").length;
  const totalServices = services.length;
  const updateGoalForMonth = async () => {
    try {
      await client.graphql({
        query: updateGoalValue,
        variables: {
          input: {
            id: goal?.id,
            goal: goalValue
          }
        }
      });
      toast.success("Goal updated successfully.");
      retrieveGoalOfMonth();
      setIsUpdating(false);
    } catch (error) {
      console.warn(error);
      toast.error("Something went wrong.")
    }
  }
  const onDeleteMontlyGoal = async () => {
    try {
      await client.graphql({
        query: deleteMonthlyGoal,
        variables: {
          goalId: goal?.id
        }
      });
      toast.success("Deleted Successfully.");
      setGoal({});
      setGoalExists(false);
    } catch (error) {
      console.warn(error);
      toast.error("Something went wrong.")
    }
  }
  const onCreateMonthlyGoal = async() => {
    try {
      await client.graphql({
        query: createMonthlyGoal,
        variables: {
          input: {
            goal: goalValue,
            type: "MONTHLY",
            monthYear
          }
        }
      });
      toast.success("Monthly Created Successfully.");
      retrieveGoalOfMonth();
    } catch (error) {
      console.warn(error);
      toast.error("Something went wrong.")
    }
  }
  return (
    <div className='w-full bg-zinc-800 my-4 rounded-lg h-[full] lg:h-[12rem] py-3 px-7'>
      {goalExists ? (
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between'>
            <p className='text-base lg:text-lg font-bold'>Service goal</p>
            <div className='flex gap-4'>
              <FaRegPenToSquare onClick={() => setIsUpdating(!isUpdating)} className='text-xl cursor-pointer hover:text-yellow-500 transition-colors duration-300' />
              <FaRegTrashCan onClick={onDeleteMontlyGoal} className='text-xl cursor-pointer hover:text-rose-500 transition-colors duration-300' />
            </div>
          </div>
          <p className='text-xs lg:text-base text-gray-400'>total performance on {month}</p>
          <div className='flex flex-row justify-between'>
            <p className='text-sm lg:text-base'>Current Service Successfully</p>
            <p className='text-sm lg:text-2xl font-black text-[#40C48E]'>{completedServices}</p>
          </div>
          <Progress color='success' aria-label="Loading..." value={(totalServices / (goal?.goal || 0)) * 100} className="w-full my-2" />
          <div className='flex flex-row justify-between'>
            <p className='text-sm lg:text-base text-gray-400'>Monthly target</p>
            {isUpdating ? (
              <div className='flex flex-col lg:flex-row gap-3'>
                <input
                  type="number"
                  value={goalValue}
                  onChange={({ target }) => setGoalValue(target.value)}
                  className='shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight outline-none focus:outline-none focus:shadow-outline'
                />
                <Button color='success' className='text-white font-semibold px-8' onClick={updateGoalForMonth}>Update Goal</Button>
                <Button color='danger' className='text-white font-semibold px-8' onClick={() => setIsUpdating(false)}>Cancel</Button>
              </div>
            ) : (
              <p className='text-sm lg:text-lg text-white'>
                {loading ? 'Loading...' : `${goal?.goal || 0}`}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col justify-center gap-4 h-full'>
          <p className='text-[#40C48E]'>Create a new goal for this month.</p>
          <div className='flex flex-col lg:flex-row justify-center items-center h-full gap-4'>
            <input
              type="number"
              value={goalValue}
              onChange={({ target }) => setGoalValue(target.value)}
              className='shadow appearance-none rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight outline-none focus:outline-none focus:shadow-outline'
            />
            <Button
              color='success'
              className='text-white font-semibold px-8 w-[20%]'
              onClick={onCreateMonthlyGoal}
            >Set Goal</Button>
          </div>
        </div>
      )}
    </div>
  )
}
