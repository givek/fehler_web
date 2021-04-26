import React from 'react';
import { Formik, Form } from 'formik';
import { Link, Text, Stack } from '@chakra-ui/layout';
import { FormLabel } from '@chakra-ui/form-control';
import * as Yup from 'yup';
import { FormikControl } from './FormikControl';
import { ButtonPrimary } from './ButtonPrimary';
import { Link as RouterLink } from 'react-router-dom';

const styles = {
  input: {
    borderWidth: '1.6px',
    borderColor: '#000',
    focusBorderColor: '#70BAE7',
    size: 'sm',
  },
  text: {
    fontSize: '14px',
    mt: '24px',
    textAlign: 'center',
  },
  link: {
    color: '#70bae7',
  },
};

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email address.')
    .required('Email is a required field.'),
  password: Yup.string().required('Password is required field.'),
});

const onSubmit = async (data = {}, { setErrors }) => {
  console.log('Form Data', data);
  const url = 'http://127.0.0.1:8000/api/token';
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      console.log(await res.json());
    } else {
      const response = await res.json();
      setErrors({ password: response.errors['non_field_errors'] });
    }
  } catch (error) {
    alert(error);
  }
};

export const LoginForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormLabel as="legend" fontSize="22px" mb="28px">
          Login to continue
        </FormLabel>
        <Stack spacing={10}>
          <FormikControl
            control="input"
            name="email"
            label="Email"
            type="email"
            placeholder="jon@email.com"
            {...styles.input}
          />

          <FormikControl
            control="input"
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••••••"
            {...styles.input}
          />

          <ButtonPrimary name="Login" />
        </Stack>
        <Text {...styles.text}>
          <Link to="/login" as={RouterLink} {...styles.link}>
            Forgot password?
          </Link>
        </Text>
        <Text {...styles.text}>
          Don’t have a fehler account? &nbsp;
          <Link to="/register" as={RouterLink} {...styles.link}>
            Create one
          </Link>
        </Text>
      </Form>
    </Formik>
  );
};
