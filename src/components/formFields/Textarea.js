import React from 'react';
import { Textarea as ChakraTextarea } from '@chakra-ui/textarea';
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { Field } from 'formik';
import { FormHelperText } from '@chakra-ui/form-control';

export const Textarea = ({ name, label, helpText, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <ChakraTextarea id={name} {...rest} {...field} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          {helpText ? <FormHelperText>{helpText}</FormHelperText> : null}
        </FormControl>
      )}
    </Field>
  );
};
