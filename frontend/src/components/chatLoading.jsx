import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
const chatLoading = () => {
  return (
    <>
  <Stack>
  <Skeleton height='40px' />
  <Skeleton height='40px' />
  <Skeleton height='40px' />
  <Skeleton height='40px' />
  <Skeleton height='40px' />
  <Skeleton height='40px' />
  <Skeleton height='40px' />
  <Skeleton height='40px' />
  <Skeleton height='40px' />
  <Skeleton height='40px' />
  <Skeleton height='40px' />
  <Skeleton height='40px' />
   </Stack>
    </>
  )
}

export default chatLoading
