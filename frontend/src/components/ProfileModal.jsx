import React from 'react'
import { AddIcon, ViewIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image, 
    Text,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'

const ProfileModal = ({user, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    {children 
    ? 
    (<span onClick={onOpen}>{children}</span>)
    :
    (<IconButton
    d={{base:"flex"}}
    icon={<ViewIcon/>}
    onClick={onOpen}
    />)
    }
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontFamily="Roboto"
          fontSize="35px"
          d="flex"
          justifyContent="center">{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
          d="flex"
          flexDir="column"
          justifyContent="space-between"
          alignItems="center">
          <Image
          borderRadius="full"
          src={user.pic}
          alt={user.name}
          />
          <Text
          fontFamily="Roboto"
          fontSize="30px">
          Email : {user.email}
          </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal;
