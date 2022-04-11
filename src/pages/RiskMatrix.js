import { Box, Center, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

function RiskMatrix() {
  return (
    <Box maxW="500px" p={20}>
      <SimpleGrid columns={3} spacing={4}>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
      </SimpleGrid>
    </Box>
  );
}

export default RiskMatrix;
