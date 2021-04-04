import { Box, Center, Link, Stack } from '@chakra-ui/layout';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Home = () => {
  return (
    <Center height="50vh">
      <Stack spacing="50%" direction="row">
        <Box>
          <Link as={RouterLink} to="/register">
            Register
          </Link>
        </Box>
        <Box>
          <Link as={RouterLink} to="/login">
            Login
          </Link>
        </Box>
      </Stack>
    </Center>
  );
};
