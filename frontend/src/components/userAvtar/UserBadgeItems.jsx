import { CloseIcon } from '@chakra-ui/icons'
import React from 'react'
import userprofile from '../userprofile'
import {Avatar, Box} from '@chakra-ui/react'

const UserBadgeItems = ({user, handleFunction}) => {
  return (
    <Box
    px={2}
    py={1}
    borderRadius="lg"
    m={1}
    mb={2}
    variant="solid"
    fontSize={12}
    cursor="pointer"
    display="flex"
    flexDir="column"
    justifyContent='center'
    alignItems="center"
    position="relative"
    w={12}
    fontWeight="bold"
    onClick={handleFunction}
    >
      <CloseIcon pl={1} h="12px" w="12px" style={{position:"absolute", top:"5px", left:"40px", }}/>
    <Avatar height={8} width={8} src={user.src}/>
    {user.name}
    
    </Box>
  )
}

export default UserBadgeItems;
