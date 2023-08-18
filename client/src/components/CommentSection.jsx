import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Input,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import moment from 'moment';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import useSession from '../hooks/useSession';

const CommentSection = () => {
  const location = useLocation();
  const session = useSession();
  const toast = useToast();

  const queryParams = queryString.parse(location.search);

  const videoId = queryParams.videoId || null;
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState();
  const [numberOfComments, setNumberOfComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/getComment/${videoId}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [videoId, numberOfComments]);

  const handleCommentSubmit = async () => {
    try {
      if (!session.user) {
        toast({
          title: 'Submit Failed',
          description: 'You are not logged in!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      if (newComment.trim() !== '') {
        await axios.post('/api/comment', {
          comment: newComment,
          videoId: videoId,
        });

        setNewComment('');
        setNumberOfComments(numberOfComments + 1);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <>
      <VStack spacing="1" align="stretch" ml="10px">
        <Box
          bg="blue.500"
          color="white"
          py="1"
          px="2"
          textAlign="center"
          w="100%"
        >
          Comment
        </Box>

        <Box borderWidth="1px" borderRadius="md" p="4" h="78vh" overflow="auto">
          <VStack spacing="2" align="stretch">
            {comments?.map(comment => (
              <Box key={comment._id} p="2" borderRadius="md">
                <Text>
                  <b>{comment.username}:</b> {comment.comment}
                </Text>
                <Text fontSize="sm">
                  {moment(comment.timestamp).format('DD MMM YYYY')}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>

        <Flex align="center">
          <Input
            flex="1"
            placeholder="Add a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
          <Button
            ml="2"
            colorScheme="blue"
            leftIcon={<FaPaperPlane />}
            onClick={handleCommentSubmit}
          ></Button>
        </Flex>
      </VStack>
    </>
  );
};

export default CommentSection;
