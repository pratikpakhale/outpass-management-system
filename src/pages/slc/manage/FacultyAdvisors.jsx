import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../../components/Footer'
function FacultyAdvisors() {
  const [facultyAdvisors, setFacultyAdvisors] = useState([])

  const getFacultyAdvisors = useCallback(async () => {
    const res = await fetch('/.netlify/functions/app/slc/facultyAdvisors', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await res.json()
    setFacultyAdvisors(data.facultyAdvisors)
  }, [setFacultyAdvisors])

  useEffect(() => {
    getFacultyAdvisors()
  }, [getFacultyAdvisors])

  return (
    <>
      <div className='mt-10 px-10'>
        <div className='flex items-center justify-evenly font-bold font-ubuntu text-2xl py-4'>
          <h1 className='w-full text-ezpass text-center text-3xl'>
            MANAGE FACULTY ADVISORS
          </h1>
        </div>
        <div className='flex justify-end items-center font-ubuntu text-lg w-full'>
          <Link to={'/slc/manage/faculty-advisors/add'}>
            <button className='border-2 border-ezpass px-3 py-1 rounded-full font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold'>
              Add +
            </button>
          </Link>
        </div>
        <div className='flex flex-col items-center mt-4'>
          <div className=' flex items-center text-xl text-white bg-ezpass rounded-full h-8 px-1 py-6 my-4 w-5/6'>
            <div className='w-1/4 md:text-center'>Name</div>
            <div className='w-1/4 md:text-center'>Phone</div>
            <div className='w-1/4 md:text-center'>Email</div>
            <div className='w-1/4 md:text-center'>View/Edit</div>
          </div>

          {facultyAdvisors.map(facultyAdvisor => (
            <div
              key={facultyAdvisor._id}
              className='md:h-10 text-xl flex items-center justify-evenly text-ezpass border-ezpass border-2  rounded-lg mb-4 w-5/6 py-6'
            >
              <div className='w-1/4 md:text-center'>{facultyAdvisor.name}</div>
              <div className='w-1/4 md:text-center'>
                {facultyAdvisor.phoneNumber}
              </div>
              <div className='w-1/4 md:text-center'>{facultyAdvisor.email}</div>
              <div className='w-1/4 md:text-center flex justify-center items-center'>
                <Link
                  to={'/slc/manage/faculty-advisors/edit/' + facultyAdvisor._id}
                >
                  <button className='border-2 border-ezpass px-4 py-1 text-sm rounded-full font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold'>
                    View/Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer isFixed />
    </>
  )
}

export default FacultyAdvisors
