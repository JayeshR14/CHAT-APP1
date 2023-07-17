import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSenderMargin, isSameUser } from '../config/chatLogics';
import { ChatState } from '../Context/chatProvider'
import { Box } from '@chakra-ui/react';

const ScrollableChat = ({message}) => {

  const {user} = ChatState();

  return (
    <Box className='__chatListSec' height={{base:"490px",md:"616px", lg:"616px"}} style={{overflowY:"auto", paddingLeft:"20px", paddingRight:"40px", fontSize:"16px"}}>
     {message && message.map((m,i)=>{
           return <div style={{display:"flex"}} key={m._id}>
                <span
                style={{
                    backgroundColor:`${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                    borderRadius:"20px", 
                    padding:"5px 15px", 
                    maxWidth:"75%",
                    marginLeft:isSameSenderMargin(message, m, i, user._id),
                    marginTop:isSameUser(message,m,i, user._id) ? 5 : 10,
                }}
                >{m.content}</span>
            </div>
         })
     }
    </Box>
    )
}

export default ScrollableChat;
