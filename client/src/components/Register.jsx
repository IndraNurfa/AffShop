import {
  Box,
  Heading,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  useToast,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const toast = useToast();

  const register = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        window.location.href = '/';
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

  const handleRegister = e => {
    e.preventDefault();

    if (!username || !email || !password || !passwordConfirm) {
      toast({
        title: 'Incomplete Input',
        description: 'Please fill the input field.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } else if (password !== passwordConfirm) {
      toast({
        title: 'Wrong Input',
        description: 'Please fill password same with confirm password.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } else {
      register(e);
    }
  };

  return (
    <>
      <Box
        w={['full', 'md']}
        p={[8, 10]}
        mt={[20, '10vh']}
        mx="auto"
        border={['none', '1px']}
        borderColor={['', 'gray.300']}
        borderRadius={10}
        boxShadow="lg"
      >
        <VStack spacing={4} align="flex-start" w="full">
          <VStack spacing={1} align={['flex-start', 'center']} w="full">
            <Image src="/tokopedia.png" w="100px" />
            <Heading>Register</Heading>
          </VStack>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              type="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              type="password"
              onChange={e => {
                setPasswordConfirm(e.target.value);
              }}
            />
          </FormControl>

          <HStack w="full" justify="start">
            <Text>
              Already Have Account?
              <Link to="/login">
                <Text as="b"> Login</Text>
              </Link>
            </Text>
          </HStack>

          <HStack w="full" justify="space-around">
            <Link to="/">
              <Button colorScheme="yellow" w={['full', 'auto']}>
                Cancel
              </Button>
            </Link>
            <Button
              colorScheme="blue"
              w={['full', 'auto']}
              onClick={handleRegister}
            >
              Register
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}
