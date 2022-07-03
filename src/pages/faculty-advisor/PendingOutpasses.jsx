import React, { useState, useCallback, useEffect } from 'react'

import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

function PendingOutpasses() {
  const [outpasses, setOutpasses] = useState([])

  const getOutpasses = useCallback(async () => {
    const res = await fetch(
      '/.netlify/functions/app/facultyAdvisor/outpasses',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    const data = await res.json()
    setOutpasses(
      data.outpasses.filter(
        outpass =>
          outpass.status === 'pending' &&
          outpass.facultyAdvisor.approved === false
      )
    )
  }, [setOutpasses])

  useEffect(() => {
    getOutpasses()
  }, [getOutpasses])

  return (
    <>
      <div className='mt-10 px-10'>
        <div className='flex items-center justify-evenly font-bold font-ubuntu text-2xl py-4'>
          <h1 className='w-full text-ezpass text-center text-3xl'>
            Pending Requests
          </h1>
        </div>
        <div className='flex flex-col items-center mt-4'>
          <div className=' flex items-center text-xl text-white bg-ezpass rounded-full h-8 px-1 py-6 my-4 w-5/6'>
            <div className='w-1/5 md:text-center'>Name</div>
            <div className='w-1/5 md:text-center'>Issued On</div>
            <div className='w-1/5 md:text-center'>Time Span</div>
            <div className='w-1/5 md:text-center'>From</div>
            <div className='w-1/5 md:text-center'>To</div>
          </div>

          {outpasses.map(outpass => (
            <Link
              key={outpass._id}
              to={'/faculty-advisor/outpass/' + outpass._id}
              className='md:h-10 text-xl flex items-center justify-evenly text-ezpass border-ezpass border-2  rounded-lg mb-4 w-5/6 py-6'
            >
              <div className='w-1/5 md:text-center'>{outpass.student.name}</div>
              <div className='w-1/5 md:text-center'>
                {new Date(outpass.createdAt).toLocaleDateString()}
              </div>
              <div className='w-1/5 md:text-center'>{outpass.days}</div>
              <div className='w-1/5 md:text-center'>
                {new Date(outpass.fromDate).toLocaleDateString()}
              </div>
              <div className='w-1/5 md:text-center'>
                {new Date(outpass.toDate).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer isFixed />
    </>
  )
}

export default PendingOutpasses
