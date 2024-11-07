import React from 'react';
import './successCheck.css';
const SuccessCheck = ({ message }) => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='success-checkmark'>
        <div className='check-icon'>
          <span className='icon-line line-tip' />
          <span className='icon-line line-long' />
          <span className='icon-circle' />
          <span className='icon-fix' />
        </div>
      </div>
      <p className='text-lg tracking-wider'>{message}</p>
      <p className='text-lg tracking-wider'>Redirecting...</p>
    </div>
  )
}

export default SuccessCheck