import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Footer from '../../../components/Footer'

function EditStudents() {
  const navigate = useNavigate()

  const [wardens, setWardens] = useState([])
  const [facultyAdvisors, setFacultyAdvisors] = useState([])

  const id = useLocation().pathname.split('/edit/')[1]

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warden, setWarden] = useState('')
  const [facultyAdvisor, setFacultyAdvisor] = useState('')
  const [gender, setGender] = useState('')

  const getData = useCallback(async () => {
    const res = await fetch('/.netlify/functions/app/slc/wardens', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await res.json()
    setWardens(data.wardens)

    const res2 = await fetch('/.netlify/functions/app/slc/facultyAdvisors', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data2 = await res2.json()
    setFacultyAdvisors(data2.facultyAdvisors)

    const res3 = await fetch(`/.netlify/functions/app/slc/students/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    let data3 = await res3.json()
    data3 = data3.student
    setName(data3.name)
    setPhoneNumber(data3.phoneNumber)
    setEmail(data3.email)
    setWarden(data3.warden)
    setFacultyAdvisor(data3.facultyAdvisor)
    setGender(data3.gender)
  }, [id])

  useEffect(() => {
    getData()
  }, [getData])

  const deleteHandler = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this student?'
    )
    if (!confirm) {
      return
    }

    const res = await fetch('/.netlify/functions/app/slc/students/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (res.status === 200) {
      navigate('/slc/manage/students')
    }
  }

  const handleUpdate = async () => {
    const data = {
      name,
      phoneNumber,
      email,
      password,
      warden,
      facultyAdvisor,
      gender,
    }
    const res = await fetch('/.netlify/functions/app/slc/students/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    })
    await res.json()
    if (res.status === 200) {
      navigate('/slc/manage/students')
    }
  }

  return (
    <div className='mt-10'>
      <div className='text-center w-full font-extrabold font-ubuntu text-4xl text-ezpass mb-10'>
        Edit Student
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
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Gender*
            </label>
            <select
              type='text'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              onChange={e => setGender(e.target.value)}
              value={gender}
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Warden*
            </label>
            <select
              type='date'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              onChange={e => setWarden(e.target.value)}
              value={warden}
            >
              {wardens.map(warden => (
                <option key={warden._id} value={warden._id}>
                  {warden.name}
                </option>
              ))}
            </select>
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Faculty Advisor*
            </label>
            <select
              type='date'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              onChange={e => setFacultyAdvisor(e.target.value)}
              value={facultyAdvisor}
            >
              <option>Select</option>
              {facultyAdvisors.map(fa => (
                <option key={fa._id} value={fa._id}>
                  {fa.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='w-1/2 flex flex-col items-end justify-center'>
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
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
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
              type='email'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className='w-4/5 mb-6'>
            <label
              htmlFor=''
              className='text-lg font-lato text-ezpass font-bold'
            >
              Password*
            </label>
            <input
              type='password'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='text-center w-full font-extrabold font-ubuntu text-4xl text-ezpass mb-10'>
        <button
          className='border-2 border-ezpass text-lg text-ezpass px-8 py-2 rounded-md font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold my-8 mr-4'
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className='border-2 border-ezpass text-lg text-ezpass px-8 py-2 rounded-md font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold my-8 '
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>

      <Footer />
    </div>
  )
}

export default EditStudents
