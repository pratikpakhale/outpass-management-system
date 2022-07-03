import React, { useState, useCallback, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import Footer from '../../components/Footer'

function ApplyOutpass() {
  const navigate = useNavigate()

  const [student, setStudent] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    facultyAdvisor: '',
    gender: '',
  })

  const [leavingDate, setLeavingDate] = useState('')
  const [returningDate, setReturningDate] = useState('')
  const [reason, setReason] = useState('')
  const [hostelRoomNumber, setHostelRoomNumber] = useState('')
  const [leavingTime, setLeavingTime] = useState('')
  const [returningTime, setReturningTime] = useState('')

  const getStudent = useCallback(async () => {
    const res = await fetch('/.netlify/functions/app/student', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await res.json()
    setStudent(data.student)
  }, [setStudent])

  useEffect(() => {
    getStudent()
  }, [getStudent])

  const handleSubmit = async () => {
    const d1 = new Date(leavingDate)
    const d2 = new Date(returningDate)

    const diff = d2.getTime() - d1.getTime()
    const days = Math.ceil(diff / (1000 * 3600 * 24))

    const body = {
      fromDate: leavingDate,
      toDate: returningDate,
      reason,
      hostelRoomNumber,
      outTime: leavingTime,
      inTime: returningTime,
      days,
    }
    const res = await fetch('/.netlify/functions/app/student/outpass/apply', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (data.error) {
      alert(data.error)
    } else if (res.status === 201) {
      alert('Outpass applied successfully')
      navigate('/student/outpass-history')
    }
  }

  return (
    <div className='mt-10'>
      <div className='text-center w-full font-extrabold font-ubuntu text-4xl text-ezpass mb-10'>
        Apply for Outpass
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
              value={student.name}
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
              value={student.gender}
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
              value={student.phoneNumber}
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
              type='date'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={leavingDate}
              onChange={e => setLeavingDate(e.target.value)}
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
              type='date'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={returningDate}
              onChange={e => setReturningDate(e.target.value)}
            />
          </div>
        </div>
        <div className='w-1/2 flex flex-col items-end justify-center'>
          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Register Number*
            </label>
            <input
              type='text'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={student.email.split('@')[0]}
              readOnly
            />
          </div>

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
              value={student.email}
              readOnly
            />
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Hostel Room Number*
            </label>
            <input
              type='number'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={hostelRoomNumber}
              onChange={e => setHostelRoomNumber(e.target.value)}
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
              value={leavingTime}
              onChange={e => setLeavingTime(e.target.value)}
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
              value={returningTime}
              onChange={e => setReturningTime(e.target.value)}
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
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
      </div>

      <div className='text-center w-full font-extrabold font-ubuntu text-4xl text-ezpass mb-10'>
        <button
          className='border-2 border-ezpass text-lg text-ezpass px-8 py-2 rounded-md font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold my-8'
          onClick={handleSubmit}
        >
          Apply
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default ApplyOutpass
