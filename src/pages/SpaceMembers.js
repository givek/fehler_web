import React from 'react';
import {
  Avatar,
  Box,
  Stack,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import People from '../components/People';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/auth/authContext';
import useAuthFehlerApi from '../hooks/useAuthFehlerApi';
import { CreateIssueModal } from '../components/modals/CreateIssueModal';
import { SendInviteModal } from '../components/modals/SendInviteModal';

function fetchSpaceMembers(spaceName, token) {
  return axios.get(`http://127.0.0.1:8000/api/${spaceName}/space-members/`, {
    headers: { Authorization: `Token ${token}` },
  });
}
function SpaceMembers() {
  const params = useParams();
  const createIssueModalDisclosure = useDisclosure();
  const sendInviteModalDisclosure = useDisclosure();

  const [projects, setProjects] = React.useState([]);

  const { userData } = useAuth();
  const user = userData.currentUser;

  const authFehlerApi = useAuthFehlerApi();

  const userToken = localStorage.getItem('userToken');
  const spaceMembersQuery = useQuery(['space-members', params.spaceName], () =>
    fetchSpaceMembers(params.spaceName, userToken)
  );

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await authFehlerApi.get(
          `${params.spaceName}/projects`
        );

        console.log(response);

        if (response) {
          console.log(response.data);
          setProjects(response.data);
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
    fetchProjects();
  }, [authFehlerApi]);

  if (!spaceMembersQuery.data) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Navbar
        spaceName={params.spaceName}
        user={user}
        onOpen={createIssueModalDisclosure.onOpen}
      />
      <CreateIssueModal
        user={user}
        projects={projects}
        spaceName={params.spaceName}
        isOpen={createIssueModalDisclosure.isOpen}
        onOpen={createIssueModalDisclosure.onOpen}
        onClose={createIssueModalDisclosure.onClose}
      />

      <SendInviteModal
        spaceName={params.spaceName}
        isOpen={sendInviteModalDisclosure.isOpen}
        onOpen={sendInviteModalDisclosure.onOpen}
        onClose={sendInviteModalDisclosure.onClose}
      />

      <Box px="110px" py="48px">
        <Wrap>
          <WrapItem>
            <Stack direction="row" alignItems="center" spacing="4">
              <Avatar
                size="lg"
                bg="#E87D65"
                color="#fff"
                name={params.spaceName}
              />
              <Text fontWeight="semibold">{params.spaceName}</Text>
            </Stack>
          </WrapItem>
        </Wrap>
        <People
          onOpen={sendInviteModalDisclosure.onOpen}
          title="Space Members"
          people={spaceMembersQuery?.data?.data}
        />
      </Box>
    </Box>
  );
}

export default SpaceMembers;
