import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Link } from '@chakra-ui/layout';
import { Box, Heading, Stack, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { CreateSpaceModal } from '../components/modals/CreateSpaceModal';
import { useAuth } from '../contexts/auth/authContext';

export const Spaces = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = React.useState(null);
  const [spaces, setSpaces] = React.useState(null);

  const { userData } = useAuth();
  React.useEffect(() => {
    const getUserData = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: userData.userToken }),
      };

      // configure base url.
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user-details`,
          requestOptions
        );

        if (response.ok) {
          const res = await response.json();
          setUser(res.user);
        } else {
          const res = await response.json();
          console.error(res);
        }
      } catch (error) {
        alert(error);
      }
    };
    getUserData();
  }, [userData]);

  React.useEffect(() => {
    const getUserSpaces = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/spaces/${user.id}`
        );

        if (response.ok) {
          const res = await response.json();
          console.log(res);
          setSpaces(res);
        } else {
          const res = await response.json();
          console.error(res);
        }
      } catch (error) {
        alert(error);
      }
    };
    if (user) {
      getUserSpaces();
    }
  }, [user]);
  return (
    <Box px="56px" py="48px">
      {JSON.stringify(user)}
      {JSON.stringify(spaces)}
      <CreateSpaceModal
        user={user}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <Heading fontSize={['28px', '32px']} fontWeight="bold" color="#70bae7">
        Fehler
      </Heading>
      <Box px="110px" py="48px">
        <Wrap>
          <WrapItem>
            <Stack direction="row" alignItems="center" spacing="4">
              <Avatar
                size="lg"
                bg="#E87D65"
                name={user ? `${user.first_name} ${user.last_name}` : null}
              />
              <Text fontWeight="semibold">
                {user ? `${user.first_name} ${user.last_name}` : null}
              </Text>
            </Stack>
          </WrapItem>
        </Wrap>
        <Box py="48px">
          <Text fontSize="26px">Spaces you work in</Text>
        </Box>
        <Stack direction="row" spacing="12">
          {spaces
            ? spaces.map(space => (
                <Button as={RouterLink} to="/projects"
                  key={space.id}
                  bgColor="#fff" w="136px" h="104px" boxShadow="md"
                  borderRadius="md" >{space.name}
                </Button>
              ))
            : null}
          <Button
            bgColor="#fff"
            w="136px"
            h="104px"
            boxShadow="md"
            borderRadius="md"
            onClick={onOpen}
          >
            Add new
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
