import React from 'react';
import { Input } from './formFields/Input';
import { Textarea } from './formFields/Textarea';
import { Select } from './formFields/Select';
import { Date } from './formFields/Date';

export const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'date':
      return <Date {...rest} />;
    case 'textarea':
      return <Textarea {...rest} />;
    case 'select':
      return <Select {...rest} />;
    default:
      return null;
  }
};
