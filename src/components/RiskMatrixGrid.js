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

import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from '@chakra-ui/react';
const riskMatrixColors = {
  'VL-VL': 'green.400',
  'VL-L': 'green.400',
  'VL-M': 'green.400',
  'VL-H': 'green.400',
  'VL-VH': 'yellow.300',

  'L-VL': 'green.400',
  'L-L': 'green.400',
  'L-M': 'yellow.300',
  'L-H': 'yellow.300',
  'L-VH': 'orange.300',

  'M-VL': 'green.400',
  'M-L': 'yellow.300',
  'M-M': 'yellow.300',
  'M-H': 'orange.300',
  'M-VH': 'orange.300',

  'H-VL': 'yellow.300',
  'H-L': 'orange.300',
  'H-M': 'orange.300',
  'H-H': 'red.500',
  'H-VH': 'red.500',

  'VH-VL': 'orange.300',
  'VH-L': 'red.500',
  'VH-M': 'red.500',
  'VH-H': 'red.500',
  'VH-VH': 'red.500',
};

const impact = ['VL', 'L', 'M', 'H', 'VH'];
const probability = ['VL', 'L', 'M', 'H', 'VH'];

function fetchRisks(token, spaceName, projectName) {
  return axios.get(
    `http://127.0.0.1:8000/api/spaces/${spaceName}/projects/${projectName}/risks/`,
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
}

function RiskMatrixGrid() {
  const params = useParams();

  const userToken = localStorage.getItem('userToken');
  const query = useQuery(
    ['risks', userToken, params.spaceName, params.projectName],
    () => fetchRisks(userToken, params.spaceName, params.projectName)
  );

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  const risks = query.data?.data;

  const board = [];

  for (let i = probability.length - 1; i >= 0; i--) {
    for (let j = 0; j < impact.length; j++) {
      board.push(
        <Box
          key={`${j}-${i}`}
          w="100px"
          h="100px"
          bgColor={riskMatrixColors[`${impact[j]}-${probability[i]}`]}
        >
          {/* {`${impact[j]} - ${probability[i]}`} */}

          {risks.map(risk => {
            if (
              risk.impact === impact[j] &&
              risk.probability === probability[i]
            ) {
              return (
                <Popover key={risk.id}>
                  <PopoverTrigger>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontSize="10px"
                      borderRadius="50%"
                      bgColor="white"
                      w="18px"
                      h="18px"
                      m={1}
                    >
                      {risk.id}
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>{`${risk.id} : ${risk.name}`}</PopoverHeader>
                    <PopoverBody>
                      <Stack spacing={2}>
                        <Box>
                          <Text fontSize="sm" fontWeight="medium">
                            Description
                          </Text>
                          {risk.description}
                        </Box>
                        <Box>
                          <Text fontSize="sm" fontWeight="medium">
                            Mitigation Action
                          </Text>
                          {risk.mitigation_action}
                        </Box>
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              );
            }
          })}
        </Box>
      );
    }
  }

  return (
    <Box>
      <SimpleGrid ml="120px" maxW="520px" columns={1} spacing={1}>
        <Box textAlign="center" w="500px" height="72px">
          <Text fontSize="x-large">Impact</Text>
        </Box>
      </SimpleGrid>
      <Box display="flex">
        <SimpleGrid maxW="520px" columns={1} spacing={1} mr={1} mt="55px">
          <Box
            textAlign="center"
            w="80px"
            height="100px"
            transform="rotate(-180deg)"
            sx={{
              writingMode: 'tb-rl',
            }}
            minH="500px"
          >
            <Text fontSize="x-large">Probability</Text>
          </Box>
        </SimpleGrid>
        <SimpleGrid maxW="520px" columns={1} spacing={1} mr={1} mt="55px">
          <Box
            textAlign="center"
            w="40px"
            height="100px"
            transform="rotate(-180deg)"
            sx={{
              writingMode: 'tb-rl',
            }}
          >
            Very High
          </Box>
          <Box
            textAlign="center"
            height="100px"
            transform="rotate(-180deg)"
            sx={{
              writingMode: 'tb-rl',
            }}
          >
            High
          </Box>
          <Box
            textAlign="center"
            height="100px"
            transform="rotate(-180deg)"
            sx={{
              writingMode: 'tb-rl',
            }}
          >
            Medium
          </Box>
          <Box
            textAlign="center"
            height="100px"
            transform="rotate(-180deg)"
            sx={{
              writingMode: 'tb-rl',
            }}
          >
            Low
          </Box>
          <Box
            textAlign="center"
            height="100px"
            transform="rotate(-180deg)"
            sx={{
              writingMode: 'tb-rl',
            }}
          >
            Very Low
          </Box>
        </SimpleGrid>
        <SimpleGrid maxW="520px" columns={5} spacing={1}>
          <Box textAlign="center" height="40px">
            Very Low
          </Box>
          <Box textAlign="center" height="40px">
            Low
          </Box>
          <Box textAlign="center" height="40px">
            Medium
          </Box>
          <Box textAlign="center" height="40px">
            High
          </Box>
          <Box textAlign="center" height="40px">
            Very High
          </Box>

          {board}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default RiskMatrixGrid;
