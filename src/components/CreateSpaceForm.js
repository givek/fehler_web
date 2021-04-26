import React from 'react';
import { FormLabel } from '@chakra-ui/form-control';
import { Stack } from '@chakra-ui/layout';
import { ButtonPrimary } from './ButtonPrimary';
import { Form, Formik } from 'formik';
import { FormikControl } from './FormikControl';

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
export const CreateSpaceForm = () => {
  return (
    <Formik>
      <Form>
        <FormLabel as="legend" fontSize="22px" mb="28px">
          Select your space name
        </FormLabel>
        <Stack spacing={10}>
          <FormikControl
            control="input"
            name="name"
            label="Space name"
            type="text"
            placeholder="Fehler"
            helpText="Choose something familiar like your team or company name."
            {...styles.input}
          />
          <ButtonPrimary name="Continue" />
        </Stack>
      </Form>
    </Formik>
  );
};
