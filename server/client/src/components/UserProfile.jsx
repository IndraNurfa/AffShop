import React from 'react';
import {
  Container,
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Avatar,
} from '@chakra-ui/react';
import useProfile from '../hooks/useProfile';
import Header from './Header';

const UserProfile = () => {
  const profile = useProfile();

  const handleEditUser = () => {
    window.location.href = '/editProfile';
  };

  return (
    <>
      <Header />
      <Container maxW="container.md">
        <Box bg="darkgray" p="4" rounded="md" mt="4">
          <Text fontSize="lg" fontWeight="semibold" align="center">
            User Profile
          </Text>
          <Flex align="center" justify="space-around" mt="20px">
            <Avatar
              src={profile.pict}
              alt="Profile"
              size="2xl"
              name={profile.username}
              objectFit="cover"
            />
            <VStack align="flex-start" spacing="1" ml="4">
              <Text fontSize="md">Username:</Text>
              <Text fontSize="lg" fontWeight="semibold" as="b">
                {profile.username}
              </Text>
              <Text fontSize="md">Email:</Text>
              <Text as="b" fontWeight="semibold">
                {profile.email}
              </Text>
              <Button
                colorScheme="blue"
                w="full"
                alignSelf="end"
                onClick={handleEditUser}
              >
                Edit
              </Button>
            </VStack>
          </Flex>
        </Box>
      </Container>
    </>
  );
};

export default UserProfile;
