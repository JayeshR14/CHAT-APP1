import React, {useState} from 'react'
import { ChatState } from '../Context/chatProvider';
import {Box, FormControl, IconButton, Input, Text, Avatar} from '@chakra-ui/react'
import { ArrowBackIcon, SpinnerIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { getSender } from '../config/chatLogics';
import ProfileModal from './ProfileModal';
import {getSenderFull, isSameSenderMargin} from '../config/chatLogics'
import UpdateGroupChatModal from './updateGroupChatModal';
import ScrollableChat from '../components/ScrollableChat';
import { Spinner } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Lottie from 'react-lottie'
import animationData from '../animation/typing.json'
import io from 'socket.io-client'
import axios from 'axios';
import { useEffect } from 'react';

const ENDPOINT = "http://localhost:5500/"
let socket, selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {
  
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);

  const {user, selectedChat, setSelectedChat, notification , setNotification} = ChatState();
  
  const toast = useToast();

  const defaultOptions = {
    loop : true,
    autoplay : true,
    animationData : animationData,
    rendererSettings : {
      preserveAspectRation : "xMidyMid slice",
    },
  };

  useEffect(()=>{
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => { setSocketConnected(true);})
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
   }, [])

 

  const typingHandler = (e) => {
      setNewMessage(e.target.value);

      if(!socketConnected) return;

      if(!typing){
        setTyping(true);
        socket.emit("typing", selectedChat._id);
      }

      let lastTypingTime = new Date().getTime();
      let timerLength = 3000;
      setTimeout(()=>{
        let timeNow = new Date().getTime();
        let timeDiff = timeNow - lastTypingTime;

        if(timeDiff >= timerLength && typing){
          socket.emit("stop typing", selectedChat._id);
          setTyping(false);
        }
      }, timerLength);
  }

  const fetchMessages = async() => {
    if(!selectedChat) return;

    try{
      setLoading(true);
     const config = {
      headers : {
        Authorization : `Bearer ${user.token}`
      },
     };

     const {data} = await axios.get(`/api/message/${selectedChat._id}`, config);
    //  console.log("all messages ", data);
     setMessage(data);
     setLoading(false);

     socket.emit("join chat", selectedChat._id);

    }catch(error){
     toast({
      title: 'Error Occured',
      description: "Failed to load message",
      position:"top-right",
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return;
    }
  }

  const sendMessage = async(event) => {

  if(event.key === "Enter" && newMessage){
   try{
     const config = {
      headers : {
        "Content-Type":"application/json",
        Authorization : `Bearer ${user.token}`
      }
     }

     setNewMessage("");

     const {data} = await axios.post("/api/message",{
        content:newMessage,
        chatId:selectedChat._id,
     }, config);

    // console.log(data);

    socket.emit("new message", data);

    setMessage([...message, data]);

   }catch(error){
    toast({
      title: 'Error Occured',
      description: "Failed to send message",
      position:"top-right",
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return;
   }
  }
  }

  useEffect(()=>{
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // console.log(notification, "--------------");

  useEffect(()=>{
     socket.on("message received", (newMessageReceived)=>{
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        if(!notification.includes(newMessageReceived)){
          setNotification([newMessageReceived, ...notification])
          setFetchAgain(!fetchAgain);
        }
      }else{
        setMessage([...message, newMessageReceived]);
      }
     })
  })

  return (
    <>
    {selectedChat ? (
    <>
     <Box
     fontSize={{base:"28px", md:"30px", lg:"30px"}}
     height={{base:"70px", lg:"75px", md:"75px"}}
     pl={{md:"35px", lg:"35px"}}
     w="100%"
     fontFamily="Work sans"
     display="flex"
     zIndex="100"
     alignItems="center"
     >
    
    <IconButton 
    backgroundColor="transparent"
    _hover="trasparent"
    display={{base:"flex", lg:"none", md:"none"}}
    icon={<ChevronLeftIcon height={8} width={8}/>}
    onClick={()=>setSelectedChat("")}
    />
     
    {!selectedChat.isGroupChat ? 
    (<>
      <Avatar height="50px" width="50px" src={user.pic}/>
      {/* <Box display="flex" flexDir="column" justifyContent="space-between" height="20px"> */}
      <span style={{marginLeft:"15px", fontSize:"25px"}}>{getSender(user, selectedChat.users)}</span>
      {/* {isTyping ?
      (<><Text fontSize={2}>Typing</Text></>) 
      : (<></>)} */}
      {/* </Box> */}
      {/* <ProfileModal user={getSenderFull(user, selectedChat.users)}/> */}
    </>) 
    : 
    (<>
    <Avatar src={user.pic}/>
    {selectedChat.chatName.toUpperCase()}
    <UpdateGroupChatModal
    fetchAgain={fetchAgain}
    setFetchAgain={setFetchAgain}
    fetchMessages={fetchMessages}
    />
    </>)
    }
    </Box>
    <Box
    className='__messages'
    pl={2}
    pb={2}
    bg="#E8E8E8"
    w="100%"
    >
      
     {/* {!loading?(<></>) : ( */}
     <div className='messages'>
      <ScrollableChat message={message}/>
     </div>
    <FormControl onKeyDown={sendMessage} mt={3} isRequired>
      <Input
      className='__typeInput' 
      bg="rgba(150,150,150, 0.4)"
      placeholder='start a chat'
      outline="none"
      focusBorderColor='none'
      _focusVisible="none"
      borderRightRadius={0}
      borderLeftRadius={22}
      pl={5}
      h={12}
      fontSize="18px"
      onChange={typingHandler}
      value={newMessage}
      /></FormControl>
    </Box>
     </>
    ) : (
     <Box
     display="flex"
     alignItems="center"
     justifyContent="center"
     h="100%"
     >
        <Text 
        fontSize="3xl"
        pb={3}
        fontFamily="Work sans">
            Click on user to start chatting</Text>
     </Box>
    )
    }
    </>   
  )
}

export default SingleChat;
