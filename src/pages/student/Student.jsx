import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Footer from '../../components/Footer'

function Student() {
  const [student, setStudent] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    facultyAdvisor: '',
  })

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

  return (
    <>
      <main className='flex flex-col mt-16 md:flex-row justify-evenly items-center'>
        <div className='border-2 border-ezpass rounded-2xl  flex flex-col justify-evenly items-center px-3 py-4'>
          <div className='font-ubuntu font-bold mb-2 text-2xl'>Profile</div>
          <div>
            <img src='./img/profile.svg' className='h-28 my-2' alt='' />
          </div>
          <div className='text-xl h-auto border rounded-lg px-6 py-6 flex flex-col items-center justify-evenly mt-2  font-ubuntu'>
            <div>Name - {student.name}</div>
            <div>Email - {student.email}</div>
            <div>Phone Number - {student.phoneNumber}</div>
            <div>Faculty Advisor - {student.facultyAdvisor.name}</div>
            <div>Gender - {student.gender}</div>
          </div>
        </div>
        <div className='flex md:flex-col justify-between items-center my-16 md:my-0 md:w-1/3'>
          <Link
            to={'/student/apply-outpass'}
            className='text-2xl px-3 py-1 border-2 border-ezpass font-ubuntu rounded-full font-bold hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 md:mb-10 md:w-4/5 text-center'
          >
            Apply for Outpass
          </Link>
          <Link
            to={'/student/outpass-history'}
            className='text-2xl px-3 py-1 border-2 border-ezpass font-ubuntu rounded-full font-bold hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 md:mt-10 md:w-4/5 text-center'
          >
            Outpass History
          </Link>
        </div>
      </main>
      <Footer isFixed />
    </>
  )
}

export default Student
