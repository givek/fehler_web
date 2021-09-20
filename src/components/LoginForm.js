import React from 'react';
import { Formik, Form } from 'formik';
import { Link, Text, Stack } from '@chakra-ui/layout';
import { FormLabel } from '@chakra-ui/form-control';
import * as Yup from 'yup';
import { FormikControl } from './FormikControl';
import { ButtonPrimary } from './ButtonPrimary';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';

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

export const LoginForm = () => {
  const { state } = useLocation();
  const histroy = useHistory();

  const onSubmit = async (data = {}, { setErrors }) => {
    const url = 'http://127.0.0.1:8000/api/token';

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const res = await response.json();
        window.localStorage.setItem('accessToken', res);
        histroy.push(state?.from || '/spaces');
      } else {
        const res = await response.json();
        setErrors({ password: res.errors['non_field_errors'] });
      }
    } catch (error) {
      alert(error);
    }
  };

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
