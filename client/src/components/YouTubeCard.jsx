import React from 'react';
import { Box, Image, Heading, Flex, Text } from '@chakra-ui/react';

const YouTubeCard = ({ video }) => {
  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        m="2"
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
      >
        <Image src={video.imageUrl} alt={video.title} />

        <Heading size="md" m="2">
          {video.title}
        </Heading>

        <Box p="2" mb="2" ml="2">
          <Flex alignItems="center">
            <Text color="gray.500" fontSize="sm">
              {video.username}
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default YouTubeCard;
