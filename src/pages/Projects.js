import React from 'react';
import { Navbar } from '../components/Navbar';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Stack, Text, Wrap, WrapItem } from '@chakra-ui/layout';

export const Projects = () => {
  return (
    <Box>
      <Navbar />
      <Box px="110px" py="48px">
        <Wrap>
          <WrapItem>
            <Stack direction="row" alignItems="center" spacing="4">
              <Avatar size="lg" bg="#E87D65" color="#fff" name="Tuna" />
              <Text fontWeight="semibold">Tuna</Text>
            </Stack>
          </WrapItem>
        </Wrap>
        <Box py="48px">
          <Text fontSize="26px">Projects</Text>
        </Box>
        <Stack direction="row" spacing="12">
          <Box w="136px" h="104px" boxShadow="md" borderRadius="md">
            Tuna Project
          </Box>
          <Box w="136px" h="104px" boxShadow="md" borderRadius="md">
            Shibe Project
          </Box>
          <Box w="136px" h="104px" boxShadow="md" borderRadius="md">
            Add new
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
