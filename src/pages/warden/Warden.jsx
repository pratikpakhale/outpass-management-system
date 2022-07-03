import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Footer from '../../components/Footer'
function Warden() {
  const [warden, setWarden] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    facultyAdvisor: '',
  })

  const getWarden = useCallback(async () => {
    const res = await fetch('/.netlify/functions/app/warden', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await res.json()
    setWarden(data.warden)
  }, [setWarden])

  useEffect(() => {
    getWarden()
  }, [getWarden])

  return (
    <>
      <main className='flex flex-col mt-16 md:flex-row justify-evenly items-center'>
        <div className='border-2 border-ezpass rounded-2xl  flex flex-col justify-evenly items-center px-3 py-4'>
          <div className='font-ubuntu font-bold mb-2 text-2xl'>Profile</div>
          <div>
            <img src='./img/profile.svg' className='h-28 my-2' alt='' />
          </div>
          <div className='text-xl h-auto border rounded-lg px-6 py-6 flex flex-col items-center justify-evenly mt-2  font-ubuntu'>
            <div>Name - {warden.name}</div>
            <div>Email - {warden.email}</div>
            <div>Phone Number - {warden.phoneNumber}</div>
          </div>
        </div>
        <div className='flex md:flex-col justify-between items-center my-16 md:my-0 md:w-1/3'>
          <Link
            to={'/warden/pending-outpasses'}
            className='text-2xl px-3 py-1 border-2 border-ezpass font-ubuntu rounded-full font-bold hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95  md:w-4/5 text-center'
          >
            Pending Approvals
          </Link>
          <Link
            to={'/warden/outpass-history'}
            className='text-2xl px-3 py-1 border-2 border-ezpass font-ubuntu rounded-full font-bold hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 md:mt-10 md:w-4/5 text-center'
          >
            Approval History
          </Link>
          <Link
            to={'/warden/students'}
            className='text-2xl px-3 py-1 border-2 border-ezpass font-ubuntu rounded-full font-bold hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 md:mt-10 md:w-4/5 text-center'
          >
            Students
          </Link>
        </div>
      </main>
      <Footer isFixed />
    </>
  )
}

export default Warden
