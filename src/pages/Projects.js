import React from 'react';
import { Navbar } from '../components/Navbar';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Stack, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';

import { Link as RouterLink } from 'react-router-dom';

import { useAuth } from '../contexts/auth/authContext';
import useAuthFehlerApi from '../hooks/useAuthFehlerApi';
import { CreateProjectModal } from '../components/modals/CreateProjectModal';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import TasksTable from '../components/TasksTable';
import { CreateIssueModal } from '../components/modals/CreateIssueModal';

export const Projects = () => {
  const createProjectModalDisclosure = useDisclosure();
  const createIssueModalDisclosure = useDisclosure();
  const { userData } = useAuth();
  const user = userData.currentUser;

  const [projects, setProjects] = React.useState([]);

  const authFehlerApi = useAuthFehlerApi();

  const { spaceName } = useParams();
  // fetch user projects and set projects state with response.
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await authFehlerApi.get(`${spaceName}/projects`);

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

  // if (!projects) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box>
      <Navbar
        user={user}
        spaceName={spaceName}
        onOpen={createIssueModalDisclosure.onOpen}
      />
      <CreateIssueModal
        user={user}
        projects={projects}
        spaceName={spaceName}
        isOpen={createIssueModalDisclosure.isOpen}
        onOpen={createIssueModalDisclosure.onOpen}
        onClose={createIssueModalDisclosure.onClose}
      />
      <CreateProjectModal
        user={user}
        spaceName={spaceName}
        // pass setProjects function down to modal component, so it can update projects state.
        setProjects={setProjects}
        isOpen={createProjectModalDisclosure.isOpen}
        onOpen={createProjectModalDisclosure.onOpen}
        onClose={createProjectModalDisclosure.onClose}
      />
      <Box px="110px" py="48px">
        <Wrap>
          <WrapItem>
            <Stack direction="row" alignItems="center" spacing="4">
              <Avatar size="lg" name={spaceName} />
              <Text fontWeight="semibold">{spaceName}</Text>
            </Stack>
          </WrapItem>
        </Wrap>
        <Box py="48px">
          <Text fontSize="26px">Projects</Text>
        </Box>
        <Stack direction="row" spacing="12">
          {projects
            ? projects.map(project => (
                <Button
                  as={RouterLink}
                  to={`${project.name}/board`}
                  key={project.id}
                  bgColor="#fff"
                  w="136px"
                  h="104px"
                  boxShadow="md"
                  borderRadius="md"
                >
                  {project.name}
                </Button>
              ))
            : null}
          <Button
            bgColor="#fff"
            w="136px"
            h="104px"
            boxShadow="md"
            borderRadius="md"
            onClick={createProjectModalDisclosure.onOpen}
          >
            Add new
          </Button>
        </Stack>
        <Box my={16}>
          <Box py={8}>
            <Text fontSize="26px">Tasks</Text>
          </Box>
          <Box p={2} boxShadow="md" borderRadius="md">
            <TasksTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
