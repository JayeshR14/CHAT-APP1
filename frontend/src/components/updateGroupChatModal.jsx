import React, {useState} from 'react'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,IconButton,Button,Text,useDisclosure,Box, FormControl, Input} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { ChatState } from '../Context/chatProvider'
import {useToast} from '@chakra-ui/react'
import UserBadgeItems from './userAvtar/UserBadgeItems'
import axios from 'axios'
import UserListItems from './userAvtar/userListItems'
import { m } from 'framer-motion'


const UpdateGroupChatModal = ({fetchAgain, setFetchAgain, fetchMessages}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();
    const {selectedChat, setSelectedChat, user} = ChatState();

    const handleRemove = async(user1) => {
      if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id){
        toast({
          title: 'Only admins can remove someone!',
          description: "We've created your account for you.",
          position:"top-right",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
       }

       try{
         setLoading(true);
         const config = {
          headers : {
            Authorization : `Bearer ${user.token}`,
          },
         }

         const {data} = await axios.put("/api/chat/groupremove", {
          chatId : selectedChat._id,
          userId: user1._id,
         }, config);

         user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
         setFetchAgain(!fetchAgain);
         fetchMessages();
         setLoading(false);

       }catch(error){
        toast({
          title: 'Error Occured',
          description: "We've created your account for you.",
          position:"top-right",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
       setLoading(false);
      }

    }

    const handleAddUser = async(user1) => {
     if(selectedChat.users.find((u) => u._id === user1._id)){
      toast({
        title: 'User Already in group!',
        description: "We've created your account for you.",
        position:"top-right",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
     }
     
     if(selectedChat.groupAdmin._id !== user._id){
      toast({
        title: 'Only admins can add someone!',
        description: "We've created your account for you.",
        position:"top-right",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
     }

     try{
       setLoading(true);
       const config = {
        headers : {
          Authorization : `Bearer ${user.token}`,
        },
       };

       const {data} = await axios.put("/api/chat/groupadd", {
        chatId : selectedChat._id,
        userId : user1._id,
       }, config);

       setSelectedChat(data)
       setFetchAgain(!fetchAgain);
       setLoading(false);
     }catch(error){
      toast({
        title: 'Error Occured',
        description: "We've created your account for you.",
        position:"top-right",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
     }
 

    }

    const handleRename = async() => {
       if(!groupChatName) return;
       try{
        setRenameLoading(true)
        const config = {
            headers : {
                Authorization : `Bearer ${user.token}`,
            },
        };
        const {data} = await axios.put("/api/chat/rename",{
            chatId : selectedChat._id,
            chatName: groupChatName,
        }, config);
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);
       }catch(error){

        toast({
            title: 'Error Occured',
            description: "We've created your account for you.",
            position:"top-right",
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          setRenameLoading(false);

       }
       setGroupChatName("");
    }

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

    return (<>
        <IconButton onClick={onOpen} d={{base:"flex"}} icon={<ViewIcon/>}/>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedChat.chatName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
                    {selectedChat.users.map((u)=>{
                     return <UserBadgeItems
                     key={user._id}
                     user={u}
                     handleFunction={()=>handleRemove(u)}
                     />
                    })
                    }
                </Box>
                <FormControl>
                    <Input
                    placeholder='Chat Name'
                    mb={3}
                    value={groupChatName}
                    onChange={(e)=>setGroupChatName(e.target.value)}
                    />
                    <Button
                    variant="solid"
                    colorSchema="teal"
                    ml={1}
                    isLoading={renameLoading}
                    onClick={handleRename}
                    >
                     Change
                    </Button>
                </FormControl>
                <FormControl>
                    <Input
                    placeholder='Add user to group'
                    mb={1}
                    onChange={(e)=>handleSearch(e.target.value)}
                    />
                </FormControl>
                {loading ? (<></>)
                :(searchResult?.map((user)=>(
                  <UserListItems
                  key={user._id}
                  user={user}
                  handleFunction={()=>handleAddUser(user)}/>
                )))
                }
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='red' onClick={()=>handleRemove(user)}>
                Leave Group
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </>
  )
}

export default UpdateGroupChatModal;
