import React from 'react';
import { FormLabel } from '@chakra-ui/form-control';
import { Box, Center, Link, Text, Stack, Heading } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { EmailControl } from '../components/EmailControl';
import { PasswordControl } from '../components/PasswordControl';

export const LoginForm = () => {
  const { handleSubmit, register, formState, errors } = useForm();

  const onSubmit = async (data = {}) => {
    const url = 'http://127.0.0.1:8000/api/token';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const token = await response.json();
    console.log(token);
    return response;
  };

  return (
    <Center h={[null, '100vh']}>
      <Stack
        w={['100%', '416px']}
        spacing={6}
        px={['24px', '0px']}
        py={['24px', '0px']}
        spacing="28px"
      >
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel textAlign="center" as="legend" fontSize="22px" mb="28px">
              Login
            </FormLabel>
            <Stack spacing={10}>
              <EmailControl errors={errors} ref={register} />
              <PasswordControl errors={errors} ref={register} />
              <ButtonPrimary name="Login" />
            </Stack>
            <Text fontSize="14px" mt="24px" textAlign="center">
              <Link color="#70bae7" as={RouterLink} to="/login">
                Forgot password?
              </Link>
            </Text>
            <Text fontSize="14px" mt="24px" textAlign="center">
              Don’t have a fehler account? &nbsp;
              <Link color="#70bae7" as={RouterLink} to="/register">
                Create one
              </Link>
            </Text>
          </form>
        </Box>
      </Stack>
    </Center>
  );
};
