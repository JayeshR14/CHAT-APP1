import React from 'react'
import { useState } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import '../styles/registerLogin.css'
import Login from '../components/login'
import Register from '../components/register'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useEffect } from 'react'


const home = () => {
  const history = useHistory();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user){
      history.push("/chats");
    }
  }, [history]);

  const [lrSate, setLRState] = useState(false);

  // login toggle
  const setLoginState = (e) => {
    setLRState(false);
  }
  // register toggle
  const setRegisterState = () => {
    setLRState(true);
  }
  const lrStyle = {
    borderBottomStyle : "solid",
    borderBottomColor: "black",
    borderBottomWidth: "3px"
  }
  const noLrStyle = {
    borderBottomStyle : "none",
    borderBottomWidth: "0px"
  }

  return (<>
  <div className="__mainLogin">
  <div className="__main">
    <div className="__toggle">
      <div className="__divL" onClick={setLoginState} style={!lrSate ? lrStyle : noLrStyle }>Login</div>
      <div className="__divR" onClick={setRegisterState} style={lrSate ? lrStyle : noLrStyle }>Register</div>
    </div>

    { lrSate ? 
     <Register/>
  :
     <Login/>
}
    </div>
    </div>
  </>
  )
}

export default home
