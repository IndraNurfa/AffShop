import React from 'react';
import { Box, Container, Flex, VStack } from '@chakra-ui/react';
import Header from './Header';
import CommentSection from './CommentSection';
import useProduct from '../hooks/useProduct';
import ProductCard from './ProductCard';
import VideoPlayer from './VideoPlayer';
import useVideoPlayer from '../hooks/useVideoPlayer';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const DetailPage = () => {
  const location = useLocation();

  const queryParams = queryString.parse(location.search);

  const videoId = queryParams.videoId || null;

  const products = useProduct(videoId);
  const videos = useVideoPlayer(videoId);

  return (
    <>
      <Header />
      <Container maxW="full" m="0">
        <Flex flexDirection="column" marginTop="10px">
          <Flex w="100%" justify="space-between" p="2">
            <Box w="20%" h="88vh" overflow="auto">
              <VStack spacing={4} align="center" m="10px">
                <ProductCard products={products} />
              </VStack>
            </Box>
            <Box w="60%">
              <VideoPlayer videos={videos} />
            </Box>
            <Box w="20%">
              <CommentSection />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default DetailPage;
