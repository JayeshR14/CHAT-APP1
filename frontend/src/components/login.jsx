import React from 'react'
import { useState } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import '../styles/registerLogin.css'

const Login = () => {
  const toast = useToast();
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [tempData, setTempData] = useState([]);

  const [passState, setPassState] = useState(false);

  const submitHandler = async()=> {
      if(!email || !password){
        toast({
          title: 'Fields are required.',
          description: "Fields are required.",
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        return;
      }
      try{
        const config = {
          header:{
            "Content-type" : "application/json",
          },
        }
        const {data} = await axios.post("/api/user/login",{email,password},config);
        toast({
          title: 'Login successful',
          description: "Login successful",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
       
        localStorage.setItem("userInfo", JSON.stringify(data));
      
        history.push("/chats");

      }catch(error){
        toast({
          title: 'Some error',
          description: "Some error",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        return;
      }
  }

  const handlePassword = () => {
    if(passState) setPassState(false);
    else setPassState(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (<> 
      <form className='__loginForm'  onSubmit={handleSubmit}>
         <input 
         type="text" 
         placeholder='Your Email Address'
         onChange={(e)=>setEmail(e.target.value)}/>

         <input 
         type="text" 
         placeholder='Password'
         onChange={(e)=>setPassword(e.target.value)}/>
         <label onClick={handlePassword} className="loginPassLabel">{!passState ? "Show" : "Hide"}</label>
         
         <button onClick={submitHandler}>Login</button>
      </form>
  </>
  )
}

export default Login;
