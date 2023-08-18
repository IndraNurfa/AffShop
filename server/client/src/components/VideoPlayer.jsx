import React from 'react';
import {
  Box,
  Flex,
  Text,
  useColorMode,
  Heading,
  Avatar,
} from '@chakra-ui/react';

const VideoPlayer = ({ videos }) => {
  const colorMode = useColorMode();

  return (
    <>
      <Box width="100%" height="0" position="relative" paddingBottom="56.25%">
        <iframe
          src={videos.videoUrl}
          title="YouTube Video Player"
          frameBorder="0"
          allowFullScreen
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        ></iframe>
      </Box>
      <Box
        mt="2"
        bg={colorMode === 'dark' ? 'silver' : 'gray.500'}
        p="4"
        rounded="md"
      >
        <Heading mt="2">{videos.title}</Heading>
        <Flex alignItems="center" mt="2">
          <Avatar size="md" name={videos.username} />
          <Box ml="2">
            <Text fontSize="lg" fontWeight="semibold">
              {videos.username}
            </Text>
          </Box>
        </Flex>
        <Text mt="2">{videos.description}</Text>
      </Box>
    </>
  );
};

export default VideoPlayer;
