import React from 'react'
import { Tooltip, Button, Text, FormControl, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { ChatState } from "../Context/chatProvider"
import Userprofile from '../components/userprofile'
import { useDisclosure } from '@chakra-ui/react'
import ChatLoading from '../components/chatLoading'
import UserListItems from '../components/userAvtar/userListItems'
import { Effect } from 'react-notification-badge'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge'
import GroupChatModel from './groupchatmodel'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import axios from 'axios'
import ViewProfile from '../components/viewProfile'
import { Select } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Input
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { BellIcon, ChevronLeftIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { getSender } from '../config/chatLogics'

const SearchSection = () => {
  const toast = useToast();

  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();
  const { isOpen: isOpenSearch, onOpen: onOpenSearch, onClose: onCloseSearch } = useDisclosure();

  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();

  const [userOption, setUserOption] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const [viewProfile, setViewProfile] = useState(false);
  const handleOption = () => {
    if (!userOption) setUserOption(true);
    else setUserOption(false);
  }

  const handleSearchSec = () => {
    setSearchState(true);
  }

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please enter user name to search',
        description: "We've created your account for you.",
        position: "top-right",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: `${error.message} Occurred`,
        description: "We've created your account for you.",
        position: "top-right",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post("/api/chat", { userId }, config);

      //chat already exist
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      console.log("data", data);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error occurs',
        description: error.message,
        position: "top-right",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const accessNotificationChat = (event) => {
    alert("clicked");
    // console.log("event", event);
    // console.log("notif", notif);
    // setSelectedChat(notif.chat);
    // setNotification(notification.filter((n)=> n !== notif))
  };

  return (
    <>
      <Box className='__headerSec'
        height={{ base: "140px", md: "150px", lg: "150px" }} >

        <div className='__headerOptionsSec'>

          <Avatar name='Dan Abrahmov' height="50px" width="50px" src={user.pic} />
          <div className='__headerOption'>

            <Menu>

              <MenuButton p={1}>

                <NotificationBadge
                  count={notification.length}
                  effect={Effect.SCALE}
                />
                <Tooltip label='Notification' placement='bottom'>
                  <BellIcon fontSize="2xl" m={1} />
                </Tooltip>
                <MenuList pl={2}>
                  {!notification.length && "no new message"}
                  {notification.map((notif) => (
                    <ul key={notif._id}>
                      <li
                        className='__recentNotification'
                        key={notif._id}
                        onClick={() => {
                          //  console.log("notif", notif);
                          setSelectedChat(notif.chat);
                          setNotification(notification.filter((n) => n !== notif))
                        }}>
                        {/* {console.log("notif",sender)} */}
                        {notif.chat.isGroupChat
                          ? `New Message in ${notif.chat.chatName}`
                          : `New Message from ${getSender(user, notif.chat.users)}`
                        }
                      </li>
                    </ul>
                  ))}
                </MenuList>

              </MenuButton>

            </Menu>

            <Tooltip label='Creat Chat' placement='bottom'>
              <svg xmlns="http://www.w3.org/2000/svg" onClick={onOpenSearch} width="24" height="24" fill="none" viewBox="0 0 24 24" id="whatsapp-new-chat"><path fill="#000" fill-rule="evenodd" d="M3 4.5C1.89543 4.5 1 5.39543 1 6.5V17.5C1 18.6046 1.89543 19.5 3 19.5H17C18.1046 19.5 19 18.6046 19 17.5V11.3252L22.8087 6.08817C23.03 5.78399 23.0618 5.38139 22.8911 5.04622C22.7204 4.71105 22.3761 4.5 22 4.5H18H3ZM15 11H5V9H15V11ZM5 15H12V13H5V15Z" clip-rule="evenodd"></path></svg>
            </Tooltip>

            <GroupChatModel>
              <Tooltip label='Create Group' placement='bottom'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" id="group"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>
              </Tooltip>
            </GroupChatModel>



            {/* view profile */}
            <Menu>
              <Tooltip label='More' placement='bottom'>
                <MenuButton
                  aria-label='Options'
                  variant='outline'
                >
                  <svg fill="none" onClick={onOpenProfile} viewBox="0 0 24 24" height="26" width="26" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="stroke-4a5568"></path></svg>
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem justifyContent="center" onClick={onOpenProfile}>
                  Profile
                </MenuItem>
                <MenuItem justifyContent="center">
                  New Window
                </MenuItem>
                <MenuItem justifyContent="center">
                  Open Closed Tab
                </MenuItem>
                <MenuItem justifyContent="center">
                  logout
                </MenuItem>
              </MenuList>
            </Menu>




            {/* { !userOption ?
        <button onClick={handleOption}><i className="fa fa-angle-down" aria-hidden="true"></i></button>
        : <button onClick={handleOption}><i className="fa fa-angle-up" aria-hidden="true"></i></button> 
        } */}
            {
              // userOption ?  
              // <Userprofile/>: null
            }
          </div>
        </div>

        <Box className='__searchSec'>
          {/* <i className="fa fa-search" aria-hidden="true"></i> */}
          <FormControl>
            <Input
              placeholder="Start chat by search user"
              onClick={onOpenSearch}
              outline="none"
              focusBorderColor='none'
              _focusVisible="none"
              borderRightRadius={22}
              borderLeftRadius={22}
              fontSize="20px"

            />
          </FormControl>
        </Box>


        {/* search user drawer */}
        <Drawer
          placement='left'
          onClose={onCloseSearch}
          isOpen={isOpenSearch}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="2px" height="66px">Search User</DrawerHeader>
            <DrawerBody>
              <Box
                display="flex"
                pb={2}
              >
                <Input
                  className='__searUserInput'
                  placeholder='search user'
                  mr={1}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  outline="none"
                  onFocus="none"
                />
                <Button
                  onClick={handleSearch}
                >
                  Go
                </Button>
              </Box>
              {loading ?
                (
                  <ChatLoading />
                ) : (
                  searchResult?.map(user => {
                    return <UserListItems
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  })
                )
              }
            </DrawerBody>
          </DrawerContent>
        </Drawer>


        {/* view Profile */}
        <Drawer
          isOpen={isOpenProfile}
          placement='left'
          onClose={onCloseProfile}
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
            </DrawerHeader>
            <DrawerBody display="flex" justifyContent="start" mt={10} flexDir='column' alignItems="center">
              <Text fontSize={28} fontWeight="600" w="100%" mb={5}>
                Profile</Text>
              <Avatar h="250px" w="250px" src={user.pic}/>
              <Box mt={10} h={24} display="flex" w="100%" justifyContent='space-between' flexDir="COLUMN">
              <Text fontSize={24} fontWeight="500">Your Name</Text>
               <Box d="flex" flexDir="row">
              <Input value={user.name} w="350px" mr={5} />
              <svg height={26} width={26} style={{display:"inline"}} xmlns="http://www.w3.org/2000/svg"><path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/></svg>
              </Box>
              </Box>
              <Box display="flex" flexDir="column" h={20} mt={12} w="100%" justifyContent='space-between'>
              <Text fontSize={24} fontWeight="500">Your Email</Text>
              < Text fontSize={18}>{user.email}</Text>
              </Box>
            </DrawerBody>
            <DrawerFooter>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  )
}

export default SearchSection;
