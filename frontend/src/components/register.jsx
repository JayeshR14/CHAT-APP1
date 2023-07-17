import React from 'react'
import { useState } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import { Input } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import '../styles/registerLogin.css'

const Register = () => {
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setCPassword] = useState();

  const [pic, setPic] = useState();

  const [lrSate, setLRState] = useState(false);
  const [passState, setPassState] = useState(false);
  const [passCState, setCPassState] = useState(false);
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const submitHandler = async() => {
     setLoading(true);
     if(!name || !email || !password || !confirmpassword){
        toast({
            title: 'Please fill all the fields.',
            description: "Please fill all the fields.",
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:"bottom",
          });
          setLoading(false);
          return;
     }
     if(password !== confirmpassword){
      toast({
        title: 'Password do not match',
        description: "Password do not match",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });
      return;
     }

     try{
      const config = {
        headers:{
          "Content-type":"application/json",
        },
      };
      console.log("pic ", pic);
      const {data} = await axios.post(
        "/api/user",
        {name, email, password, pic}, 
        config);

        toast({
          title: 'Registration successful',
          description: "Registration successful",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
      // console.log("after pic data", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push('/chats');

      }catch(error){
        toast({
          title: 'Error Occured',
          description: "Error Occured",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        return;
     }
  }
  const postDetails = (pics) => {
      setLoading(true);
     
      if(pics === undefined){
        toast({
          title: 'Please select an image.',
          description: "image required",
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position:"bottom",
        });
        return;
      }


      //image is jpeg
      if(pics.type === "image/jpeg" || pics.type === "image/png"){
        const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset", "chatSystem");
        data.append("cloud_name", "de6cvtino");
        fetch("https://api.cloudinary.com/v1_1/de6cvtino/image/upload",{
            method : "post",
            body: data,
        })
        .then((res)=>res.json())
        .then((data)=>{
            setPic(data.url.toString());
             
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
            setLoading(false);
        });
      }else{
        toast({
            title: 'Image not supported.',
            description: "image not supported",
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:"bottom",
          });
          setLoading(false);
      }
  }
  console.log("setpic ", pic);
  const handlePassword = () => {
    if(passState) setPassState(false);
    else setPassState(true);
  }
  const handleCPassword = () => {
    if(passCState) setCPassState(false);
    else setCPassState(true);
  }

  return (<>
      <form className='__registerForm' onSubmit={handleSubmit}>
         <input 
         type="text" 
         placeholder='Your name'
         onChange={(e)=>setName(e.target.value)}/>

         <input 
         type="text" 
         placeholder='Your Email Address' 
         onChange={(e)=>setEmail(e.target.value)}/>

         <input 
         type={passState ? "text" : "password"} 
         placeholder='Password'
         onChange={(e)=>setPassword(e.target.value)}/>
         <label onClick={handlePassword} className="passLabel">{!passState ? "Show" : "Hide"}</label>
         
         <input 
         type={passCState ? "text" : "password"} 
         placeholder='Confirm Password'
         onChange={(e)=>setCPassword(e.target.value)}/>
         <label onClick={handleCPassword} className="CpassLabel">{!passCState ? "Show" : "Hide"}</label>
         
         <Input 
         type="file" accept='image/*' 
         onChange={(e)=>postDetails(e.target.files[0])}/>

         <button onClick={submitHandler}>Create Account</button>
      </form>
  </>
  )
}

export default Register;
