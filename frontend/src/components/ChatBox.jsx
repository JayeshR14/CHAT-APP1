import React from 'react'
import {ChatState} from '../Context/chatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat'

const ChatBox = ({fetchAgain, setFetchAgain}) => {

  const {selectedChat} = ChatState();
  // console.log("selected Chat",selectedChat);
  return( 
  <Box
   display={{ base: selectedChat ? "flex" : "none", md:"flex"}}
   alignItems="center"
   fontWeight="500"
   bg="#E8E8E8"
   w={{base:"100%", md:"100%"}}
   h={{md:"760px",lg:"760px", base:"628px"}}
   overflowY="hidden"
   flexDir="column"
   >
   <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
   </Box>
   )    
}

export default ChatBox;
