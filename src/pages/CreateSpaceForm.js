import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Box, Center, Stack, Heading } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { Input } from '@chakra-ui/input';

export const CreateSpaceForm = () => {
  const { handleSubmit, register, formState, errors } = useForm();

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
              Select your space name
            </FormLabel>
            <Stack spacing={10}>
              <FormControl id="name" isInvalid={errors.name}>
                <FormLabel>Space name</FormLabel>
                <Input
                  name="name"
                  ref={register}
                  borderWidth="1.6px"
                  borderColor="#000"
                  focusBorderColor="#70BAE7"
                  size="sm"
                  placeholder="Fehler"
                  type="text"
                />
                <FormErrorMessage></FormErrorMessage>
                <FormHelperText>
                  Choose something familiar like your team or company name.
                </FormHelperText>
              </FormControl>
              <ButtonPrimary name="Continue" />
            </Stack>
          </form>
        </Box>
      </Stack>
    </Center>
  );
};
