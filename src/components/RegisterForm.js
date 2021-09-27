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
  first_name: '',
  last_name: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email address.')
    .required('Email is a required field.'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must contain at least eight characters, at least one letter and one number.'
    )
    .required('Password is required field.'),
  first_name: Yup.string()
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers.')
    .required('First name is a required field.'),
  last_name: Yup.string()
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers.')
    .required('Last name is a required field.'),
});

// const onSubmit = async (data = {}, { setErrors }) => {
//   const url = 'http://127.0.0.1:8000/api/register';
//   try {
//     const res = await fetch(url, {
//       method: 'post',
//       headers: {
//         accept: 'application/json',
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     if (res.status === 201) {
//       console.log(res.status);
//     } else {
//       const response = await res.json();
//       response['errors'].foreach(({ name, type, message }) =>
//         setErrors(name, { type, message })
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

export const RegisterForm = () => {
  const { state } = useLocation();
  const { register } = useAuth();
  const histroy = useHistory();

  // register api does not return token.
  const onSubmit = async (data = {}, { setErrors }) => {
    console.log(data);
    const response = await register(data);
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
          Create your fehler account
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
          <Stack direction="row" spacing={4}>
            <FormikControl
              control="input"
              name="first_name"
              label="First name"
              type="text"
              placeholder="Jon"
              {...styles.input}
            />
            <FormikControl
              control="input"
              name="last_name"
              label="Last name"
              type="text"
              placeholder="Smith"
              {...styles.input}
            />
          </Stack>
          <ButtonPrimary name="Sign up" />
        </Stack>
        <Text fontSize="14px" mt="24px" textAlign="center">
          Already have an account? &nbsp;
          <Link color="#70bae7" as={RouterLink} to="/login">
            Login here
          </Link>
        </Text>
      </Form>
    </Formik>
  );
};
