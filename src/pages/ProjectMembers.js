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
import { CreateIssueModal } from '../components/modals/CreateIssueModal';
import AddProjectMemberModal from '../components/modals/AddProjectMemberModal';

function fetchProjectMembers(spaceName, projectName, token) {
  return axios.get(
    `http://127.0.0.1:8000/api/spaces/${spaceName}/projects/${projectName}/members/`,
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
}

function fetchSpaceMembers(spaceName, token) {
  return axios.get(`http://127.0.0.1:8000/api/spaces/${spaceName}/members/`, {
    headers: { Authorization: `Token ${token}` },
  });
}

function fetchProject(spaceName, projectName, token) {
  return axios.get(
    `http://127.0.0.1:8000/api/spaces/${spaceName}/projects/${projectName}/`,
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
}

function ProjectMembers() {
  const params = useParams();
  const createIssueModalDisclosure = useDisclosure();
  const sendInviteModalDisclosure = useDisclosure();

  const { userData } = useAuth();
  const user = userData.currentUser;

  const userToken = localStorage.getItem('userToken');
  const projectMembersQuery = useQuery(
    ['project-members', params.spaceName, params.projectName],
    () => fetchProjectMembers(params.spaceName, params.projectName, userToken)
  );

  const project = useQuery([params.spaceName, params.projectName, 'info'], () =>
    fetchProject(params.spaceName, params.projectName, userToken)
  );

  const spaceMembersQuery = useQuery(['space-members', params.spaceName], () =>
    fetchSpaceMembers(params.spaceName, userToken)
  );

  if (
    project.isLoading ||
    projectMembersQuery.isLoading ||
    spaceMembersQuery.isLoading
  ) {
    return <div>Loading...</div>;
  }

  const spaceMembersExcludeProjectMembers =
    spaceMembersQuery?.data?.data.filter(
      spaceMember =>
        !projectMembersQuery?.data?.data.find(
          projectMember => projectMember.id === spaceMember.id
        )
    );

  console.log(spaceMembersExcludeProjectMembers);

  return (
    <Box>
      <Navbar
        spaceName={params.spaceName}
        projectName={params.projectName}
        user={user}
        onOpen={createIssueModalDisclosure.onOpen}
      />

      <CreateIssueModal
        user={user}
        projects={[project.data.data]}
        spaceName={params.spaceName}
        isOpen={createIssueModalDisclosure.isOpen}
        onOpen={createIssueModalDisclosure.onOpen}
        onClose={createIssueModalDisclosure.onClose}
      />

      <AddProjectMemberModal
        spaceName={params.spaceName}
        projectName={params.projectName}
        spaceMembers={spaceMembersExcludeProjectMembers}
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
          title="Project Members"
          people={projectMembersQuery?.data?.data}
        />
      </Box>
    </Box>
  );
}

export default ProjectMembers;
