import { FormErrorMessage } from '@chakra-ui/form-control';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import React from 'react';

export const PasswordControl = React.forwardRef((props, register) => {
  return (
    <FormControl id="password" isInvalid={props.errors.password}>
      <FormLabel>Password</FormLabel>
      <Input
        name="password"
        ref={register}
        borderWidth="1.6px"
        borderColor="#000"
        focusBorderColor="#70BAE7"
        size="sm"
        placeholder="••••••••••••"
        type="password"
      />
      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  );
});
