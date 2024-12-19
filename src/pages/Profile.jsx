import React from 'react'
import useAuth from '../hook/useAuth'

const Profile = () => {
  const currUser = useAuth()
  return (
    <div className='h-screen'>
        <div className='pt-28'>
            <h1 className='text-4xl font-bold text-center'>Profile</h1>
        </div>
    </div>
  )
}

export default Profile