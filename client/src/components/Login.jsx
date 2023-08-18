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
  Image,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const login = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
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

  const handleLogin = e => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Incomplete Input',
        description: 'Please fill in both email and password.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } else {
      login(e);
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
      >
        <VStack spacing={4} align="flex-start" w="full">
          <VStack spacing={1} align={['flex-start', 'center']} w="full">
            <Image src="/tokopedia.png" w="100px" />
            <Heading>Login</Heading>
          </VStack>

          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              rounded="none"
              variant="filled"
              type="email"
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

          <HStack w="full" justify="start">
            <Text>
              Dont Have Account?
              <Link to="/register">
                <Text as="b"> Register</Text>
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
              onClick={handleLogin}
            >
              Register
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}

export default Login;
