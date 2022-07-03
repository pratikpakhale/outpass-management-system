import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Footer from '../../components/Footer'

function Outpass() {
  const navigate = useNavigate()
  const id = useLocation().pathname.split('/outpass/')[1]

  const [outpass, setOutpass] = useState({
    student: {
      _id: '',
      name: '',
      email: '',
      phoneNumber: '',
      gender: '',
    },
    facultyAdvisor: {
      approved: false,
      rejected: false,
    },
    days: '',
    fromDate: '',
    toDate: '',
    status: '',
    outTime: '',
    inTime: '',
  })

  const getOutpass = useCallback(async () => {
    const res = await fetch(
      '/.netlify/functions/app/facultyAdvisor/outpasses/' + id,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    const data = await res.json()
    setOutpass(data.outpass)
  }, [id])

  useEffect(() => {
    getOutpass()
  }, [getOutpass])

  const approveHandler = async () => {
    const res = await fetch(
      '/.netlify/functions/app/facultyAdvisor/outpasses/' + id + '/approve',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )

    if (res.status === 200) {
      alert('Outpass approved')
      navigate('/faculty-advisor/outpass-history')
    }
  }

  const rejectHandler = async () => {
    const res = await fetch(
      '/.netlify/functions/app/facultyAdvisor/outpasses/' + id + '/reject',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )

    if (res.status === 200) {
      alert('Outpass rejected')
      navigate('/faculty-advisor/outpass-history')
    }
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

      <div className=' flex items-center justify-center mb-10'>
        {outpass.facultyAdvisor.approved ? (
          <div className='border-2 bg-ezpass px-4 py-2 rounded-md font-ubuntu text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold mr-2'>
            Approved
          </div>
        ) : (
          <button
            className='border-2 border-ezpass px-4 py-2 rounded-md font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold mr-2'
            onClick={approveHandler}
          >
            Approve
          </button>
        )}
        {outpass.facultyAdvisor.rejected ? (
          <div className='border-2 bg-ezpass px-4 py-2 rounded-md font-ubuntu text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold mr-2'>
            Rejected
          </div>
        ) : (
          <button
            className='border-2 border-ezpass px-4 py-2 rounded-md font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold mr-2'
            onClick={rejectHandler}
          >
            Reject
          </button>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Outpass
