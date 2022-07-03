import React, { useState, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'

function EditWarden() {
  const navigate = useNavigate()

  const id = useLocation().pathname.split('/edit/')[1]

  const [warden, setWarden] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    profileUrl: '',
  })

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [profileUrl, setProfileUrl] = useState('')

  const { email } = warden

  const getWarden = useCallback(async () => {
    const res = await fetch('/.netlify/functions/app/slc/wardens/' + id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await res.json()
    setWarden(data.warden)
    setName(data.warden.name)
    setPhoneNumber(data.warden.phoneNumber)
    setProfileUrl(data.warden.profileUrl)
  }, [id, setWarden])

  useEffect(() => {
    getWarden()
  }, [getWarden])

  const updateHandler = async () => {
    const updateData = {
      name,
      phoneNumber,
      profileUrl,
    }

    if (password.length > 1) {
      updateData.password = password
    }

    const res = await fetch('/.netlify/functions/app/slc/wardens/' + id, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
    if (res.status === 200) {
      navigate('/slc/manage/wardens')
    }
  }

  const deleteHandler = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this faculty advisor?'
    )
    if (!confirm) {
      return
    }

    const res = await fetch('/.netlify/functions/app/slc/wardens/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (res.status === 200) {
      navigate('/slc/manage/wardens')
    }
  }

  return (
    <div className='mt-10'>
      <div className='text-center w-full font-extrabold font-ubuntu text-4xl text-ezpass mb-10'>
        Edit Faculty Advisor
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
              Profile URL*
            </label>
            <input
              type='url'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={profileUrl}
              onChange={e => setProfileUrl(e.target.value)}
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
              type='email'
              className='block rounded-lg border-2 border-ezpass px-4 py-1 mt-2 w-full'
              value={email}
              readOnly
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
          onClick={updateHandler}
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

export default EditWarden
