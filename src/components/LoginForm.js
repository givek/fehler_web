import React from 'react';
import { Formik, Form } from 'formik';
import { Link, Text, Stack } from '@chakra-ui/layout';
import { FormLabel } from '@chakra-ui/form-control';
import * as Yup from 'yup';
import { FormikControl } from './FormikControl';
import { ButtonPrimary } from './ButtonPrimary';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth/AuthContext';

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

// Instead of checking for token to validate ProtectedRoutes
// check for userData present in global state. (as the token will have to be valid to fetch user data)

export const LoginForm = () => {
  const { state } = useLocation();
  const { login } = useAuth();
  const histroy = useHistory();

  const onSubmit = async (data = {}, { setErrors }) => {
    const response = await login(data);
    if (response.ok) {
      console.log(response.successMessage);
      histroy.push(state?.from || '/spaces');
    } else {
      setErrors(response.errors);
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
