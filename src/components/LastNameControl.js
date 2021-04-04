import { FormErrorMessage } from '@chakra-ui/form-control';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import React from 'react';

export const LastNameControl = React.forwardRef((props, register) => {
  return (
    <FormControl id="last_name" isInvalid={props.errors.last_name}>
      <FormLabel>Last name</FormLabel>
      <Input
        name="last_name"
        ref={register}
        borderWidth="1.6px"
        borderColor="#000"
        focusBorderColor="#70BAE7"
        size="sm"
        placeholder="Smith"
        type="text"
      />
      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  );
});
