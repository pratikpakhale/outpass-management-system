import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../../components/Footer'

function ViewOutpass() {
  const id = useLocation().pathname.split('/outpass/')[1]

  const [outpass, setOutpass] = useState({
    student: {
      _id: '',
      name: '',
      email: '',
      phoneNumber: '',
      gender: '',
    },
    days: '',
    fromDate: '',
    toDate: '',
    status: '',
    outTime: '',
    inTime: '',
  })

  const getOutpass = useCallback(async () => {
    const res = await fetch('/.netlify/functions/app/student/outpasses/' + id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await res.json()
    setOutpass(data.outpass)
  }, [id])

  useEffect(() => {
    getOutpass()
  }, [getOutpass])

  const color = status => {
    if (status === 'pending') return '#E7B416'
    if (status === 'approved') return '#2DC937'
    return '#CC3232'
  }

  return (
    <div className='mt-10'>
      <div className='text-center w-full font-extrabold font-ubuntu text-4xl text-ezpass mb-10'>
        View Outpass
      </div>

      <div className='px-20 flex justify-center items-center'>
        <div className='w-1/2 flex flex-col items-start justify-center'>
          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Name*
            </label>
            <input
              type='text'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={outpass.student.name && outpass.student.name}
              readOnly
            />
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Gender*
            </label>
            <input
              type='text'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={outpass.student.gender && outpass.student.gender}
              readOnly
            />
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Contact No*
            </label>
            <input
              type='tel'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={outpass.student.phoneNumber}
              readOnly
            />
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Date of Leaving*
            </label>
            <input
              type='text'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={new Date(outpass.fromDate).toLocaleDateString()}
              readOnly
            />
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Date of Return*
            </label>
            <input
              type='text'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={new Date(outpass.toDate).toLocaleDateString()}
              readOnly
            />
          </div>
        </div>
        <div className='w-1/2 flex flex-col items-end justify-center'>
          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Email*
            </label>
            <input
              type='text'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={outpass.student.email}
              readOnly
            />
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Days*
            </label>
            <input
              type='number'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={outpass.days}
              readOnly
            />
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Time of Leaving*
            </label>
            <input
              type='time'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={outpass.outTime}
              readOnly
            />
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Time of Return*
            </label>
            <input
              type='time'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={outpass.inTime}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className='px-20 mb-6'>
        <label htmlFor='' className='text-lg font-lato text-ezpass font-bold'>
          Reason*
        </label>
        <textarea
          type='time'
          className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full h-24'
          value={outpass.reason}
          readOnly
        />
      </div>

      <div className=' flex flex-col items-center justify-center mb-10'>
        <div className='px-8 py-2 border border-ezpass rounded-lg font-ubuntu font-bold flex items-center justify-center'>
          <svg
            className='mr-4'
            width='30'
            height='30'
            viewBox='0 0 35 35'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='17.5' cy='17.5' r='17.5' fill={color(outpass.status)} />
          </svg>
          {outpass.status.toUpperCase()}
        </div>
        <div className='mt-4 font-bold font-ubuntu tracking-wider'></div>
      </div>

      <Footer />
    </div>
  )
}

export default ViewOutpass
