import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
  Button,
  useColorMode,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import useSession from '../hooks/useSession';
import useProfile from '../hooks/useProfile';

const Header = () => {
  const { colorMode } = useColorMode();
  const session = useSession();
  const profile = useProfile();
  const [search, setSearch] = useState();

  const handleSearch = e => {
    e.preventDefault();
    if (search !== undefined) window.location.href = '/search?query=' + search;
  };

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        position="sticky"
        top="0"
        zIndex="1"
        p="5"
        borderBottom="1px solid #333"
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        bg={colorMode === 'dark' ? 'black' : 'white'}
      >
        <Link to="/">
          <Image src="/tokopedia.png" alt="Logo" w="50px" marginLeft="25px" />
        </Link>

        <InputGroup borderRadius={5} size="md" w="500px">
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.600" />}
          />
          <Input
            type="text"
            placeholder="Search..."
            border="1px solid #949494"
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
          <InputRightAddon p={0} border="none">
            <Button
              size="md"
              borderLeftRadius={0}
              borderRightRadius={5}
              border="1px solid #949494"
              textColor={colorMode === 'dark' ? 'white' : 'black'}
              onClick={handleSearch}
            >
              Search
            </Button>
          </InputRightAddon>
        </InputGroup>

        {profile && session.user ? (
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="blue"
              marginRight="25px"
              alignItems="center"
              display="flex"
              p="2"
            >
              <Avatar size="sm" name={session.user} src={profile.pict} />
              <span style={{ marginLeft: '8px' }}>{session.user}</span>
            </MenuButton>
            <MenuList>
              <Link to="/profile">
                <MenuItem>Profile</MenuItem>
              </Link>
              <Link to="/logout">
                <MenuItem>Logout</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        ) : (
          <Link to="/login">
            <Button colorScheme="blue" marginRight="25px">
              Login
            </Button>
          </Link>
        )}
      </Flex>
    </>
  );
};

export default Header;
