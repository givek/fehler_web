import React from 'react';
import { Select as ChakraSelect } from '@chakra-ui/select';
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { Field } from 'formik';
import { FormHelperText } from '@chakra-ui/form-control';

export const Select = ({ name, label, options, helpText, ...rest }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <ChakraSelect id={name} {...field} {...rest}>
            <option key={1}>Please select an option</option>
            {options.map((option, index) => (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            ))}
          </ChakraSelect>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          {helpText ? <FormHelperText>{helpText}</FormHelperText> : null}
        </FormControl>
      )}
    </Field>
  );
};
