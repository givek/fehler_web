import { FormErrorMessage } from '@chakra-ui/form-control';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import React from 'react';

export const FirstNameControl = React.forwardRef((props, register) => {
  return (
    <FormControl id="first_name" isInvalid={props.errors.first_name}>
      <FormLabel>First name</FormLabel>
      <Input
        name="first_name"
        ref={register}
        borderWidth="1.6px"
        borderColor="#000"
        focusBorderColor="#70BAE7"
        size="sm"
        placeholder="Jon"
        type="text"
      />
      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  );
});
