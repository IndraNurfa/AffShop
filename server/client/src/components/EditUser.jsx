import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Input,
  Button,
  Flex,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom'; // Import useHistory to handle navigation
import useProfile from '../hooks/useProfile';
import axios from 'axios';
import Header from './Header';

const EditUser = () => {
  const profile = useProfile();
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [pict, setPict] = useState('');

  useEffect(() => {
    setUsername(profile.username);
  }, [profile.username]);

  useEffect(() => {
    setPict(profile.pict);
  }, [profile.pict]);

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePhotoUrlChange = e => {
    setPict(e.target.value);
  };

  const history = useHistory();

  const handleEditClick = e => {
    e.preventDefault();

    if (!username) {
      toast({
        title: 'Incomplete Input',
        description: 'Please fill the username.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } else {
      editUser(e);
    }
  };

  const editUser = async e => {
    console.log(username, pict);

    try {
      console.log(username, pict);

      const response = await axios.post('/api/profile', {
        username,
        pict,
      });

      console.log(response);

      if (response.status === 200) {
        window.location.href = '/profile';
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancelClick = () => {
    history.goBack();
  };

  return (
    <>
      <Header />
      <Container maxW="container.md">
        <Box bg="darkgray" p="4" rounded="md" mt="4">
          <Heading>Edit User</Heading>
          <Flex direction="column" mt="4">
            <Avatar
              src={pict || profile.pict}
              alt="Profile"
              size="2xl"
              name={profile.username}
              objectFit="cover"
              mb="20px"
            />

            <Input
              placeholder="Photo URL"
              _placeholder={{ color: 'inherit' }}
              value={pict || ''}
              onChange={handlePhotoUrlChange}
              mb="4"
            />
            <Input
              placeholder="Username"
              _placeholder={{ color: 'inherit' }}
              value={username || ''}
              onChange={handleUsernameChange}
              mb="2"
            />
            <Button colorScheme="yellow" onClick={handleEditClick} mb="2">
              Edit
            </Button>
            <Button colorScheme="blue" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Flex>
        </Box>
      </Container>
    </>
  );
};

export default EditUser;
