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
import RiskRegister from '../components/RiskRegister';

function Risks() {
  // const createProjectModalDisclosure = useDisclosure();
  const createIssueModalDisclosure = useDisclosure();
  const { userData } = useAuth();
  const user = userData.currentUser;

  const [projects, setProjects] = React.useState([]);

  const authFehlerApi = useAuthFehlerApi();

  const { projectName, spaceName } = useParams();
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
        spaceName={spaceName}
        projectName={projectName}
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

      <Box px="110px" py="48px">
        <Wrap>
          <WrapItem>
            <Stack direction="row" alignItems="center" spacing="4">
              <Avatar size="lg" bg="#E87D65" color="#fff" name={projectName} />
              <Text fontWeight="semibold">{projectName}</Text>
            </Stack>
          </WrapItem>
        </Wrap>

        <Box my={16}>
          <Box py={8}>
            <Text fontSize="26px">Risk Register</Text>
          </Box>
          <Box p={2} boxShadow="md" borderRadius="md">
            <RiskRegister />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Risks;
