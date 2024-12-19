import React, { useReducer } from 'react'
import useAuth from '../hook/useAuth'

const HeaderAdmin = () => {
    const currUser = useAuth()
    const {clearUser} = useAuth()

    const handleLogout = () =>{
        clearUser()
        window.location.href = '/'
      }

    
  return (
    <div className=''>
        <div>
            <p>Xin chào, {currUser.user.firstName} </p>
            <p>Role: Admin </p>
            <button className='p-5 border border-blue-600 ' onClick={handleLogout}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default HeaderAdmin