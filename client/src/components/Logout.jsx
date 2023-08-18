import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';
import useLogout from '../hooks/useLogout';

const Logout = () => {
  const loading = useLogout();

  if (loading) {
    return (
      <>
        <Center h="100vh">
          <Spinner emptyColor="gray.100" />
        </Center>
      </>
    );
  }

  return null;
};

export default Logout;
