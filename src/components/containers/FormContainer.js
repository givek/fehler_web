import React from 'react';
import { Box, Center, Stack, Heading } from '@chakra-ui/layout';

export const FormContainer = props => {
  return (
    <Center h={[null, '100vh']}>
      <Stack w={['100%', '416px']} spacing={6} p={['24px', '0px']}>
        <Heading fontSize={['28px', '32px']} fontWeight="bold" color="#70bae7">
          Fehler
        </Heading>
        <Box
          w="100%"
          boxShadow={[null, 'lg']}
          rounded="lg"
          px={[null, '40px']}
          py={[null, '32px']}
        >
          {props.children}
        </Box>
      </Stack>
    </Center>
  );
};
