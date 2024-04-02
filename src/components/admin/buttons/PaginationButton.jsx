'use client';
import React from 'react'

const PaginationButton = (props, { text }) => {
  console.log(props);
  return (
    <button {...props} >{text}</button>
  )
}

export default PaginationButton;
