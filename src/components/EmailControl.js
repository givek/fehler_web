import { FormErrorMessage } from '@chakra-ui/form-control';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import React from 'react';

export const EmailControl = React.forwardRef((props, register) => {
  return (
    <FormControl id="email" isInvalid={props.errors.email}>
      <FormLabel>Email</FormLabel>
      <Input
        name="email"
        ref={register}
        borderWidth="1.6px"
        borderColor="#000"
        focusBorderColor="#70BAE7"
        size="sm"
        placeholder="john@email.com"
        type="email"
      />
      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  );
});
