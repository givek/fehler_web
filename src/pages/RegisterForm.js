import React from 'react';
import { FormLabel } from '@chakra-ui/form-control';
import { Box, Center, Stack, Heading, Link, Text } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { EmailControl } from '../components/EmailControl';
import { FirstNameControl } from '../components/FirstNameControl';
import { LastNameControl } from '../components/LastNameControl';
import { PasswordControl } from '../components/PasswordControl';
import { Link as RouterLink } from 'react-router-dom';

export const RegisterForm = () => {
  const { handleSubmit, register, formState, errors } = useForm();

  // function onSubmit(values) {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       console.log(JSON.stringify(values));
  //       resolve();
  //     }, 3000);
  //   });
  // }
  // function onSubmit(values) {
  //   const rawResponse = fetch('http://127.0.0.1:8000/api/register/', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(values),
  //   });
  //   const content = rawResponse.json();
  //   console.log(content);
  // }
  async function onSubmit(data = {}) {
    const url = 'http://127.0.0.1:8000/api/register';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);
  }

  return (
    <Center h={[null, '100vh']}>
      <Stack
        w={['100%', '416px']}
        spacing={6}
        px={['24px', '0px']}
        py={['24px', '0px']}
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
            <FormLabel as="legend" fontSize="22px" mb="28px">
              Create your fehler account
            </FormLabel>
            <Stack spacing={10}>
              <EmailControl errors={errors} ref={register} />
              <PasswordControl errors={errors} ref={register} />
              <Stack direction="row" spacing={4}>
                <FirstNameControl errors={errors} ref={register} />
                <LastNameControl errors={errors} ref={register} />
              </Stack>
              <ButtonPrimary name="Sign up" />
            </Stack>
            <Text fontSize="14px" mt="24px" textAlign="center">
              Already have an account? &nbsp;
              <Link color="#70bae7" as={RouterLink} to="/login">
                Login here
              </Link>
            </Text>
          </form>
        </Box>
      </Stack>
    </Center>
  );
};
