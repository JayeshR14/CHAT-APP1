import React from 'react'
import { useHistory } from 'react-router-dom';
const userprofile = () => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  }

  return (
    <>
    <div className='__headerDropOption'>
      <div className='__sec1'>
        My Profile
      </div>
      <div className='__sec2' onClick={logoutHandler}>
        Logout
      </div>
    </div>
    </>
  )
}

export default userprofile;
