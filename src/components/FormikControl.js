import React from 'react';
import { Input } from './formFields/Input';
import { Textarea } from './formFields/Textarea';

export const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
      return <Textarea {...rest} />;
    default:
      return null;
  }
};
