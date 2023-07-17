import React from 'react'
import { useState } from 'react';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button, useDisclosure, FormControl, useRadio, Input, useToast, slideFadeConfig, Box} from '@chakra-ui/react'
import { ChatState } from '../Context/chatProvider';
import axios from 'axios';
import UserListItems from './userAvtar/userListItems';
import UserBadgeItems from '../components/userAvtar/UserBadgeItems';

const GroupChatModel = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false); 

 const toast = useToast(); 

  const {user, chats, setChats } = ChatState();

  const handleSearch = async(query) => {
     setSearch(query);

     if(!query){
        return;
     }

     try{
      setLoading(true)
     console.log("jii");
      const config = {
        headers : {
            Authorization : `Bearer ${user.token}`,
        },
      };
    
      const {data} = await axios.get(`/api/user?search=${search}`, config);
      console.log("hii");
      console.log(data);
      setLoading(false);
      setSearchResult(data);

     }catch(error){
        toast({
            title: 'Error Occured',
            description: "failed to load results.",
            position:"top-right",
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          return;
        }
  }

  const handleSubmit = async() => {
    if(!groupChatName || !selectedUser){
        toast({
            title: 'PLease fill all the fields',
            description: "failed to load results.",
            position:"top-right",
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
          return;
    }
    try{
     const config = {
        headers : {
            Authorization : `Bearer ${user.token}`
        }
     }
    const {data} = await axios.post(`/api/chat/group`,{
        name : groupChatName,
        users : JSON.stringify(selectedUser.map((u)=>u._id)),
    }, config);
    setChats([data, ...chats]);
    onClose();
    toast({
        title: 'New Group created successfully',
        description: "failed to load results.",
        position:"top-right",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }catch(error){
        toast({
            title: 'failed to create chat',
            description: "failed to load results.",
            position:"top-right",
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
    
    }
  }

  const handleDelete = (delUser) => {
    try{
     setSelectedUser(selectedUser.filter(sel => sel._id !== delUser._id));
     toast({
      title: 'User Removed',
      description: "failed to load results.",
      position:"top-right",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    }catch(error){
      toast({
        title: 'failed to remove User',
        description: "failed to load results.",
        position:"top-right",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleGroup = (userToAdd) => {
    if(selectedUser.includes(userToAdd)){
        toast({
            title: 'User Already Exist',
            description: "failed to load results.",
            position:"top-right",
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
          return;
    }
    setSelectedUser([...selectedUser, userToAdd]);
  }

  return ( 
    <>
      <span onClick={onOpen}>{children}</span>
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader d="flex" fontSize="30px" justifyContent="center">Create a New Group</ModalHeader>
    <ModalCloseButton />
    <ModalBody d="flex" flexDir="column" alignItems="center">
   
       
        <FormControl>
        
        <Input placeholder="Group Name"
        mb={3}
        onChange={(e)=>setGroupChatName(e.target.value)}/>
        </FormControl>
        <FormControl>
        <Input placeholder="Search user"
        onChange={(e)=>handleSearch(e.target.value)}/>
        </FormControl>
    

        {/* selected user*/}
        <Box display="flex" flexWrap="wrap">
        {selectedUser.map((u)=>{
          return <UserBadgeItems 
          key={u._id}
          user={u}
          handleFunction={()=>handleDelete(u)}/>
        })
        }
        </Box>

        {/* search users */}
        {loading ? <div>loading</div> 
        :(
            searchResult?.slice(0,4).map((user)=><UserListItems 
            key={user._id} 
            user={user} 
            handleFunction={()=>handleGroup(user)}/>)
        )
        }
    </ModalBody>
    <ModalFooter>
      <Button colorScheme='blue' onClick={handleSubmit}>
        Create Group
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  )
}

export default GroupChatModel
