import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Center,
} from '@chakra-ui/react';

function RegisterSuccess() {
  return (
    <Center h="60vh">
      <Alert
        boxShadow={[null, 'lg']}
        rounded="lg"
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        width="50%"
      >
        <AlertIcon boxSize="40px" m={4} mb={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Registration Successfull!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Congratulations, your account has been successfully created.
        </AlertDescription>
        <Button as={RouterLink} to="/login" colorScheme="green" m={4}>
          Login
        </Button>
      </Alert>
    </Center>
  );
}
export default RegisterSuccess;
