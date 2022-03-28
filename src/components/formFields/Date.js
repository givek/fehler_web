import React from 'react';
import { Input as ChakraInput } from '@chakra-ui/input';
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { Field } from 'formik';
import { FormHelperText } from '@chakra-ui/form-control';

export const Date = ({ name, label, helpText, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <ChakraInput type="date" id={name} {...rest} {...field} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          {helpText ? <FormHelperText>{helpText}</FormHelperText> : null}
        </FormControl>
      )}
    </Field>
  );
};
