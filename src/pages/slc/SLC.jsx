import React, { useEffect, useCallback, useState } from 'react'

import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

function SLC() {
  const [SLC, setSLC] = useState('')

  const getSLC = useCallback(async () => {
    const res = await fetch('/.netlify/functions/app/slc', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await res.json()
    setSLC(data.slc)
  }, [])

  useEffect(() => {
    getSLC()
  }, [getSLC])

  return (
    <>
      <div className='flex  justify-end  text-2xl py-4 px-20'>
        <Link to={'/slc/manage'}>
          <button className='border-2 border-ezpass bg-ezpass text-white px-3 py-1 rounded-md font-ubuntu hover:bg-white hover:text-ezpass  transition-all duration-200 ease-in-out active:scale-95 tracking-wide'>
            Manage
          </button>
        </Link>
      </div>
      <main className='flex flex-col my-16 md:flex-row justify-evenly items-center'>
        <div className='border-2 border-ezpass rounded-2xl  flex flex-col justify-evenly items-center px-3 py-4'>
          <div className='font-ubuntu font-bold mb-2 text-2xl'>Profile</div>
          <div>
            <img src='./img/profile.svg' className='h-28 my-2' alt='' />
          </div>
          <div className='text-xl h-auto border rounded-lg px-6 py-6 flex flex-col items-center justify-evenly mt-2  font-ubuntu'>
            <div>Name - {SLC.name}</div>
            <div>Email - {SLC.email}</div>
            <div>Phone Number - {SLC.phoneNumber}</div>
          </div>
        </div>
        <div className='flex md:flex-col justify-between items-center my-16 md:my-0 md:w-1/3'>
          <Link
            to={'/slc/pending-outpasses'}
            className='text-2xl px-3 py-1 border-2 border-ezpass font-ubuntu rounded-full font-bold hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95  md:w-4/5 text-center'
          >
            Pending Approvals
          </Link>
          <Link
            to={'/slc/outpass-history'}
            className='text-2xl px-3 py-1 border-2 border-ezpass font-ubuntu rounded-full font-bold hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 md:mt-10 md:w-4/5 text-center'
          >
            Approval History
          </Link>
          <Link
            to={'/slc/students'}
            className='text-2xl px-3 py-1 border-2 border-ezpass font-ubuntu rounded-full font-bold hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 md:mt-10 md:w-4/5 text-center'
          >
            Students
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default SLC
