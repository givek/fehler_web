// import { Box, Center, SimpleGrid } from '@chakra-ui/react';
// import React from 'react';

// function RiskMatrix() {
//   return (
//     <Box p={20}>
//       <SimpleGrid maxW="416px" spacing={1} columns={5}>
//         <Box bg="yellow" h="80px" w="80px"></Box>
//         <Box bg="orange" h="80px" w="80px"></Box>
//         <Box bg="red" h="80px" w="80px"></Box>
//         <Box bg="red" h="80px" w="80px"></Box>
//         <Box bg="red" h="80px" w="80px"></Box>
//         <Box bg="yellow" h="80px" w="80px"></Box>
//         <Box bg="orange" h="80px" w="80px"></Box>
//         <Box bg="orange" h="80px" w="80px"></Box>
//         <Box bg="red" h="80px" w="80px"></Box>
//         <Box bg="red" h="80px" w="80px"></Box>
//         <Box bg="green" h="80px" w="80px"></Box>
//         <Box bg="yellow" h="80px" w="80px"></Box>
//         <Box bg="orange" h="80px" w="80px"></Box>
//         <Box bg="orange" h="80px" w="80px"></Box>
//         <Box bg="red" h="80px" w="80px"></Box>
//         <Box bg="green" h="80px" w="80px"></Box>
//         <Box bg="yellow" h="80px" w="80px"></Box>
//         <Box bg="yellow" h="80px" w="80px"></Box>
//         <Box bg="orange" h="80px" w="80px"></Box>
//         <Box bg="orange" h="80px" w="80px"></Box>
//         <Box bg="green" h="80px" w="80px"></Box>
//         <Box bg="green" h="80px" w="80px"></Box>
//         <Box bg="green" h="80px" w="80px"></Box>
//         <Box bg="yellow" h="80px" w="80px"></Box>
//         <Box bg="yellow" h="80px" w="80px"></Box>
//       </SimpleGrid>
//     </Box>
//   );
// }

// export default RiskMatrix;

import { Box, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CreateIssueModal } from '../components/modals/CreateIssueModal';
import { Navbar } from '../components/Navbar';
import RiskMatrixGrid from '../components/RiskMatrixGrid';
import { useAuth } from '../contexts/auth/authContext';

function fetchProject(spaceName, projectName, token) {
  return axios.get(
    `http://127.0.0.1:8000/api/${spaceName}/${projectName}/info/`,
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
}

function RiskMatrix() {
  const params = useParams();

  const createIssueModalDisclosure = useDisclosure();
  const { userData } = useAuth();
  const user = userData.currentUser;

  const token = window.localStorage.getItem('userToken');

  const project = useQuery([params.spaceName, params.projectName, 'info'], () =>
    fetchProject(params.spaceName, params.projectName, token)
  );

  if (project.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Navbar
        spaceName={params.spaceName}
        projectName={params.projectName}
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

      <Box
        h="80vh"
        w="92%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <RiskMatrixGrid />
      </Box>
    </Box>
  );
}

export default RiskMatrix;
