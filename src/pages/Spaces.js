import React from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Box, Heading, Stack, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/hooks';
import { Link as RouterLink } from 'react-router-dom';

import { CreateSpaceModal } from '../components/modals/CreateSpaceModal';
import { useAuth } from '../contexts/auth/authContext';
import useAuthFehlerApi from '../hooks/useAuthFehlerApi';

export const Spaces = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = useAuth();
  const user = userData.currentUser;
  const [spaces, setSpaces] = React.useState([]);

  const authFehlerApi = useAuthFehlerApi();

  // fetch user spaces and set spaces state with response.
  React.useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await authFehlerApi.get(`spaces`);

        console.log(response);

        if (response) {
          setSpaces(response.data);
        }
      } catch (error) {
        // TODO: handle errors
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.data.name);
        }
        alert(error);
      }
    };
    fetchSpaces();
  }, [authFehlerApi]);

  return (
    <Box px="56px" py="48px">
      {JSON.stringify(user)}
      {JSON.stringify(spaces)}
      <CreateSpaceModal
        user={user}
        // pass setSpaces function down to modal component, so it can update spaces state.
        setSpaces={setSpaces}
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
                <Button
                  as={RouterLink}
                  to={`/${space.name}/projects`}
                  key={space.id}
                  bgColor="#fff"
                  w="136px"
                  h="104px"
                  boxShadow="md"
                  borderRadius="md"
                >
                  {space.name}
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
      <pre>{JSON.stringify(userData)}</pre>
    </Box>
  );
};
