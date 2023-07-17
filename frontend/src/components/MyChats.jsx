import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/chatProvider' 
import {Box, Button, Stack, VStack , Text, StackDivider, Avatar} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import {getSender} from '../config/chatLogics' 
import GroupChatModel from './groupchatmodel'
import axios from 'axios'


const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const {selectedChat, setSelectedChat, user, chats, setChats, latestMessage, setLatestMessage} = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try{
      const config = {
        headers:{
            Authorization:`Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get("/api/chat", config);
      setChats(data);
    }catch(error){
      toast({
        title: 'Error Occured',
        description: error.message,
        position:"top-right",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(()=>{
    // console.log("userInfo ",JSON.parse(localStorage.getItem("userInfo"))); 
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
  }, [fetchAgain]);
  //console.log("logged user ",loggedUser);
  
  const span = document.getElementById('__limitMessage');
  const latestMessageWidth = document.getElementById('__latestMessage'); 


  console.log("span",span);
  console.log("latest message width",latestMessageWidth);

  // if(parseInt(latestMessageWidth.style.maxWidth) > 320){
  //   span.style.display = "block";
  // }

  return (<>

  <Box
  display={{base : selectedChat ? "none" : "flex", md:"flex"}}
  className='__userListSec'
  flexDir="column"
  alignItems="center"
  pl={5}
  pt={3}
  h="100%"
  bg="white"

  >
  {/* <Box
   pb={3}
   px={3}
   fontSize={{base:"28px", md:"30px"}}
   fontFamily="work Sans"
   d="flex"
   w="100%"
   justifyContent="space-between"
   alignItems="center"
   backgroundColor="red">
    My Chats
   
   <GroupChatModel>
    <Button
    d="flex"
    fontSize={{base:"17px", md:"10px", lg:"17px"}}
    rightIcon={<AddIcon/>}
    >New Group Chat</Button>
    </GroupChatModel>
  </Box> */}

   <Box
   d="flex"
   flexDir="column"
   b="F8F8F8"
   w="100%"
   h="615px"
  //  h="80%"
   overflowY="scroll"
   overflowX="hidden"
   
   >
    {chats?(
      <VStack spacing={0}>
        {chats.map((chat, index)=>(
        <Box
        display="flex"
        className='__userChatsList'
        onClick={() => setSelectedChat(chat)}
        cursor="pointer"
        bg={selectedChat === chat ? "#8fd4d1" : "white"}
        // bg={selectedChat === chat ? "#38B2AC" : "white"}
        color={selectedChat === chat ? "black" : "black"}
        mt={0}
        borderRadius="lg"
        key={chat._id}
        >
        {/* {console.log("chat ",chats)} */}
        <div style={{height:"78px", width:"16%", margin:"0px",borderBottom:"solid 1px white", display:"flex", justifyContent:"center", alignItems:"center"}}>
         <Avatar height="50px" width="50px" src={user.pic}/>
        </div>
        <div className='__chatLists' style={{height:"78px",width:"100%", borderBottom:"solid 1px rgba(0,0,0,0.2)" , padding:"5px 5px 5px 10px"}}>
        {!chat.isGroupChat ?(
            getSender(loggedUser, chat.users)
        )
        :( chat.chatName) 
        }
        {/* {latestMessage} */}
        {
          chat.latestMessage ? 
          chat.latestMessage.content !== undefined ? (<div style={{display:"flex"}}>
          <p className='__latestMessage' id="__latestMessage" style={{maxWidth:"350px", whiteSpace:"nowrap", overflow:"hidden", margin:"0"}}>{
            chat.latestMessage.content
            }</p>
          <span id='__limitMessage'>...</span></div>)
            
         :<></>:<></>
        }
       {/* {fetchAgain(!fetchAgain)} */}
        </div> 
        </Box>
        ))
        }
      </VStack>
    ):(
      null
    )
    }
   </Box>
  </Box>
  </>)
}

export default MyChats;
