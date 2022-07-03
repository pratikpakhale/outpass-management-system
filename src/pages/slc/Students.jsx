import React, { useState, useCallback, useEffect } from 'react'

import Footer from '../../components/Footer'

export default function Students() {
  const [mentees, setMentees] = useState([])

  const getMentees = useCallback(async () => {
    const res = await fetch('/.netlify/functions/app/slc/students', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await res.json()
    setMentees(data.students)
  }, [setMentees])

  useEffect(() => {
    getMentees()
  }, [getMentees])

  return (
    <>
      <div className='mt-10 px-10'>
        <div className='flex items-center justify-evenly font-bold font-ubuntu text-2xl py-4'>
          <h1 className='w-full text-ezpass text-center text-3xl'>STUDENTS</h1>
        </div>
        <div className='flex flex-col items-center mt-4'>
          <div className=' flex items-center text-xl text-white bg-ezpass rounded-full h-8 px-1 py-6 my-4 w-5/6'>
            <div className='w-1/4 md:text-center'>Name</div>
            <div className='w-1/4 md:text-center'>Email</div>
            <div className='w-1/4 md:text-center'>Gender</div>
            <div className='w-1/4 md:text-center'>Contact No</div>
          </div>
          {mentees.map(mentee => (
            <div
              key={mentee._id}
              className='md:h-10 text-xl flex items-center justify-evenly text-ezpass border-ezpass border-2  rounded-lg mb-4 w-5/6 py-6'
            >
              <div className='w-1/4 md:text-center'>{mentee.name}</div>
              <div className='w-1/4 md:text-center'>{mentee.email}</div>
              <div className='w-1/4 md:text-center'>{mentee.gender}</div>
              <div className='w-1/4 md:text-center'>{mentee.phoneNumber}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer isFixed />
    </>
  )
}
