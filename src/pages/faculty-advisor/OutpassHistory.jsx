import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

function ApprovalHistory() {
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
    setOutpasses(data.outpasses.reverse())
  }, [])

  useEffect(() => {
    getOutpasses()
  }, [getOutpasses])

  const color = status => {
    if (status === 'pending') return '#E7B416'
    if (status === 'approved') return '#2DC937'
    return '#CC3232'
  }

  return (
    <>
      <div className='mt-10 px-10'>
        <div className='flex items-center justify-evenly font-bold font-ubuntu text-2xl py-4'>
          <h1 className='w-full text-ezpass text-center text-3xl'>
            APPROVAL HISTORY
          </h1>
        </div>
        <div className='flex justify-end items-center font-bold font-ubuntu text-2xl w-full'>
          <select className=' hover:bg-transparent border-2 hover:border-ezpass hover:text-ezpass transition-all duration-100 ease-in-out text-white bg-ezpass rounded-full py-0.5 text-xl font-lato text-center'>
            <option value='All'>All</option>
            <option value='All'>approved</option>
            <option value='All'>pending</option>
            <option value='All'>rejected</option>
          </select>
        </div>
        <div className='flex flex-col items-center mt-4'>
          <div className=' flex items-center text-xl text-white bg-ezpass rounded-full h-8 px-1 py-6 my-4 w-5/6'>
            <div className='w-1/5 md:text-center'>Issued On</div>
            <div className='w-1/5 md:text-center'>Time Span</div>
            <div className='w-1/5 md:text-center'>From</div>
            <div className='w-1/5 md:text-center'>To</div>
            <div className='w-1/5 md:text-center'>Status</div>
          </div>

          {outpasses.map(outpass => (
            <Link
              key={outpass._id}
              to={'/faculty-advisor/outpass/' + outpass._id}
              className='md:h-10 text-xl flex items-center justify-evenly text-ezpass border-ezpass border-2  rounded-lg mb-4 w-5/6 py-6'
            >
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
              <div className='w-1/5 md:text-center flex justify-center items-center'>
                {outpass.status.toUpperCase()}
                <svg
                  className='ml-2'
                  width='10'
                  height='10'
                  viewBox='0 0 10 10'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='5' cy='5' r='5' fill={color(outpass.status)} />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer isFixed />
    </>
  )
}

export default ApprovalHistory
