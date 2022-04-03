import React from 'react';
import { FieldArray } from 'formik';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  HStack,
  Tag,
  TagLabel,
  TagRightIcon,
  FormLabel,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

function TagInput({ name, label, helpText, ...rest }) {
  const addTag = (event, push) => {
    console.log('keyup', event.target.value);
    if (event.key === 'Enter') {
      push(event.target.value);
      event.target.value = '';
    }
  };

  return (
    <FieldArray name={name}>
      {fieldArrayProps => {
        const { push, remove, form } = fieldArrayProps;
        return (
          <FormControl isInvalid={form.errors[name]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>

            <InputGroup {...rest}>
              <InputLeftAddon bgColor="white">
                <HStack spacing={2}>
                  {form.values.tags.map((tag, index) => (
                    <Tag
                      size="sm"
                      key={index}
                      variant="subtle"
                      colorScheme="purple"
                    >
                      <TagLabel>{tag}</TagLabel>
                      <TagRightIcon
                        as={SmallCloseIcon}
                        onClick={() => remove(index)}
                      />
                    </Tag>
                  ))}
                </HStack>
              </InputLeftAddon>
              <Input borderLeft="none" onKeyUp={event => addTag(event, push)} />
            </InputGroup>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            {helpText ? <FormHelperText>{helpText}</FormHelperText> : null}
          </FormControl>
        );
      }}
    </FieldArray>
  );
}

export default TagInput;
