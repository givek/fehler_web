import React from 'react';
import { Avatar, Box, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import People from '../components/People';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function fetchSpaceMembers(spaceName, token) {
  return axios.get(`http://127.0.0.1:8000/api/${spaceName}/space-members/`, {
    headers: { Authorization: `Token ${token}` },
  });
}
function SpaceMembers() {
  const params = useParams();

  const userToken = localStorage.getItem('userToken');
  const spaceMembersQuery = useQuery(['space-members', params.spaceName], () =>
    fetchSpaceMembers(params.spaceName, userToken)
  );

  if (!spaceMembersQuery.data) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Navbar
      // spaceName={spaceName}
      // onOpen={createIssueModalDisclosure.onOpen}
      />
      {/* <CreateIssueModal
        user={user}
        projects={projects}
        spaceName={spaceName}
        isOpen={createIssueModalDisclosure.isOpen}
        onOpen={createIssueModalDisclosure.onOpen}
        onClose={createIssueModalDisclosure.onClose}
      /> */}

      <Box px="110px" py="48px">
        <Wrap>
          <WrapItem>
            <Stack direction="row" alignItems="center" spacing="4">
              {/* <Avatar size="lg" bg="#E87D65" color="#fff" name={spaceName} /> */}
              <Avatar size="lg" bg="#E87D65" color="#fff" name="Tuna" />
              {/* <Text fontWeight="semibold">{spaceName}</Text> */}
              <Text fontWeight="semibold">Tuna</Text>
            </Stack>
          </WrapItem>
        </Wrap>

        <People title="Space Members" people={spaceMembersQuery?.data?.data} />
      </Box>
    </Box>
  );
}

export default SpaceMembers;
