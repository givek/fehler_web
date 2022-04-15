import React from 'react';
import { Navbar } from '../components/Navbar';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Stack, Text, Wrap, WrapItem, HStack } from '@chakra-ui/layout';
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
import CreateRiskModal from '../components/modals/CreateRiskModal';
import axios from 'axios';
import { useQuery } from 'react-query';
import RiskDetailsModal from '../components/modals/RiskDetailsModal';

function fetchProject(spaceName, projectName, token) {
  return axios.get(
    `http://127.0.0.1:8000/api/${spaceName}/${projectName}/info/`,
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
}

function fetchRisks(token, spaceName, projectName) {
  return axios.get(
    `http://127.0.0.1:8000/api/${spaceName}}/${projectName}/risks/`,
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
}

function Risks() {
  const params = useParams();

  const userToken = localStorage.getItem('userToken');
  const query = useQuery(
    ['risks', userToken, params.spaceName, params.projectName],
    () => fetchRisks(userToken, params.spaceName, params.projectName)
  );

  // const tasks = query.data?.data.filter(task => column.tasks.includes(task.id));

  // const createProjectModalDisclosure = useDisclosure();

  const riskDetailsModalDisclosure = useDisclosure();
  const [clickedRisk, setClickedRisk] = React.useState(null);

  const createIssueModalDisclosure = useDisclosure();
  const createRiskModalDisclosure = useDisclosure();
  const { userData } = useAuth();
  const user = userData.currentUser;

  // const [projects, setProjects] = React.useState([]);

  // const authFehlerApi = useAuthFehlerApi();

  const { projectName, spaceName } = useParams();

  const token = window.localStorage.getItem('userToken');

  const project = useQuery([params.spaceName, params.projectName, 'info'], () =>
    fetchProject(params.spaceName, params.projectName, token)
  );

  if (project.isLoading || query.isLoading) {
    return <div>Loading...</div>;
  }

  const risks = query.data?.data;

  console.log(risks);

  console.log('project infor', project.data.data);

  return (
    <Box>
      <Navbar
        spaceName={spaceName}
        projectName={projectName}
        onOpen={createIssueModalDisclosure.onOpen}
      />
      <CreateIssueModal
        user={user}
        projects={[project.data.data]}
        spaceName={spaceName}
        isOpen={createIssueModalDisclosure.isOpen}
        onOpen={createIssueModalDisclosure.onOpen}
        onClose={createIssueModalDisclosure.onClose}
      />

      <CreateRiskModal
        user={user}
        spaceName={spaceName}
        projectName={projectName}
        projects={[project.data.data]}
        isOpen={createRiskModalDisclosure.isOpen}
        onOpen={createRiskModalDisclosure.onOpen}
        onClose={createRiskModalDisclosure.onClose}
      />

      <RiskDetailsModal
        risk={clickedRisk}
        user={user}
        spaceName={spaceName}
        projectName={projectName}
        projects={[project.data.data]}
        isOpen={riskDetailsModalDisclosure.isOpen}
        onOpen={riskDetailsModalDisclosure.onOpen}
        onClose={riskDetailsModalDisclosure.onClose}
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

        <Box my={8}>
          <Box py={8}>
            <HStack spacing={6}>
              <Text fontSize="26px">Risk Register</Text>
              <Button
                onClick={createRiskModalDisclosure.onOpen}
                size="sm"
                bgColor="tomato"
                color="white"
              >
                Add Risk
              </Button>
            </HStack>
          </Box>
          <Box p={2} boxShadow="md" borderRadius="md">
            <RiskRegister
              risks={risks}
              setClickedTask={setClickedRisk}
              onOpen={riskDetailsModalDisclosure.onOpen}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Risks;
