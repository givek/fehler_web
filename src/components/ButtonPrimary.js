import { Button } from '@chakra-ui/button';
import React from 'react';

export const ButtonPrimary = props => {
  return (
    <Button
      boxShadow="md"
      color="#fff"
      backgroundColor="#70BAE7"
      size="sm"
      type="submit"
    >
      {props.name}
    </Button>
  );
};
