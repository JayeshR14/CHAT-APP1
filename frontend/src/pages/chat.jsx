import react from 'react'
import SearchSection from '../components/search';
import '../styles/chatPage.css'
import MyChats from '../components/MyChats';
import { ChatState } from '../Context/chatProvider';
import {Box} from "@chakra-ui/react"
import ChatBox from '../components/ChatBox';
import {useState} from 'react';

const Chat = () => {
  const { user, alignItem, setAlignItems, selectedChat} = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
  <Box
  flexDir={{base: "column", md:"row"}}
  style={{display:"flex", minWidth:"100%", minHeight:"100vh", overflowY:"hidden"
  }}>
  <div className='__leftChatSection'>
   {user && <SearchSection/>}
   {user && <MyChats fetchAgain={fetchAgain}/>}
   </div>
   <Box className='__rightChatSection' padding={{base:"5px 10px 5px 10px", md:"0px 0px 0px 0px", lg:"0px 0px 0px 0px" }}>
   {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
   </Box>
  </Box>
  );
}

export default Chat;
